export const config = {
  reviewApiUrl: import.meta.env.VITE_REVIEW_API_URL || '',
  maxImageSizeMB: 10,
  maxAudioDurationSeconds: 120,
  maxVideoDurationSeconds: 120,
  // ~1 Mbps keeps a 2-minute video around 15 MB, well under the 50 MB upload limit
  videoBitsPerSecond: 1_000_000,
  maxFileSizeBytes: 10 * 1024 * 1024,
  appName: 'Troy Library',
  appTagline: 'Share Your Book Review!',
};
