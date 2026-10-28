// Cloudflare Pages Function — POST /api/reviews
//
// Accepts multipart/form-data (metadata fields + binary "file" part).
// Flow:
//   1. Validate all fields and file type/size.
//   2. Generate server-side review ID from D1 row count.
//   3. Authenticate as the MTS service account.
//   4. Ensure the year subfolder exists in the Shared Drive.
//   5. Upload the file to Drive.
//   6. Insert review metadata into D1.
//   7. If D1 insert fails: delete the uploaded Drive file, return error.

import { getServiceAccountAccessToken } from '../lib/googleServiceAccount';
import { ensureYearFolder, uploadToDrive, deleteDriveFile, mimeToExtension } from '../lib/googleDrive';

interface Env {
  DB:                               D1Database;
  GOOGLE_SERVICE_ACCOUNT_EMAIL:     string;
  GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY: string;
  GOOGLE_DRIVE_FOLDER_ID:           string;
}

type SchoolLocation = 'Troy' | 'Farmington' | 'Canton' | 'Livonia';
type ReviewType = 'image' | 'audio' | 'video';
const VALID_REVIEW_TYPES: ReviewType[] = ['image', 'audio', 'video'];
const VALID_LOCATIONS: SchoolLocation[] = ['Troy', 'Farmington', 'Canton', 'Livonia'];

// ── File constraints ──────────────────────────────────────────────────────────
const MAX_IMAGE_BYTES = 10 * 1024 * 1024;   // 10 MB
const MAX_AUDIO_BYTES = 50 * 1024 * 1024;   // 50 MB
const MAX_VIDEO_BYTES = 50 * 1024 * 1024;   // 50 MB (client records ~1 Mbps, so 2 min ≈ 15 MB)

const ALLOWED_IMAGE_TYPES = new Set([
  'image/jpeg', 'image/jpg', 'image/png', 'image/webp',
  'image/heic', 'image/heif',
  '',   // iOS camera photos sometimes report an empty MIME type
]);
const ALLOWED_AUDIO_TYPES = new Set([
  'audio/webm', 'audio/webm;codecs=opus', 'audio/mp4',
  'audio/ogg', 'audio/wav', 'audio/mpeg',
]);
const ALLOWED_VIDEO_TYPES = new Set([
  'video/webm', 'video/mp4',
]);

// ── Types ─────────────────────────────────────────────────────────────────────
interface ReviewFields {
  organization:   'MTS';
  schoolLocation: SchoolLocation;
  studentName:    string;
  grade:          string;
  book: {
    id:       string;
    title:    string;
    authors:  string[];
    isbn10?:  string;
    isbn13?:  string;
  };
  rating:     number;
  reviewType: ReviewType;
  mimeType:   string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function parseBookJson(raw: string): ReviewFields['book'] | null {
  try {
    const b = JSON.parse(raw);
    if (
      typeof b.id     === 'string' && b.id.trim() &&
      typeof b.title  === 'string' && b.title.trim() &&
      Array.isArray(b.authors) && b.authors.length > 0
    ) return b as ReviewFields['book'];
    return null;
  } catch { return null; }
}

interface ValidationResult {
  ok:      boolean;
  message: string;
}

function validateFields(f: Partial<ReviewFields>): ValidationResult {
  if (f.organization !== 'MTS')
    return { ok: false, message: 'Invalid organization.' };

  if (!VALID_LOCATIONS.includes(f.schoolLocation as SchoolLocation))
    return { ok: false, message: 'Invalid school location.' };

  const name = (f.studentName ?? '').trim();
  if (name.length < 2 || name.length > 60)
    return { ok: false, message: 'Student name must be 2–60 characters.' };

  const grade = (f.grade ?? '').trim();
  if (grade.length < 1 || grade.length > 40)
    return { ok: false, message: 'Grade is required.' };

  if (!f.book)
    return { ok: false, message: 'Book information is required.' };

  const rating = f.rating as number;
  if (!Number.isInteger(rating) || rating < 1 || rating > 5)
    return { ok: false, message: 'Rating must be an integer from 1 to 5.' };

  if (!VALID_REVIEW_TYPES.includes(f.reviewType as ReviewType))
    return { ok: false, message: 'reviewType must be image, audio or video.' };

  return { ok: true, message: '' };
}

function validateFile(
  reviewType: ReviewType,
  mimeType:   string,
  byteLength: number,
): ValidationResult {
  if (reviewType === 'image') {
    if (!ALLOWED_IMAGE_TYPES.has(mimeType))
      return { ok: false, message: `Unsupported image type: ${mimeType || '(empty)'}` };
    if (byteLength > MAX_IMAGE_BYTES)
      return { ok: false, message: 'Image exceeds 10 MB limit.' };
  } else if (reviewType === 'video') {
    if (!ALLOWED_VIDEO_TYPES.has(mimeType))
      return { ok: false, message: `Unsupported video type: ${mimeType || '(empty)'}` };
    if (byteLength > MAX_VIDEO_BYTES)
      return { ok: false, message: 'Video recording exceeds 50 MB limit.' };
  } else {
    if (!ALLOWED_AUDIO_TYPES.has(mimeType))
      return { ok: false, message: `Unsupported audio type: ${mimeType || '(empty)'}` };
    if (byteLength > MAX_AUDIO_BYTES)
      return { ok: false, message: 'Audio recording exceeds 50 MB limit.' };
  }
  return { ok: true, message: '' };
}

/** Sanitize a string for use in a filename — keep alphanumerics, replace everything else with underscore, collapse runs. */
function sanitizePart(s: string): string {
  return s.trim()
    .replace(/[^a-zA-Z0-9]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '')
    .substring(0, 40);
}

/** Generate REV-YYYY-NNNNNN using the count of existing rows for the current year. */
async function generateReviewId(db: D1Database): Promise<string> {
  const year = new Date().getUTCFullYear();
  const row  = await db
    .prepare('SELECT COUNT(*) AS cnt FROM reviews WHERE id LIKE ?')
    .bind(`REV-${year}-%`)
    .first<{ cnt: number }>();
  const next = (row?.cnt ?? 0) + 1;
  return `REV-${year}-${String(next).padStart(6, '0')}`;
}

// ── Handler ───────────────────────────────────────────────────────────────────
export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {

  // ── 1. Parse multipart/form-data ──────────────────────────────────────────
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return Response.json({ success: false, message: 'Expected multipart/form-data.' }, { status: 400 });
  }

  const get = (key: string) => formData.get(key);

  const organization   = get('organization')   as string;
  const schoolLocation = get('schoolLocation') as string;
  const studentName    = get('studentName')    as string;
  const grade          = get('grade')          as string;
  const bookRaw        = get('book')           as string;
  const ratingRaw      = get('rating')         as string;
  const reviewType     = get('reviewType')     as string;
  const mimeType       = (get('mimeType') as string | null) ?? '';

  // File part — duck-typed because Workers types don't expose File/Blob instanceof.
  const filePart = formData.get('file');
  if (
    !filePart ||
    typeof filePart === 'string' ||
    typeof (filePart as { arrayBuffer?: unknown }).arrayBuffer !== 'function'
  ) {
    return Response.json({ success: false, message: 'File is required.' }, { status: 400 });
  }
  const fileBlob = filePart as { arrayBuffer(): Promise<ArrayBuffer>; size?: number };

  const book   = parseBookJson(bookRaw ?? '');
  const rating = parseInt(ratingRaw ?? '', 10);

  // ── 2. Validate metadata fields ────────────────────────────────────────────
  const metaCheck = validateFields({
    organization:   organization as 'MTS',
    schoolLocation: schoolLocation as SchoolLocation,
    studentName,
    grade,
    book:       book ?? undefined,
    rating,
    reviewType: reviewType as ReviewType,
    mimeType,
  });
  if (!metaCheck.ok) {
    return Response.json({ success: false, message: metaCheck.message }, { status: 400 });
  }

  // ── 3. Read file bytes + validate file type/size ───────────────────────────
  let fileBytes: ArrayBuffer;
  try {
    fileBytes = await fileBlob.arrayBuffer();
  } catch {
    return Response.json({ success: false, message: 'Could not read uploaded file.' }, { status: 400 });
  }

  const fileCheck = validateFile(reviewType as ReviewType, mimeType, fileBytes.byteLength);
  if (!fileCheck.ok) {
    return Response.json({ success: false, message: fileCheck.message }, { status: 400 });
  }

  // ── 4. Generate server-side review ID ─────────────────────────────────────
  let reviewId: string;
  try {
    reviewId = await generateReviewId(env.DB);
  } catch (err) {
    console.error('[reviews] Failed to generate review ID:', err instanceof Error ? err.message : err);
    return Response.json({ success: false, message: 'Server error.' }, { status: 500 });
  }

  // Build filename: StudentName_Grade_BookTitle_DateTime.ext
  // grade already encodes section (e.g. "4B") from the frontend.
  const now = new Date();
  const dateTime = now.toISOString().replace(/[-:]/g, '').replace('T', '_').substring(0, 15); // YYYYMMDD_HHMMSS
  const ext = mimeToExtension(mimeType, reviewType as ReviewType);
  const fileName = [
    sanitizePart(studentName),
    sanitizePart(grade),
    sanitizePart(book!.title),
    dateTime,
  ].join('_') + `.${ext}`;
  const year = String(now.getUTCFullYear());

  // ── 5. Upload to Google Drive (skipped if secrets not configured) ──────────
  const driveConfigured = !!(
    env.GOOGLE_SERVICE_ACCOUNT_EMAIL &&
    env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY &&
    env.GOOGLE_DRIVE_FOLDER_ID
  );

  let driveFileId:  string | null = null;
  let driveUrl:     string | null = null;
  let accessToken:  string | null = null;   // kept for potential rollback

  if (driveConfigured) {
    // 5a. Authenticate
    try {
      accessToken = await getServiceAccountAccessToken(
        env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
        'https://www.googleapis.com/auth/drive',
      );
    } catch (err) {
      console.error('[reviews] Service account auth failed:', err instanceof Error ? err.message : err);
      return Response.json(
        { success: false, message: 'File upload failed — authentication error.' },
        { status: 502 },
      );
    }

    // 5b. Resolve/create year subfolder
    let yearFolderId: string;
    try {
      yearFolderId = await ensureYearFolder(accessToken, env.GOOGLE_DRIVE_FOLDER_ID, year);
    } catch (err) {
      console.error('[reviews] Year-folder resolution failed:', err instanceof Error ? err.message : err);
      return Response.json(
        { success: false, message: 'File upload failed — could not access Drive folder.' },
        { status: 502 },
      );
    }

    // 5c. Upload the file
    try {
      const result = await uploadToDrive(accessToken, yearFolderId, fileName, mimeType, fileBytes);
      driveFileId = result.fileId;
      driveUrl    = result.webViewLink;
    } catch (err) {
      console.error('[reviews] Drive upload failed:', err instanceof Error ? err.message : err);
      return Response.json(
        { success: false, message: 'File upload failed — please try again.' },
        { status: 502 },
      );
    }
  } else {
    console.warn('[reviews] Drive credentials not configured — skipping file upload');
  }

  // ── 6. Insert metadata into D1 ────────────────────────────────────────────
  const bk        = book!;
  const isbn: string | null = bk.isbn13 ?? bk.isbn10 ?? null;
  const author    = bk.authors.join(', ');
  const createdAt = new Date().toISOString();

  try {
    await env.DB.prepare(
      `INSERT INTO reviews
         (id, organization, school_location, student_name, grade,
          book_id, book_title, author, isbn,
          rating, review_type, drive_file_id, drive_file_name, drive_url, status, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'PENDING', ?)`
    ).bind(
      reviewId,
      organization,
      schoolLocation,
      studentName.trim(),
      grade.trim(),
      bk.id,
      bk.title,
      author,
      isbn,
      rating,
      reviewType,
      driveFileId,
      fileName,
      driveUrl,
      createdAt,
    ).run();
  } catch (err) {
    console.error(
      `[reviews] D1 insert failed${driveFileId ? ` (orphaned Drive file: ${driveFileId})` : ''}:`,
      err instanceof Error ? err.message : err,
    );

    // ── 7. Rollback: delete the uploaded Drive file ────────────────────────
    if (driveFileId && accessToken) {
      await deleteDriveFile(accessToken, driveFileId);
    }

    return Response.json({ success: false, message: 'Server error — please try again.' }, { status: 500 });
  }

  console.log(`[reviews] saved review ${reviewId} (drive: ${driveFileId ?? 'none'})`);
  return Response.json({ success: true, reviewId }, { status: 201 });
};
