# Google Drive Integration Setup

This guide walks you through creating the OAuth 2.0 credentials needed for the MTS review file upload feature.

---

## Prerequisites

- A Google account that owns the Drive folder `1oZbS2B81JHRC4u0EQheW-CYttAF8rdsz`
- Access to [Google Cloud Console](https://console.cloud.google.com)

---

## Step 1 — Create a Google Cloud Project

1. Go to **Google Cloud Console → New Project**
2. Name it `mts-troy-library` (or any name)
3. Note the **Project ID**

---

## Step 2 — Enable the Google Drive API

1. In your project, go to **APIs & Services → Library**
2. Search for **Google Drive API** and click **Enable**

---

## Step 3 — Create OAuth 2.0 Credentials

1. Go to **APIs & Services → Credentials → Create Credentials → OAuth client ID**
2. **Application type**: Web application
3. **Name**: MTS Troy Library
4. **Authorized redirect URIs**: add `https://developers.google.com/oauthplayground`
5. Click **Create**
6. Copy the **Client ID** and **Client Secret** — you'll need them shortly

---

## Step 4 — Configure OAuth Consent Screen

1. Go to **APIs & Services → OAuth consent screen**
2. **User type**: External (or Internal if using Google Workspace)
3. Fill in the required fields (app name, support email)
4. **Scopes**: add `https://www.googleapis.com/auth/drive.file`
   - `drive.file` limits access to only files created by this app — safer than full Drive access
5. Add your own Google account as a **Test user**
6. Save

---

## Step 5 — Generate a Refresh Token

1. Open [OAuth 2.0 Playground](https://developers.google.com/oauthplayground)
2. Click the **gear icon (⚙)** in the top-right
3. Check **Use your own OAuth credentials**
4. Enter your **Client ID** and **Client Secret**
5. Close the settings panel
6. In **Step 1**, paste this scope and click **Authorize APIs**:
   ```
   https://www.googleapis.com/auth/drive.file
   ```
7. Sign in with the Google account that owns the Drive folder
8. In **Step 2**, click **Exchange authorization code for tokens**
9. Copy the **Refresh token** — it does not expire (unless revoked)

---

## Step 6 — Set Cloudflare Secrets

Run these commands once in your project directory:

```bash
wrangler pages secret put GOOGLE_CLIENT_ID
wrangler pages secret put GOOGLE_CLIENT_SECRET
wrangler pages secret put GOOGLE_REFRESH_TOKEN
wrangler pages secret put GOOGLE_DRIVE_FOLDER_ID
```

For `GOOGLE_DRIVE_FOLDER_ID`, enter: `1oZbS2B81JHRC4u0EQheW-CYttAF8rdsz`

---

## Step 7 — Local Development

Copy `.dev.vars.example` to `.dev.vars` and fill in the four values:

```bash
cp .dev.vars.example .dev.vars
# edit .dev.vars with your real credentials
```

`.dev.vars` is gitignored and is automatically loaded by `wrangler pages dev`.

---

## Troubleshooting

| Error | Cause | Fix |
|-------|-------|-----|
| `OAuth token refresh failed (400)` | Invalid client secret or refresh token | Re-run Step 5 |
| `Drive upload failed (403)` | Drive API not enabled or wrong scope | Enable Drive API, re-authorize with `drive.file` scope |
| `Drive upload failed (404)` | Folder ID is wrong | Confirm folder ID from Drive URL |
| `invalid_grant` | Refresh token was revoked | Re-run Step 5 |
