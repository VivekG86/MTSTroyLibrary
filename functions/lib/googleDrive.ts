/**
 * Google Drive helpers — Shared Drive, service account.
 *
 * All calls set supportsAllDrives=true so they work against a Google Workspace
 * Shared Drive. Uses resumable upload (single-chunk) for all files — simpler
 * than multipart body construction and handles any file size up to the
 * Cloudflare Worker body limit.
 *
 * Never logs access tokens or credentials.
 */

const DRIVE_API    = 'https://www.googleapis.com/drive/v3/files';
const DRIVE_UPLOAD = 'https://www.googleapis.com/upload/drive/v3/files';
const FOLDER_MIME  = 'application/vnd.google-apps.folder';

export interface DriveUploadResult {
  fileId:      string;
  fileName:    string;
  webViewLink: string;
}

/**
 * Find an existing subfolder by name inside parentFolderId, or create it.
 * Used to resolve/create the year folder (e.g. "2026").
 */
export async function ensureYearFolder(
  accessToken:    string,
  parentFolderId: string,
  year:           string,
): Promise<string> {
  // Search for an existing folder with this name inside the parent.
  const q = `name='${year}' and mimeType='${FOLDER_MIME}' and '${parentFolderId}' in parents and trashed=false`;
  const searchUrl = new URL(DRIVE_API);
  searchUrl.searchParams.set('q', q);
  searchUrl.searchParams.set('fields', 'files(id,name)');
  searchUrl.searchParams.set('supportsAllDrives', 'true');
  searchUrl.searchParams.set('includeItemsFromAllDrives', 'true');

  const searchRes = await fetch(searchUrl.toString(), {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!searchRes.ok) {
    throw new Error(`Drive folder search failed (${searchRes.status})`);
  }

  const data = await searchRes.json() as { files?: { id: string }[] };
  if (data.files && data.files.length > 0) {
    return data.files[0].id;
  }

  // Create the year folder inside the parent.
  const createUrl = new URL(DRIVE_API);
  createUrl.searchParams.set('supportsAllDrives', 'true');

  const createRes = await fetch(createUrl.toString(), {
    method: 'POST',
    headers: {
      Authorization:  `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name:     year,
      mimeType: FOLDER_MIME,
      parents:  [parentFolderId],
    }),
  });

  if (!createRes.ok) {
    throw new Error(`Drive year-folder creation failed (${createRes.status})`);
  }

  const created = await createRes.json() as { id?: string };
  if (!created.id) throw new Error('Drive year-folder creation returned no ID');

  console.log(`[drive] created year folder '${year}' with id ${created.id}`);
  return created.id;
}

/**
 * Upload a file to Google Drive using a resumable single-chunk upload.
 * Works for any file size within Cloudflare Worker limits.
 * The file is placed in parentFolderId (should be the year subfolder).
 */
export async function uploadToDrive(
  accessToken:    string,
  parentFolderId: string,
  fileName:       string,
  mimeType:       string,
  fileBytes:      ArrayBuffer,
): Promise<DriveUploadResult> {
  // Step 1 — Initiate the resumable session.
  const initiateUrl = new URL(DRIVE_UPLOAD);
  initiateUrl.searchParams.set('uploadType', 'resumable');
  initiateUrl.searchParams.set('supportsAllDrives', 'true');

  const initiateRes = await fetch(initiateUrl.toString(), {
    method: 'POST',
    headers: {
      Authorization:            `Bearer ${accessToken}`,
      'Content-Type':           'application/json',
      'X-Upload-Content-Type':  mimeType,
      'X-Upload-Content-Length': String(fileBytes.byteLength),
    },
    body: JSON.stringify({ name: fileName, parents: [parentFolderId] }),
  });

  if (!initiateRes.ok) {
    throw new Error(`Drive upload initiation failed (${initiateRes.status})`);
  }

  const uploadUrl = initiateRes.headers.get('Location');
  if (!uploadUrl) {
    throw new Error('Drive upload initiation returned no Location header');
  }

  // Step 2 — Send the file bytes in a single PUT to the session URL.
  const uploadRes = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type':   mimeType,
      'Content-Length': String(fileBytes.byteLength),
    },
    body: fileBytes,
  });

  if (!uploadRes.ok) {
    throw new Error(`Drive file upload failed (${uploadRes.status})`);
  }

  const json = await uploadRes.json() as { id?: string };
  if (!json.id) throw new Error('Drive upload returned no file ID');

  console.log(`[drive] uploaded '${fileName}' → file id ${json.id}`);

  return {
    fileId:      json.id,
    fileName,
    webViewLink: `https://drive.google.com/file/d/${json.id}/view`,
  };
}

/**
 * Delete a Drive file — called for rollback when D1 insert fails after upload.
 * Errors are swallowed; caller logs the orphaned file ID for manual recovery.
 */
export async function deleteDriveFile(accessToken: string, fileId: string): Promise<void> {
  try {
    const url = new URL(`${DRIVE_API}/${fileId}`);
    url.searchParams.set('supportsAllDrives', 'true');
    await fetch(url.toString(), {
      method:  'DELETE',
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log(`[drive] deleted orphaned file ${fileId}`);
  } catch {
    // Best-effort; caller already logged the file ID for manual cleanup.
  }
}

/** Map MIME type to file extension. */
export function mimeToExtension(mimeType: string, reviewType: 'image' | 'audio'): string {
  const map: Record<string, string> = {
    'image/jpeg':            'jpg',
    'image/jpg':             'jpg',
    'image/png':             'png',
    'image/webp':            'webp',
    'image/heic':            'heic',
    'image/heif':            'heif',
    'audio/webm':            'webm',
    'audio/webm;codecs=opus':'webm',
    'audio/mp4':             'm4a',
    'audio/ogg':             'ogg',
    'audio/wav':             'wav',
    'audio/mpeg':            'mp3',
  };
  return map[mimeType] ?? (reviewType === 'audio' ? 'webm' : 'jpg');
}
