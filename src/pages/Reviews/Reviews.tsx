import React from 'react';
import { Box, Container, Typography, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const Reviews: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', py: 8, px: 2, bgcolor: '#fafbff' }}>
      <Container maxWidth="sm">
        <Paper elevation={0} sx={{ borderRadius: 6, p: { xs: 4, sm: 6 }, textAlign: 'center', border: '2px solid', borderColor: 'primary.light' }}>
          <Typography sx={{ fontSize: 72, mb: 2 }}>📚</Typography>
          <Typography variant="h4" fontWeight={900} color="primary.main" sx={{ mb: 1.5 }}>
            Reviews Coming Soon!
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.8 }}>
            We're working on a place where you can read reviews from other kids at Troy Library. Check back soon!
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/')}
            size="large"
            sx={{ borderRadius: 4, py: 1.75, fontWeight: 800, textTransform: 'none', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
          >
            Share Your Review
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};
