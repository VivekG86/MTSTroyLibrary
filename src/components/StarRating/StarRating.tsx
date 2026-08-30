import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const ratingLabels: Record<number, string> = {
  1: 'Not for me',
  2: 'It was okay',
  3: 'I liked it!',
  4: 'Really good!',
  5: 'I loved it! 🎉',
};

interface StarRatingProps {
  value: number | null;
  onChange: (rating: number) => void;
  error?: string;
}

export const StarRating: React.FC<StarRatingProps> = ({ value, onChange, error }) => {
  const [hover, setHover] = useState<number | null>(null);
  const displayValue = hover ?? value ?? 0;

  return (
    <Box>
      <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
        How much did you like this book?
      </Typography>

      <Box sx={{ display: 'flex', gap: { xs: 1, sm: 1.5 }, mb: 1.5 }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Box
            key={star}
            component="button"
            onClick={() => onChange(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(null)}
            aria-label={`${star} star${star !== 1 ? 's' : ''}`}
            aria-pressed={value === star}
            sx={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              p: 0.5,
              borderRadius: 2,
              transition: 'transform 0.15s',
              '&:hover': { transform: 'scale(1.2)' },
              '&:focus': { outline: '2px solid', outlineColor: 'primary.main', transform: 'scale(1.2)' },
            }}
          >
            {star <= displayValue ? (
              <StarIcon sx={{ fontSize: { xs: 44, sm: 52 }, color: 'warning.main' }} />
            ) : (
              <StarBorderIcon sx={{ fontSize: { xs: 44, sm: 52 }, color: 'text.disabled' }} />
            )}
          </Box>
        ))}
      </Box>

      {(hover !== null || value !== null) && (
        <Typography variant="h6" fontWeight={700} color="warning.dark" sx={{ minHeight: 32 }}>
          {ratingLabels[hover ?? value ?? 0]}
        </Typography>
      )}

      {error && (
        <Typography variant="body2" color="error" sx={{ mt: 0.5 }}>{error}</Typography>
      )}
    </Box>
  );
};
