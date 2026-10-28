import React from 'react';
import { TextField, Box } from '@mui/material';

interface BookDetailsProps {
  title: string;
  author: string;
  onTitleChange: (title: string) => void;
  onAuthorChange: (author: string) => void;
  titleError?: string;
  authorError?: string;
}

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 3,
    fontSize: '1.1rem',
    bgcolor: 'white',
  },
};

export const BookDetails: React.FC<BookDetailsProps> = ({
  title,
  author,
  onTitleChange,
  onAuthorChange,
  titleError,
  authorError,
}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        fullWidth
        label="Book Title"
        value={title}
        onChange={e => onTitleChange(e.target.value)}
        placeholder="e.g. Venmurasu"
        error={!!titleError}
        helperText={titleError}
        inputProps={{ maxLength: 200 }}
        sx={fieldSx}
      />
      <TextField
        fullWidth
        label="Author"
        value={author}
        onChange={e => onAuthorChange(e.target.value)}
        placeholder="e.g. Jeyamohan"
        error={!!authorError}
        helperText={authorError}
        inputProps={{ maxLength: 120 }}
        sx={fieldSx}
      />
    </Box>
  );
};
