export interface Book {
  id: string;
  title: string;
  authors: string[];
  description?: string;
  thumbnail?: string;
  isbn10?: string;
  isbn13?: string;
  publisher?: string;
  publishedDate?: string;
  pageCount?: number;
  categories?: string[];
}
