// ============================================================
// Troy Library - Book Review Backend
// Google Apps Script Web App
// ============================================================
// CONFIGURATION - Update these before deploying
// ============================================================

const DRIVE_FOLDER_ID = 'YOUR_GOOGLE_DRIVE_FOLDER_ID_HERE';
const SHEET_ID = 'YOUR_GOOGLE_SHEET_ID_HERE';
const SHEET_NAME = 'Reviews';

const HEADERS = [
  'Review ID', 'Student Name', 'Grade', 'Book ID', 'Book Title',
  'Author', 'ISBN', 'Rating', 'Review Type',
  'Drive File ID', 'Drive File Name', 'Submitted At', 'Status',
];

function doPost(e) {
  const output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);
  try {
    const data = JSON.parse(e.postData.contents);
    const result = processReview(data);
    output.setContent(JSON.stringify(result));
  } catch (err) {
    output.setContent(JSON.stringify({ success: false, message: 'Unable to save review: ' + err.message }));
  }
  return output;
}

function doGet() {
  return ContentService.createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}

function processReview(data) {
  if (!data.reviewId || !data.studentName || !data.book || !data.rating) {
    throw new Error('Missing required fields');
  }
  if (!data.fileData || !data.fileName || !data.mimeType) {
    throw new Error('Missing file data');
  }
  const MAX_BASE64_LEN = 10 * 1024 * 1024 * 1.37;
  if (data.fileData.length > MAX_BASE64_LEN) {
    throw new Error('File too large');
  }
  const driveFile = saveFileToDrive(data);
  saveMetadataToSheet(data, driveFile);
  return { success: true, reviewId: data.reviewId };
}

function saveFileToDrive(data) {
  const folder = DriveApp.getFolderById(DRIVE_FOLDER_ID);
  const fileBytes = Utilities.base64Decode(data.fileData);
  const blob = Utilities.newBlob(fileBytes, data.mimeType, data.fileName);
  return folder.createFile(blob);
}

function saveMetadataToSheet(data, driveFile) {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setBackground('#667eea').setFontColor('#ffffff').setFontWeight('bold');
  }
  const isbn = data.book.isbn13 || data.book.isbn10 || '';
  const authors = Array.isArray(data.book.authors) ? data.book.authors.join(', ') : '';
  sheet.appendRow([
    data.reviewId, data.studentName, data.grade || '', data.book.id, data.book.title,
    authors, isbn, data.rating, data.reviewType,
    driveFile.getId(), driveFile.getName(),
    data.submittedAt || new Date().toISOString(), 'PENDING',
  ]);
}
