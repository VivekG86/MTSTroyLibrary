import { config } from '../config/config';

export function sanitizeFilename(name: string): string {
  return name
    .replace(/[^a-zA-Z0-9_\-.]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 100);
}

export function buildFileName(reviewId: string, bookTitle: string, ext: string): string {
  const safeTitle = sanitizeFilename(bookTitle).substring(0, 40);
  const safeId = sanitizeFilename(reviewId);
  return `${safeId}_${safeTitle}.${ext}`;
}

export function getFileExtension(mimeType: string): string {
  const map: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/png': 'png',
    'image/heic': 'heic',
    'image/heif': 'heif',
    'image/webp': 'webp',
    'audio/webm': 'webm',
    'audio/webm;codecs=opus': 'webm',
    'audio/mp4': 'mp4',
    'audio/ogg': 'ogg',
    'audio/wav': 'wav',
  };
  return map[mimeType] || 'bin';
}

export function validateImageFile(file: File): string | null {
  const type = file.type.toLowerCase();
  // Accept any image/* MIME type, plus empty type (common for iOS HEIC camera photos).
  // The file input already restricts to accept="image/*", so non-image files won't arrive here.
  const isImage = type === '' || type.startsWith('image/');
  if (!isImage) {
    return 'Please upload a JPG, PNG, or HEIC image.';
  }
  if (file.size > config.maxFileSizeBytes) {
    return 'Image is too large. Please use an image under 10MB.';
  }
  return null;
}

export function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}
