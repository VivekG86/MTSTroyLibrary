import React from 'react';
import { Box, Card, CardContent, Typography, Button, Chip } from '@mui/material';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import StarIcon from '@mui/icons-material/Star';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { Book } from '../../types/book';

interface BookCardProps {
  book: Book;
  onChangeBook: () => void;
}

export const BookCard: React.FC<BookCardProps> = ({ book, onChangeBook }) => {
  return (
    <Card
      elevation={0}
      sx={{
        border: '2px solid',
        borderColor: 'primary.light',
        borderRadius: 4,
        background: 'linear-gradient(135deg, #f8f6ff 0%, #fff8f0 100%)',
      }}
    >
      <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
        <Box sx={{ display: 'flex', gap: 2.5, alignItems: 'flex-start' }}>
          {book.thumbnail ? (
            <Box
              component="img"
              src={book.thumbnail}
              alt={`Cover of ${book.title}`}
              sx={{
                width: { xs: 80, sm: 100 },
                height: { xs: 112, sm: 140 },
                objectFit: 'cover',
                borderRadius: 2,
                boxShadow: 4,
                flexShrink: 0,
              }}
            />
          ) : (
            <Box
              sx={{
                width: { xs: 80, sm: 100 },
                height: { xs: 112, sm: 140 },
                bgcolor: 'primary.main',
                borderRadius: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 4,
                flexShrink: 0,
              }}
            >
              <MenuBookIcon sx={{ color: 'white', fontSize: 40 }} />
            </Box>
          )}

          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="h6" fontWeight={800} sx={{ lineHeight: 1.3, mb: 0.5 }}>
              {book.title}
            </Typography>
            <Typography variant="body2" color="text.secondary" fontWeight={600} sx={{ mb: 1.5 }}>
              {book.authors.join(', ')}
            </Typography>
            {book.publishedDate && (
              <Typography variant="caption" color="text.disabled">
                {book.publishedDate.substring(0, 4)}
              </Typography>
            )}
            <Box sx={{ mt: 1.5 }}>
              <Chip
                icon={<StarIcon sx={{ fontSize: 16 }} />}
                label="Great choice!"
                size="small"
                sx={{
                  bgcolor: 'warning.light',
                  color: 'warning.dark',
                  fontWeight: 700,
                  borderRadius: 2,
                }}
              />
            </Box>
          </Box>
        </Box>

        <Button
          startIcon={<ChangeCircleIcon />}
          onClick={onChangeBook}
          variant="text"
          size="small"
          sx={{ mt: 2, fontWeight: 600, textTransform: 'none', borderRadius: 2 }}
        >
          Change Book
        </Button>
      </CardContent>
    </Card>
  );
};
