import { useState, useEffect, useCallback, useRef } from 'react';
import { Book } from '../types/book';
import { searchBooks } from '../services/googleBooksApi';
import { config } from '../config/config';

interface UseBookSearchReturn {
  query: string;
  setQuery: (q: string) => void;
  results: Book[];
  loading: boolean;
  error: string | null;
  clearResults: () => void;
}

export function useBookSearch(): UseBookSearchReturn {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearResults = useCallback(() => {
    setResults([]);
    setError(null);
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (query.trim().length < config.searchMinChars) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    debounceRef.current = setTimeout(async () => {
      try {
        const books = await searchBooks(query);
        setResults(books);
      } catch {
        setError("Hmm... We couldn't find those books. Try searching by another title or author.");
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, config.searchDebounceMs);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  return { query, setQuery, results, loading, error, clearResults };
}
