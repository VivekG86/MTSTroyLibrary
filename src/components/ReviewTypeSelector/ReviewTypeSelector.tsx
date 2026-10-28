import React from 'react';
import {
  Box, Card, CardActionArea, CardContent, Typography,
  Button, Collapse, useTheme, useMediaQuery,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { ReviewType } from '../../types/review';

interface ReviewTypeSelectorProps {
  selected: ReviewType | null;
  onSelect: (type: ReviewType) => void;
  onClear: () => void;
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
    title: 'Record My Voice',
    description: 'Tell us about the book out loud',
    emoji: '🎤',
    color: '#fce8f3',
    borderColor: '#e91e8c',
  },
  {
    type: 'video' as ReviewType,
    title: 'Record My Video',
    description: 'Show the book and talk on camera',
    emoji: '🎬',
    color: '#fff3e6',
    borderColor: '#ff7a00',
  },
];

export const ReviewTypeSelector: React.FC<ReviewTypeSelectorProps> = ({
  selected,
  onSelect,
  onClear,
  error,
}) => {
  const theme = useTheme();
  // Collapse unselected options on mobile (xs/sm); keep all visible on md+
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  // Respect prefers-reduced-motion by disabling the transition duration
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const collapseTimeout = prefersReducedMotion ? 0 : 200;

  return (
    <Box>
      {!selected && (
        <Typography variant="h6" fontWeight={700} sx={{ mb: 2 }}>
          How would you like to share your review?
        </Typography>
      )}

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
          gap: 2,
        }}
      >
        {options.map(({ type, title, description, emoji, color, borderColor }) => {
          const isSelected = selected === type;
          // On mobile, hide the unselected cards once a choice has been made.
          // On desktop, always show all cards.
          const isVisible = !isMobile || selected === null || isSelected;

          return (
            <Collapse
              key={type}
              in={isVisible}
              unmountOnExit
              timeout={collapseTimeout}
              // Let the card fill the grid row so all options share the same height
              sx={{ '& .MuiCollapse-wrapper, & .MuiCollapse-wrapperInner': { height: '100%' } }}
            >
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  borderRadius: 4,
                  border: '2.5px solid',
                  borderColor: isSelected ? borderColor : 'grey.200',
                  bgcolor: isSelected ? color : 'white',
                  transform: isSelected ? 'scale(1.02)' : 'scale(1)',
                  transition: prefersReducedMotion ? 'none' : 'all 0.2s',
                  boxShadow: isSelected ? `0 4px 20px ${borderColor}40` : 'none',
                }}
              >
                <CardActionArea
                  onClick={() => onSelect(type)}
                  sx={{ borderRadius: 4, height: '100%', display: 'flex', alignItems: 'flex-start' }}
                  aria-pressed={isSelected}
                  aria-label={`${title}: ${description}`}
                >
                  <CardContent sx={{ p: { xs: 3, sm: 2.5 }, textAlign: 'center', width: '100%' }}>
                    <Typography sx={{ fontSize: 48, mb: 1, lineHeight: 1 }}>{emoji}</Typography>
                    <Typography variant="h6" fontWeight={800} sx={{ mb: 0.5 }}>{title}</Typography>
                    <Typography variant="body2" color="text.secondary">{description}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Collapse>
          );
        })}
      </Box>

      {/* "Change review method" — only shown once a type has been selected */}
      {selected && (
        <Button
          startIcon={<ArrowBackIcon fontSize="small" />}
          onClick={onClear}
          variant="text"
          size="small"
          sx={{
            mt: 1.5,
            color: 'text.secondary',
            fontWeight: 600,
            textTransform: 'none',
            borderRadius: 2,
            fontSize: '0.875rem',
            '&:hover': { color: 'primary.main', bgcolor: 'action.hover' },
            '&:focus-visible': { outline: '2px solid', outlineColor: 'primary.main', outlineOffset: 2 },
          }}
          aria-label="Change review method — go back to choose between photo, voice and video"
        >
          Change review method
        </Button>
      )}

      {error && (
        <Typography variant="body2" color="error" sx={{ mt: 1 }}>{error}</Typography>
      )}
    </Box>
  );
};
