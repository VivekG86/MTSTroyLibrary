import { ReviewSubmission, SubmissionResult } from '../types/review';

export async function fileToBase64(file: File | Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Strip the data-URL prefix, keep only the base64 payload
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function generateReviewId(): string {
  // Used client-side for building the file name before submission.
  // The authoritative review ID is generated server-side by the Worker.
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 900000) + 100000;
  return `REV-${year}-${random}`;
}

export async function submitReview(submission: ReviewSubmission): Promise<SubmissionResult> {
  // Phase 1: POST only metadata to /api/reviews.
  // fileData is intentionally excluded — the binary will be uploaded to
  // Google Drive in Phase 2, at which point this body will be extended.
  const body = {
    studentName: submission.studentName,
    grade:       submission.grade,
    book:        submission.book,
    rating:      submission.rating,
    reviewType:  submission.reviewType,
    fileName:    submission.fileName,
    mimeType:    submission.mimeType,
    submittedAt: submission.submittedAt,
  };

  const response = await fetch('/api/reviews', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    let message: string | undefined;
    try {
      const data = await response.json() as { message?: string };
      message = data.message;
    } catch { /* ignore parse errors */ }
    throw new Error(message ?? `Submission failed: ${response.status}`);
  }

  return response.json() as Promise<SubmissionResult>;
}
