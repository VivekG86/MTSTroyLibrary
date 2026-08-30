import React from 'react';
import { TextField, Typography, Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

interface StudentNameProps {
  value: string;
  onChange: (name: string) => void;
  error?: string;
}

export const StudentName: React.FC<StudentNameProps> = ({ value, onChange, error }) => {
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
        <PersonIcon color="primary" />
        <Typography variant="h6" fontWeight={700}>
          What's your name?
        </Typography>
      </Box>
      <TextField
        fullWidth
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Enter your first name"
        error={!!error}
        helperText={error}
        inputProps={{ maxLength: 60 }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 3,
            fontSize: '1.1rem',
            bgcolor: 'white',
          }
        }}
      />
    </Box>
  );
};
