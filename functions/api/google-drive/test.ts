/**
 * GET /api/google-drive/test
 *
 * Temporary diagnostic endpoint — verifies that the Worker can authenticate
 * as the MTS service account and reach the configured Google Drive folder.
 *
 * IMPORTANT: This endpoint is intentionally unauthenticated for development
 * convenience. Remove or protect it before the application goes into
 * unrestricted production use.
 *
 * Nothing is uploaded, created, or modified in Google Drive.
 */

import { getServiceAccountAccessToken } from '../../lib/googleServiceAccount';

interface Env {
  GOOGLE_SERVICE_ACCOUNT_EMAIL: string;
  GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY: string;
  GOOGLE_DRIVE_FOLDER_ID: string;
}

interface DriveFolderResource {
  id?: string;
  name?: string;
  mimeType?: string;
  driveId?: string;
  parents?: string[];
}

export const onRequestGet: PagesFunction<Env> = async ({ env }) => {
  console.log('[drive-test] endpoint called');

  // ── 1. Verify secrets are present ─────────────────────────────────────────
  if (!env.GOOGLE_SERVICE_ACCOUNT_EMAIL) {
    return Response.json(
      { success: false, error: 'GOOGLE_SERVICE_ACCOUNT_EMAIL secret is not configured.' },
      { status: 500 },
    );
  }
  if (!env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY) {
    return Response.json(
      { success: false, error: 'GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY secret is not configured.' },
      { status: 500 },
    );
  }
  if (!env.GOOGLE_DRIVE_FOLDER_ID) {
    return Response.json(
      { success: false, error: 'GOOGLE_DRIVE_FOLDER_ID secret is not configured.' },
      { status: 500 },
    );
  }

  console.log('[drive-test] all secrets present, service account:', env.GOOGLE_SERVICE_ACCOUNT_EMAIL);

  // ── 2. Obtain access token via service account JWT ─────────────────────────
  let accessToken: string;
  try {
    console.log('[drive-test] starting service account authentication');
    accessToken = await getServiceAccountAccessToken(
      env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
      // drive.readonly is sufficient for a metadata GET — narrowest viable scope.
      'https://www.googleapis.com/auth/drive.readonly',
    );
    console.log('[drive-test] authentication succeeded');
  } catch (err) {
    console.error('[drive-test] authentication failed:', err instanceof Error ? err.message : String(err));
    return Response.json(
      { success: false, error: 'Google service account authentication failed.' },
      { status: 502 },
    );
  }

  // ── 3. Call Drive API to verify folder access ──────────────────────────────
  const folderId = env.GOOGLE_DRIVE_FOLDER_ID;

  const driveUrl = new URL(`https://www.googleapis.com/drive/v3/files/${folderId}`);
  driveUrl.searchParams.set('fields', 'id,name,mimeType,driveId,parents');
  // Required for Shared Drive items.
  driveUrl.searchParams.set('supportsAllDrives', 'true');
  driveUrl.searchParams.set('includeItemsFromAllDrives', 'true');

  let driveRes: Response;
  try {
    console.log('[drive-test] calling Drive API, folder:', folderId);
    driveRes = await fetch(driveUrl.toString(), {
      headers: {
        // Access token is passed only in the Authorization header — never returned to the client.
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log('[drive-test] Drive API responded with HTTP', driveRes.status);
  } catch (err) {
    console.error('[drive-test] Drive API fetch error:', err instanceof Error ? err.message : String(err));
    return Response.json(
      { success: false, error: 'Drive API request failed — network or timeout error.' },
      { status: 502 },
    );
  }

  if (driveRes.status === 404) {
    return Response.json(
      { success: false, error: 'The configured Google Drive folder could not be found or accessed.' },
      { status: 404 },
    );
  }

  if (driveRes.status === 403) {
    return Response.json(
      { success: false, error: 'The service account does not have permission to access the configured Google Drive folder.' },
      { status: 403 },
    );
  }

  if (!driveRes.ok) {
    console.error('[drive-test] unexpected Drive API status:', driveRes.status);
    return Response.json(
      { success: false, error: `Drive API returned unexpected status ${driveRes.status}.` },
      { status: 502 },
    );
  }

  // ── 4. Validate the returned resource ─────────────────────────────────────
  const folder = await driveRes.json() as DriveFolderResource;

  console.log('[drive-test] folder name:', folder.name, '| mimeType:', folder.mimeType, '| driveId:', folder.driveId ?? 'none');

  if (folder.mimeType !== 'application/vnd.google-apps.folder') {
    return Response.json(
      { success: false, error: `Configured GOOGLE_DRIVE_FOLDER_ID does not point to a folder (got mimeType: ${folder.mimeType}).` },
      { status: 400 },
    );
  }

  // ── 5. Return success — no credentials in the response ────────────────────
  return Response.json({
    success: true,
    googleDrive: {
      connected: true,
      folderAccessible: true,
      folderId: folder.id,
      folderName: folder.name,
      mimeType: folder.mimeType,
      driveId: folder.driveId ?? null,
    },
    message: 'Google Drive connection successful.',
  });
};
