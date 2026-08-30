import React from 'react';
import { Box, Container, Typography, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const About: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box sx={{ bgcolor: '#fafbff', minHeight: '80vh', py: { xs: 4, sm: 8 }, px: 2 }}>
      <Container maxWidth="sm">
        <Paper elevation={0} sx={{ borderRadius: 6, p: { xs: 3, sm: 5 }, border: '2px solid', borderColor: 'primary.light' }}>
          <Typography variant="h4" fontWeight={900} color="primary.main" sx={{ mb: 0.5 }}>📚 About Our Reviews</Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>Troy Community Library</Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {[
              { emoji: '🔍', title: 'Find Your Book', text: "Search for any book you've read using the title or the author's name." },
              { emoji: '⭐', title: 'Rate It', text: 'Give it 1 to 5 stars based on how much you enjoyed reading it.' },
              { emoji: '📷', title: 'Share Your Thoughts', text: 'Write your review on paper, take a photo, or record yourself talking about the book.' },
              { emoji: '🎉', title: 'Help Other Readers', text: 'Your review helps other kids at the library find amazing books to read!' },
            ].map(({ emoji, title, text }) => (
              <Box key={title} sx={{ display: 'flex', gap: 2 }}>
                <Typography sx={{ fontSize: 32, flexShrink: 0 }}>{emoji}</Typography>
                <Box>
                  <Typography variant="subtitle1" fontWeight={700}>{title}</Typography>
                  <Typography variant="body2" color="text.secondary">{text}</Typography>
                </Box>
              </Box>
            ))}
          </Box>

          <Box sx={{ mt: 4, p: 2.5, bgcolor: '#f0f4ff', borderRadius: 3 }}>
            <Typography variant="body2" color="text.secondary">
              <strong>For Parents & Teachers:</strong> This app collects only a first name, book information, and a review (photo or audio). No accounts, passwords, or personal data beyond a first name are collected.
            </Typography>
          </Box>

          <Button
            fullWidth
            variant="contained"
            onClick={() => navigate('/')}
            size="large"
            sx={{ mt: 3, borderRadius: 4, py: 1.75, fontWeight: 800, textTransform: 'none', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
          >
            📚 Submit a Book Review
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};
