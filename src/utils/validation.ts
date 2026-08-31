import { ReviewFormState } from '../types/review';

export interface ValidationErrors {
  book?: string;
  studentName?: string;
  rating?: string;
  reviewType?: string;
  reviewFile?: string;
}

export function validateReviewForm(state: ReviewFormState): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!state.book) {
    errors.book = 'Please search for and select a book.';
  }

  const name = state.studentName.trim();
  if (!name) {
    errors.studentName = 'Please enter your name.';
  } else if (name.length < 2) {
    errors.studentName = 'Name must be at least 2 characters.';
  } else if (name.length > 60) {
    errors.studentName = 'Name is too long.';
  }

  if (!state.rating) {
    errors.rating = 'Please give the book a star rating.';
  }

  if (!state.reviewType) {
    errors.reviewType = 'Please choose how you want to share your review.';
  }

  if (!state.reviewFile) {
    if (state.reviewType === 'image') {
      errors.reviewFile = 'Please take or upload a photo of your review.';
    } else if (state.reviewType === 'audio') {
      errors.reviewFile = 'Please record your review.';
    }
  }

  return errors;
}

export function hasErrors(errors: ValidationErrors): boolean {
  return Object.keys(errors).length > 0;
}

/**
 * True only when every required input/option is provided and valid.
 * Used to gate the submit button.
 */
export function isReviewFormComplete(state: ReviewFormState): boolean {
  return !hasErrors(validateReviewForm(state));
}
