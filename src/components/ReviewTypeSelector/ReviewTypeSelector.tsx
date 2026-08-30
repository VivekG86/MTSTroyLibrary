import React from 'react';
import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material';
import { ReviewType } from '../../types/review';

interface ReviewTypeSelectorProps {
  selected: ReviewType | null;
  onSelect: (type: ReviewType) => void;
  error?: string;
}

const options = [
  {
    type: 'image' as ReviewType,
    title: 'Scan My Review',
    description: 'Take a photo of your handwritten review',
    emoji: '📷',
    color: '#e8f4fd',
    borderColor: '#2196f3',
  },
  {
    type: 'audio' as ReviewType,
    title: 'Record My Review',
    description: 'Tell us about the book out loud',
    emoji: '🎤',
    color: '#fce8f3',
    borderColor: '#e91e8c',
  },
];

export const ReviewTypeSelector: React.FC<ReviewTypeSelectorProps> = ({ selected, onSelect, error }) => {
  return (
    <Box>
      <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
        How would you like to share your review?
      </Typography>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
        {options.map(({ type, title, description, emoji, color, borderColor }) => {
          const isSelected = selected === type;
          return (
            <Card
              key={type}
              elevation={0}
              sx={{
                borderRadius: 4,
                border: '2.5px solid',
                borderColor: isSelected ? borderColor : 'grey.200',
                bgcolor: isSelected ? color : 'white',
                transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                transition: 'all 0.2s',
                boxShadow: isSelected ? `0 4px 20px ${borderColor}40` : 'none',
              }}
            >
              <CardActionArea
                onClick={() => onSelect(type)}
                sx={{ borderRadius: 4 }}
                aria-pressed={isSelected}
              >
                <CardContent sx={{ p: 3, textAlign: 'center' }}>
                  <Typography sx={{ fontSize: 48, mb: 1, lineHeight: 1 }}>{emoji}</Typography>
                  <Typography variant="h6" fontWeight={800} sx={{ mb: 0.5 }}>{title}</Typography>
                  <Typography variant="body2" color="text.secondary">{description}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          );
        })}
      </Box>

      {error && (
        <Typography variant="body2" color="error" sx={{ mt: 1 }}>{error}</Typography>
      )}
    </Box>
  );
};
