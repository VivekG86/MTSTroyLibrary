import { ReviewSubmission, SubmissionResult } from '../types/review';

export function generateReviewId(): string {
  // Used client-side for building the file name before submission.
  // The authoritative review ID is generated server-side by the Worker.
  const year = new Date().getFullYear();
  const random = Math.floor(Math.random() * 900000) + 100000;
  return `REV-${year}-${random}`;
}

export async function submitReview(submission: ReviewSubmission): Promise<SubmissionResult> {
  const form = new FormData();

  // Scalar fields
  form.append('organization',   submission.organization);
  form.append('schoolLocation', submission.schoolLocation);
  form.append('studentName',    submission.studentName);
  form.append('grade',          submission.grade);
  form.append('book',           JSON.stringify(submission.book));
  form.append('rating',         String(submission.rating));
  form.append('reviewType',     submission.reviewType);
  form.append('fileName',       submission.fileName);
  form.append('mimeType',       submission.mimeType);
  form.append('submittedAt',    submission.submittedAt);

  // Binary file — sent as a Blob so the Worker receives it as a File part
  form.append('file', submission.fileData, submission.fileName);

  const response = await fetch('/api/reviews', {
    method: 'POST',
    // Do NOT set Content-Type — the browser sets it automatically with the boundary
    body: form,
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
