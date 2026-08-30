import { ReviewSubmission, SubmissionResult } from '../types/review';
import { config } from '../config/config';

export async function fileToBase64(file: File | Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function generateReviewId(): string {
  const now = new Date();
  const year = now.getFullYear();
  const random = Math.floor(Math.random() * 900000) + 100000;
  return `REV-${year}-${random}`;
}

export async function submitReview(submission: ReviewSubmission): Promise<SubmissionResult> {
  if (!config.reviewApiUrl) {
    console.warn('No VITE_REVIEW_API_URL configured. Running in demo mode.');
    await new Promise(resolve => setTimeout(resolve, 1500));
    return { success: true, reviewId: submission.reviewId };
  }

  const response = await fetch(config.reviewApiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(submission),
  });

  if (!response.ok) {
    throw new Error(`Submission failed: ${response.status}`);
  }

  const result: SubmissionResult = await response.json();
  return result;
}
