import React, { useState, useRef, useEffect } from 'react';
import {
  Box, TextField, InputAdornment, CircularProgress,
  Paper, List, ListItem, ListItemAvatar, ListItemText,
  Avatar, Typography, Alert
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Book } from '../../types/book';
import { useBookSearch } from '../../hooks/useBookSearch';

interface BookSearchProps {
  onSelectBook: (book: Book) => void;
}

export const BookSearch: React.FC<BookSearchProps> = ({ onSelectBook }) => {
  const { query, setQuery, results, loading, error } = useBookSearch();
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const showDropdown = focused && (results.length > 0 || loading || !!error) && query.length >= 2;

  useEffect(() => {
    setOpen(showDropdown);
  }, [showDropdown]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setFocused(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (book: Book) => {
    onSelectBook(book);
    setFocused(false);
    setQuery('');
  };

  return (
    <Box ref={containerRef} sx={{ position: 'relative', width: '100%' }}>
      <TextField
        fullWidth
        value={query}
        onChange={e => setQuery(e.target.value)}
        onFocus={() => setFocused(true)}
        placeholder="Search by book title or author..."
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {loading ? <CircularProgress size={20} /> : <SearchIcon color="action" />}
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 3,
            fontSize: '1.05rem',
            bgcolor: 'white',
            '&.Mui-focused fieldset': { borderWidth: 2 },
          }
        }}
        aria-label="Search for a book"
      />

      {open && (
        <Paper
          elevation={8}
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            mt: 0.5,
            zIndex: 1300,
            borderRadius: 3,
            overflow: 'hidden',
            maxHeight: 420,
            overflowY: 'auto',
          }}
        >
          {error && (
            <Box p={2}>
              <Alert severity="warning" sx={{ borderRadius: 2 }}>{error}</Alert>
            </Box>
          )}
          {!error && results.length === 0 && !loading && query.length >= 2 && (
            <Box p={3} textAlign="center">
              <MenuBookIcon sx={{ fontSize: 40, color: 'text.disabled', mb: 1 }} />
              <Typography color="text.secondary">No books found. Try a different search!</Typography>
            </Box>
          )}
          <List disablePadding>
            {results.map((book) => (
              <ListItem
                key={book.id}
                onClick={() => handleSelect(book)}
                sx={{
                  cursor: 'pointer',
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  '&:last-child': { borderBottom: 'none' },
                  '&:hover': { bgcolor: 'primary.50' },
                  py: 1.5,
                }}
              >
                <ListItemAvatar>
                  <Avatar
                    src={book.thumbnail}
                    variant="rounded"
                    sx={{ width: 48, height: 64, borderRadius: 1.5 }}
                  >
                    <MenuBookIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography fontWeight={700} variant="body1" noWrap>{book.title}</Typography>
                  }
                  secondary={
                    <Typography variant="body2" color="text.secondary">
                      {book.authors.join(', ')}
                      {book.publishedDate && ` · ${book.publishedDate.substring(0, 4)}`}
                    </Typography>
                  }
                  sx={{ ml: 1 }}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};
