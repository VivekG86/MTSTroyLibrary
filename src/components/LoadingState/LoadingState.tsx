import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ message = 'Loading...' }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, py: 4 }}>
      <Box sx={{ position: 'relative' }}>
        <CircularProgress size={56} />
        <MenuBookIcon
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'primary.main',
            fontSize: 24,
          }}
        />
      </Box>
      <Typography variant="body1" fontWeight={600} color="text.secondary">
        {message}
      </Typography>
    </Box>
  );
};
