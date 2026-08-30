import { Book } from '../types/book';
import { config } from '../config/config';

interface GoogleBooksVolume {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    imageLinks?: {
      thumbnail?: string;
      smallThumbnail?: string;
    };
    industryIdentifiers?: Array<{
      type: string;
      identifier: string;
    }>;
    publisher?: string;
    publishedDate?: string;
    pageCount?: number;
    categories?: string[];
  };
}

interface GoogleBooksResponse {
  totalItems: number;
  items?: GoogleBooksVolume[];
}

function mapVolumeToBook(volume: GoogleBooksVolume): Book {
  const info = volume.volumeInfo;
  const isbns = info.industryIdentifiers || [];
  const isbn10 = isbns.find(i => i.type === 'ISBN_10')?.identifier;
  const isbn13 = isbns.find(i => i.type === 'ISBN_13')?.identifier;

  let thumbnail = info.imageLinks?.thumbnail || info.imageLinks?.smallThumbnail;
  if (thumbnail) {
    thumbnail = thumbnail.replace('http://', 'https://');
  }

  return {
    id: volume.id,
    title: info.title,
    authors: info.authors || ['Unknown Author'],
    description: info.description,
    thumbnail,
    isbn10,
    isbn13,
    publisher: info.publisher,
    publishedDate: info.publishedDate,
    pageCount: info.pageCount,
    categories: info.categories,
  };
}

export async function searchBooks(query: string): Promise<Book[]> {
  if (!query || query.trim().length < 2) return [];

  const params = new URLSearchParams({
    q: query.trim(),
    maxResults: String(config.maxSearchResults),
    printType: 'books',
    langRestrict: 'en',
  });

  const url = `${config.googleBooksApiUrl}/volumes?${params}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Google Books API error: ${response.status}`);
  }

  const data: GoogleBooksResponse = await response.json();
  return (data.items || []).map(mapVolumeToBook);
}
