import { Book } from './book';

export type ReviewType = 'image' | 'audio';

export interface ReviewFormState {
  book: Book | null;
  studentName: string;
  rating: number | null;
  reviewType: ReviewType | null;
  reviewFile: File | Blob | null;
}

export interface ReviewSubmission {
  reviewId: string;
  studentName: string;
  book: {
    id: string;
    title: string;
    authors: string[];
    isbn10?: string;
    isbn13?: string;
    thumbnail?: string;
  };
  rating: number;
  reviewType: ReviewType;
  fileName: string;
  mimeType: string;
  fileData: string;
  submittedAt: string;
}

export interface SubmissionResult {
  success: boolean;
  reviewId?: string;
  message?: string;
}
