import React from 'react';
import { Box, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { SchoolLocation } from '../../types/review';

export const SCHOOL_LOCATIONS: SchoolLocation[] = ['Troy', 'Farmington', 'Canton', 'Livonia'];

interface SchoolSelectProps {
  location: SchoolLocation;
  onChange: (location: SchoolLocation) => void;
}

export const SchoolSelect: React.FC<SchoolSelectProps> = ({ location, onChange }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'stretch',
        bgcolor: 'white',
        border: '1px solid',
        borderColor: 'grey.400',
        borderRadius: 3,
        overflow: 'hidden',
        height: 56,
        '&:focus-within': {
          borderColor: 'primary.main',
          boxShadow: '0 0 0 2px rgba(102,126,234,0.25)',
        },
      }}
    >
      {/* Fixed "MTS-" prefix */}
      <Typography
        aria-hidden="true"
        sx={{
          display: 'flex',
          alignItems: 'center',
          px: 2,
          fontSize: '1.05rem',
          fontWeight: 700,
          color: 'text.primary',
          whiteSpace: 'nowrap',
          borderRight: '1px solid',
          borderColor: 'grey.300',
          bgcolor: 'grey.50',
          userSelect: 'none',
          flexShrink: 0,
        }}
      >
        MTS-
      </Typography>

      {/* Select wrapper — positions the native select and custom arrow together */}
      <Box sx={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>
        <Box
          component="select"
          id="school-location-select"
          value={location}
          onChange={e => onChange(e.target.value as SchoolLocation)}
          aria-label="School location — MTS"
          sx={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            border: 'none',
            outline: 'none',
            pl: 2,
            pr: 6,            // room for the custom arrow
            fontSize: '1.05rem',
            fontFamily: 'inherit',
            color: 'text.primary',
            bgcolor: 'transparent',
            cursor: 'pointer',
            appearance: 'none',
            WebkitAppearance: 'none',
          }}
        >
          {SCHOOL_LOCATIONS.map(loc => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </Box>

        {/* Custom arrow — larger, with right margin so it doesn't hug the edge */}
        <KeyboardArrowDownIcon
          sx={{
            position: 'absolute',
            right: 14,
            fontSize: 28,
            color: 'text.secondary',
            pointerEvents: 'none',  // clicks pass through to the select
          }}
        />
      </Box>
    </Box>
  );
};
