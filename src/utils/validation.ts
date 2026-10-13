import { ReviewFormState, SchoolLocation } from '../types/review';

const VALID_LOCATIONS: SchoolLocation[] = ['Troy', 'Farmington', 'Canton', 'Livonia'];

export interface ValidationErrors {
  schoolLocation?: string;
  book?: string;
  studentName?: string;
  grade?: string;
  rating?: string;
  reviewType?: string;
  reviewFile?: string;
}

export function validateReviewForm(state: ReviewFormState): ValidationErrors {
  const errors: ValidationErrors = {};

  if (!VALID_LOCATIONS.includes(state.schoolLocation)) {
    errors.schoolLocation = 'Please select a valid school location.';
  }

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

  if (!state.grade.trim()) {
    errors.grade = 'Please select your grade and section.';
  } else if (!state.section) {
    errors.grade = 'Please select your section (A or B).';
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
