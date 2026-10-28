export type ReviewType = 'image' | 'audio' | 'video';

export type SchoolLocation = 'Troy' | 'Farmington' | 'Canton' | 'Livonia';

export interface ReviewFormState {
  organization: 'MTS';
  schoolLocation: SchoolLocation;
  bookTitle: string;
  bookAuthor: string;
  studentName: string;
  grade: string;
  section: string;
  rating: number | null;
  reviewType: ReviewType | null;
  reviewFile: File | Blob | null;
}

export interface ReviewSubmission {
  reviewId: string;
  organization: 'MTS';
  schoolLocation: SchoolLocation;
  studentName: string;
  grade: string;
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
  fileData: Blob;
  submittedAt: string;
}

export interface SubmissionResult {
  success: boolean;
  reviewId?: string;
  message?: string;
}
