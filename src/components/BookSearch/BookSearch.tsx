import React, { useState, useRef, useEffect } from 'react';
import {
  Box, TextField, InputAdornment, CircularProgress,
  Paper, List, ListItem, ListItemAvatar, ListItemText,
  Avatar, Typography, Alert, Button, Link as MuiLink
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Book } from '../../types/book';
import { useBookSearch } from '../../hooks/useBookSearch';

interface BookSearchProps {
  onSelectBook: (book: Book) => void;
}

export const BookSearch: React.FC<BookSearchProps> = ({ onSelectBook }) => {
  const { query, setQuery, results, loading, error } = useBookSearch();
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [manual, setManual] = useState(false);
  const [manualTitle, setManualTitle] = useState('');
  const [manualAuthor, setManualAuthor] = useState('');
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

  const openManual = () => {
    setManualTitle(query.trim());
    setManualAuthor('');
    setManual(true);
    setFocused(false);
  };

  const handleManualAdd = () => {
    const title = manualTitle.trim();
    if (!title) return;
    const authors = manualAuthor.trim() ? [manualAuthor.trim()] : ['Unknown Author'];
    onSelectBook({
      id: `manual-${Date.now()}`,
      title,
      authors,
    });
    setManual(false);
    setQuery('');
  };

  if (manual) {
    return (
      <Box ref={containerRef} sx={{ width: '100%' }}>
        <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1.5 }}>
          Enter your book details
        </Typography>
        <TextField
          fullWidth
          value={manualTitle}
          onChange={e => setManualTitle(e.target.value)}
          placeholder="Book title"
          label="Book title"
          inputProps={{ maxLength: 200 }}
          sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 3, bgcolor: 'white' } }}
        />
        <TextField
          fullWidth
          value={manualAuthor}
          onChange={e => setManualAuthor(e.target.value)}
          placeholder="Author (optional)"
          label="Author"
          inputProps={{ maxLength: 120 }}
          sx={{ mb: 2, '& .MuiOutlinedInput-root': { borderRadius: 3, bgcolor: 'white' } }}
        />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={() => setManual(false)}
            sx={{ borderRadius: 3, textTransform: 'none', fontWeight: 700, flex: 1 }}
          >
            Back to search
          </Button>
          <Button
            variant="contained"
            onClick={handleManualAdd}
            disabled={!manualTitle.trim()}
            sx={{ borderRadius: 3, textTransform: 'none', fontWeight: 700, flex: 1 }}
          >
            Use This Book
          </Button>
        </Box>
      </Box>
    );
  }

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

          {query.length >= 2 && !loading && (
            <Box
              sx={{
                p: 1.5,
                borderTop: results.length > 0 ? '1px solid' : 'none',
                borderColor: 'divider',
                textAlign: 'center',
              }}
            >
              <Button
                startIcon={<AddCircleOutlineIcon />}
                onClick={openManual}
                sx={{ textTransform: 'none', fontWeight: 700, borderRadius: 2 }}
              >
                Can't find it? Add "{query.trim()}" manually
              </Button>
            </Box>
          )}
        </Paper>
      )}

      <Box sx={{ mt: 1 }}>
        <MuiLink
          component="button"
          type="button"
          onClick={openManual}
          underline="hover"
          sx={{ fontSize: '0.875rem', fontWeight: 600 }}
        >
          Can't find your book? Enter it manually
        </MuiLink>
      </Box>
    </Box>
  );
};
