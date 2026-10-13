import React from 'react';
import { TextField, MenuItem, Typography, Box } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';

interface GradeSelectProps {
  value: string;
  onChange: (grade: string) => void;
  section: string;
  onSectionChange: (section: string) => void;
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

const SECTION_OPTIONS = ['A', 'B'];

export const GradeSelect: React.FC<GradeSelectProps> = ({ value, onChange, section, onSectionChange, error }) => {
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5, }}>
        <SchoolIcon color="primary" />
        <Typography variant="h6" fontWeight={700}>
          What grade are you in?
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
        <TextField
          select
          value={value}
          onChange={e => onChange(e.target.value)}
          error={!!error}
          helperText={error}
          slotProps={{ select: { displayEmpty: true } }}
          sx={{
            flex: 3,
            '& .MuiOutlinedInput-root': {
              borderRadius: 3,
              fontSize: '1.1rem',
              bgcolor: 'white',
            },
          }}
        >
          <MenuItem value="" disabled>Select your grade</MenuItem>
          {GRADE_OPTIONS.map(grade => (
            <MenuItem key={grade} value={grade}>{grade}</MenuItem>
          ))}
        </TextField>

        <TextField
          select
          value={section}
          onChange={e => onSectionChange(e.target.value)}
          slotProps={{ select: { displayEmpty: true } }}
          sx={{
            flex: 1,
            '& .MuiOutlinedInput-root': {
              borderRadius: 3,
              fontSize: '1.1rem',
              bgcolor: 'white',
              width: '100%',
            },
          }}
        >
          <MenuItem value="" disabled>Section</MenuItem>
          {SECTION_OPTIONS.map(s => (
            <MenuItem key={s} value={s}>{s}</MenuItem>
          ))}
        </TextField>
      </Box>
    </Box>
  );
};
