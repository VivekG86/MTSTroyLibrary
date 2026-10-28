# Troy Library - Kids Book Review Website

A fun, child-friendly web app where kids can share their book reviews by submitting a photo of their handwritten review or a voice recording.

## Features

- Book title and author entered by the student
- Beautiful book detail cards
- 1-5 star rating
- Photo review (camera or file upload)
- Voice recording review (up to 2 minutes)
- Uploads to Google Drive
- Stores metadata in Google Sheets
- Celebration success screen
- Mobile-first responsive design

## Local Development

```bash
npm install
cp .env.example .env
npm run dev
```

The app works in demo mode without a backend configured (submissions are simulated).

## Production Build

```bash
npm run build
npm run preview
```

## Google Apps Script Setup

### 1. Create a Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet called "Troy Library Reviews"
3. Copy the Sheet ID from the URL: `https://docs.google.com/spreadsheets/d/SHEET_ID/edit`

### 2. Create a Google Drive Folder
1. Go to [Google Drive](https://drive.google.com)
2. Create a folder called "Troy Library Reviews"
3. Open the folder and copy its ID from the URL: `https://drive.google.com/drive/folders/FOLDER_ID`

### 3. Set Up Apps Script
1. Go to [Google Apps Script](https://script.google.com)
2. Create a new project called "Troy Library Backend"
3. Delete the default code and paste the contents of `google-apps-script/Code.gs`
4. Replace `YOUR_GOOGLE_DRIVE_FOLDER_ID_HERE` with your Drive folder ID
5. Replace `YOUR_GOOGLE_SHEET_ID_HERE` with your Sheet ID
6. Click **Deploy** > **New Deployment**
7. Type: **Web App**
8. Execute as: **Me**
9. Who has access: **Anyone** (required for the frontend to call it)
10. Click **Deploy** and copy the Web App URL

### 4. Configure Frontend
Add the Apps Script URL to your `.env`:
```
VITE_REVIEW_API_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

## Deploying to Cloudflare Pages

1. Push your code to GitHub
2. Go to [Cloudflare Pages](https://pages.cloudflare.com)
3. Connect your GitHub repository
4. Configure build settings:
   - **Build command:** `npm run build`
   - **Output directory:** `dist`
5. Add Environment Variables:
   - `VITE_REVIEW_API_URL` = your Apps Script URL
6. Deploy!

The `public/_redirects` file handles client-side routing.

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_REVIEW_API_URL` | Yes (production) | Google Apps Script Web App URL |

## Privacy

- Only collects a first name - no email, phone, or other personal data
- Files stored in your private Google Drive
- Sheet accessible only to the library administrator
- No third-party analytics
