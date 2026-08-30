import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Button, Paper } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import { Book } from '../../types/book';

interface SuccessState {
  book: Book;
  rating: number;
  reviewId: string;
  studentName: string;
}

export const Success: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as SuccessState | null;

  useEffect(() => {
    if (!state) navigate('/');
  }, [state, navigate]);

  if (!state) return null;

  const stars = '⭐'.repeat(state.rating);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fafbff', display: 'flex', alignItems: 'center', justifyContent: 'center', py: 4, px: 2 }}>
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            borderRadius: 6,
            p: { xs: 3, sm: 5 },
            textAlign: 'center',
            border: '2px solid',
            borderColor: 'primary.light',
            boxShadow: '0 8px 60px rgba(102, 126, 234, 0.15)',
            background: 'linear-gradient(135deg, #f8f6ff 0%, #fff8f0 100%)',
          }}
        >
          <Typography sx={{ fontSize: { xs: 64, sm: 80 }, mb: 1 }}>🎉</Typography>
          <Typography variant="h3" fontWeight={900} color="primary.main" sx={{ mb: 0.5, fontSize: { xs: '1.8rem', sm: '2.2rem' } }}>
            Review Submitted!
          </Typography>
          <Typography variant="h6" color="text.secondary" fontWeight={500} sx={{ mb: 3 }}>
            Amazing job, {state.studentName}! 🌟
          </Typography>

          <Box sx={{ bgcolor: 'white', borderRadius: 4, p: 3, mb: 3, border: '1px solid', borderColor: 'grey.100' }}>
            {state.book.thumbnail && (
              <Box
                component="img"
                src={state.book.thumbnail}
                alt={state.book.title}
                sx={{ width: 80, height: 112, objectFit: 'cover', borderRadius: 2, boxShadow: 3, mb: 2 }}
              />
            )}
            <Typography variant="h6" fontWeight={800} sx={{ mb: 0.5 }}>📚 {state.book.title}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {state.book.authors.join(', ')}
            </Typography>
            <Typography variant="h5">{stars}</Typography>
          </Box>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.8 }}>
            Every review helps other readers discover great books!
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate('/')}
              size="large"
              sx={{
                borderRadius: 4, py: 1.75, fontWeight: 800, textTransform: 'none', fontSize: '1rem',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              }}
            >
              Review Another Book
            </Button>
            <Button
              variant="outlined"
              startIcon={<HomeIcon />}
              onClick={() => navigate('/')}
              size="large"
              sx={{ borderRadius: 4, py: 1.75, fontWeight: 700, textTransform: 'none' }}
            >
              Back to Library
            </Button>
          </Box>

          <Typography variant="caption" color="text.disabled" sx={{ display: 'block', mt: 3 }}>
            Review ID: {state.reviewId}
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};
