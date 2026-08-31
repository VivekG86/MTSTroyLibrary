// Cloudflare Pages Function — POST /api/reviews
// Validates the review submission and inserts metadata into D1.
// File upload (Google Drive) is NOT implemented yet — see Phase 2.

interface Env {
  DB: D1Database;
}

// Shape of the request body sent by the frontend.
// Note: fileData is intentionally NOT sent in Phase 1 (no Drive upload yet).
interface ReviewRequest {
  studentName: string;
  grade: string;
  book: {
    id: string;
    title: string;
    authors: string[];
    isbn10?: string;
    isbn13?: string;
  };
  rating: number;
  reviewType: 'image' | 'audio';
  fileName: string;
  mimeType: string;
  submittedAt: string;
}

function validateRequest(body: unknown): body is ReviewRequest {
  if (!body || typeof body !== 'object') return false;
  const b = body as Record<string, unknown>;

  // studentName: 2–60 chars
  if (typeof b.studentName !== 'string') return false;
  const name = b.studentName.trim();
  if (name.length < 2 || name.length > 60) return false;

  // grade: non-empty, sane length
  if (typeof b.grade !== 'string') return false;
  const grade = b.grade.trim();
  if (grade.length < 1 || grade.length > 40) return false;

  // book
  if (!b.book || typeof b.book !== 'object') return false;
  const book = b.book as Record<string, unknown>;
  if (typeof book.id !== 'string' || book.id.trim() === '') return false;
  if (typeof book.title !== 'string' || book.title.trim() === '') return false;
  if (!Array.isArray(book.authors) || book.authors.length === 0) return false;

  // rating: integer 1–5
  if (typeof b.rating !== 'number' || !Number.isInteger(b.rating) || b.rating < 1 || b.rating > 5) return false;

  // reviewType
  if (b.reviewType !== 'image' && b.reviewType !== 'audio') return false;

  // fileName: required, used for Phase 2 Drive upload naming
  if (typeof b.fileName !== 'string' || b.fileName.trim() === '') return false;

  return true;
}

/** Generate REV-YYYY-NNNNNN using the count of existing rows for the current year. */
async function generateReviewId(db: D1Database): Promise<string> {
  const year = new Date().getFullYear();
  const row = await db
    .prepare('SELECT COUNT(*) AS cnt FROM reviews WHERE id LIKE ?')
    .bind(`REV-${year}-%`)
    .first<{ cnt: number }>();
  const next = (row?.cnt ?? 0) + 1;
  return `REV-${year}-${String(next).padStart(6, '0')}`;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  // Parse body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ success: false, message: 'Invalid JSON body' }, { status: 400 });
  }

  // Validate
  if (!validateRequest(body)) {
    return Response.json({ success: false, message: 'Invalid review data' }, { status: 400 });
  }

  const { studentName, grade, book, rating, reviewType, fileName } = body;

  const isbn: string | null = book.isbn13 ?? book.isbn10 ?? null;
  const author = book.authors.join(', ');
  const createdAt = new Date().toISOString();

  // Generate server-side review ID
  let reviewId: string;
  try {
    reviewId = await generateReviewId(env.DB);
  } catch (err) {
    console.error('[reviews] Failed to generate review ID:', err);
    return Response.json({ success: false, message: 'Server error' }, { status: 500 });
  }

  // Insert into D1.
  // Column list matches migrations/0001_initial_reviews_table.sql exactly.
  // drive_file_id / drive_url are NULL until Phase 2 (Google Drive upload);
  // drive_file_name is stored now so the filename is ready when Drive is connected.
  try {
    await env.DB.prepare(
      `INSERT INTO reviews
         (id, student_name, grade, book_id, book_title, author, isbn,
          rating, review_type, drive_file_id, drive_file_name, drive_url, status, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NULL, ?, NULL, 'PENDING', ?)`
    )
      .bind(
        reviewId,
        studentName.trim(),
        grade.trim(),
        book.id,
        book.title,
        author,
        isbn,
        rating,
        reviewType,
        fileName,   // stored for future Drive upload naming
        createdAt
      )
      .run();
  } catch (err) {
    console.error('[reviews] D1 insert failed:', err);
    return Response.json({ success: false, message: 'Server error' }, { status: 500 });
  }

  return Response.json({ success: true, reviewId }, { status: 201 });
};
