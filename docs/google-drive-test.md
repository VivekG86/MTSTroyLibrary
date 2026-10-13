# Google Drive Connectivity Test

Temporary diagnostic endpoint that proves the full chain:

> Cloudflare Worker → Service Account JWT → Google OAuth2 → Drive API → Shared Drive folder

Nothing is uploaded, created, or modified in Google Drive.

---

## Endpoint

```
GET /api/google-drive/test
```

---

## Required Cloudflare Secrets

| Secret | Description |
|--------|-------------|
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | e.g. `mts-library-upload@mtslibrary.iam.gserviceaccount.com` |
| `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` | Full PEM private key from the service account JSON key file |
| `GOOGLE_DRIVE_FOLDER_ID` | ID of the target Shared Drive folder |

### Setting secrets in production

```bash
npx wrangler pages secret put GOOGLE_SERVICE_ACCOUNT_EMAIL --project-name mtslibrary
npx wrangler pages secret put GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY --project-name mtslibrary
npx wrangler pages secret put GOOGLE_DRIVE_FOLDER_ID --project-name mtslibrary
```

When prompted for `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY`, paste the entire PEM block including the `-----BEGIN PRIVATE KEY-----` header and footer. Cloudflare stores newlines as `\n` — the Worker normalises this automatically.

---

## What the endpoint verifies

1. All three secrets are present and non-empty.
2. The private key can be parsed and imported as an RSA-SHA256 signing key (Web Crypto).
3. A signed JWT can be exchanged for a Google OAuth2 access token.
4. The access token can call the Google Drive API.
5. The configured folder ID exists and is accessible by the service account.
6. The resource is a folder (`application/vnd.google-apps.folder`).
7. The `driveId` field confirms the folder lives on a Shared Drive.

---

## Local development

### 1. Add secrets to `.dev.vars`

Copy `.dev.vars.example` to `.dev.vars` (already gitignored) and add:

```
GOOGLE_SERVICE_ACCOUNT_EMAIL=mts-library-upload@mtslibrary.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----
GOOGLE_DRIVE_FOLDER_ID=<folder-id-from-drive-url>
```

For the private key, paste it as a single line with `\n` between each line — exactly as it appears in the downloaded JSON key file's `private_key` field.

### 2. Start the local dev server

```bash
npx wrangler pages dev dist
```

### 3. Test locally

```bash
curl http://localhost:8788/api/google-drive/test
```

---

## Testing the deployed Worker

```bash
curl https://mtslibrary.pages.dev/api/google-drive/test
```

Or open in a browser.

---

## Expected successful response

```json
{
  "success": true,
  "googleDrive": {
    "connected": true,
    "folderAccessible": true,
    "folderId": "...",
    "folderName": "MTS Reviews",
    "mimeType": "application/vnd.google-apps.folder",
    "driveId": "..."
  },
  "message": "Google Drive connection successful."
}
```

`driveId` will be non-null and non-empty if the folder is on a Shared Drive (expected).

---

## Common errors

| Error | Cause |
|-------|-------|
| `GOOGLE_SERVICE_ACCOUNT_EMAIL secret is not configured.` | Secret not set in Cloudflare |
| `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY secret is not configured.` | Secret not set in Cloudflare |
| `GOOGLE_DRIVE_FOLDER_ID secret is not configured.` | Secret not set in Cloudflare |
| `Private key is not valid base64` | Key was corrupted when pasting — re-paste from the JSON key file |
| `Token exchange failed with HTTP 400` | Private key does not match the service account email |
| `Google service account authentication failed.` | JWT signing or token exchange error — check key format |
| `The configured Google Drive folder could not be found or accessed.` | Folder ID is wrong, or service account has not been added to the Shared Drive |
| `The service account does not have permission to access the configured Google Drive folder.` | Service account needs at least Viewer access on the Shared Drive |
| `Configured GOOGLE_DRIVE_FOLDER_ID does not point to a folder` | The ID points to a file, not a folder |

---

## What to verify in Google Drive

After a successful response:

1. Confirm `folderName` matches the intended MTS review folder.
2. Confirm `driveId` is non-null — this proves it is on a Shared Drive, not My Drive.
3. Confirm the service account (`mts-library-upload@...`) is listed as a member of the Shared Drive with at least Contributor access (needed for future uploads).

---

## Security considerations

- This endpoint is **unauthenticated** — anyone who knows the URL can call it.
- The response never includes the private key, JWT, or access token.
- The only potentially sensitive value returned is `folderId` (same as the secret value) — this is acceptable for a diagnostic endpoint.
- **Remove or protect this endpoint before the application is publicly promoted.**

---

## Removing the endpoint

When Drive upload is working and this test is no longer needed:

1. Delete `functions/api/google-drive/test.ts`
2. Delete `functions/lib/googleServiceAccount.ts` only if it is not imported by any other file.
3. Run `npm run build` and redeploy.
