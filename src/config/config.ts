export const config = {
  googleBooksApiUrl: import.meta.env.VITE_GOOGLE_BOOKS_API_URL || 'https://www.googleapis.com/books/v1',
  reviewApiUrl: import.meta.env.VITE_REVIEW_API_URL || '',
  searchDebounceMs: 400,
  searchMinChars: 2,
  maxSearchResults: 8,
  maxImageSizeMB: 10,
  maxAudioDurationSeconds: 120,
  maxFileSizeBytes: 10 * 1024 * 1024,
  appName: 'Troy Library',
  appTagline: 'Share Your Book Review!',
};
