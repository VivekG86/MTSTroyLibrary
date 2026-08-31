import React from 'react';
import { TextField, MenuItem, Typography, Box } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';

interface GradeSelectProps {
  value: string;
  onChange: (grade: string) => void;
  error?: string;
}

export const GRADE_OPTIONS = [
  'Kindergarten',
  '1st Grade',
  '2nd Grade',
  '3rd Grade',
  '4th Grade',
  '5th Grade',
  '6th Grade',
  '7th Grade',
  '8th Grade',
];

export const GradeSelect: React.FC<GradeSelectProps> = ({ value, onChange, error }) => {
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
        <SchoolIcon color="primary" />
        <Typography variant="h6" fontWeight={700}>
          What grade are you in?
        </Typography>
      </Box>
      <TextField
        select
        fullWidth
        value={value}
        onChange={e => onChange(e.target.value)}
        error={!!error}
        helperText={error}
        SelectProps={{ displayEmpty: true }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: 3,
            fontSize: '1.1rem',
            bgcolor: 'white',
          },
        }}
      >
        <MenuItem value="" disabled>
          Select your grade
        </MenuItem>
        {GRADE_OPTIONS.map(grade => (
          <MenuItem key={grade} value={grade}>
            {grade}
          </MenuItem>
        ))}
      </TextField>
    </Box>
  );
};
