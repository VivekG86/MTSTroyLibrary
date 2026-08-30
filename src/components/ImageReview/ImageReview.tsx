import React, { useRef, useState } from 'react';
import { Box, Button, Typography, Alert } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import ReplayIcon from '@mui/icons-material/Replay';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { validateImageFile } from '../../utils/fileUtils';

interface ImageReviewProps {
  onFileSelected: (file: File | null) => void;
  selectedFile: File | null;
}

export const ImageReview: React.FC<ImageReviewProps> = ({ onFileSelected }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validationError = validateImageFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    setConfirmed(false);
    const url = URL.createObjectURL(file);
    setPreview(url);
    onFileSelected(file);
  };

  const handleRetake = () => {
    setPreview(null);
    setConfirmed(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
    onFileSelected(null);
    setTimeout(() => fileInputRef.current?.click(), 100);
  };

  const handleConfirm = () => {
    setConfirmed(true);
  };

  return (
    <Box>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />

      {error && (
        <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>
      )}

      {!preview ? (
        <Box
          onClick={() => fileInputRef.current?.click()}
          sx={{
            border: '3px dashed',
            borderColor: 'primary.light',
            borderRadius: 4,
            p: 4,
            textAlign: 'center',
            cursor: 'pointer',
            bgcolor: '#f8f6ff',
            '&:hover': { bgcolor: '#f0eaff', borderColor: 'primary.main' },
            transition: 'all 0.2s',
          }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && fileInputRef.current?.click()}
        >
          <Typography sx={{ fontSize: 56, mb: 1 }}>📷</Typography>
          <Typography variant="h6" fontWeight={700} sx={{ mb: 0.5 }}>
            Take a Photo of Your Review
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Take a picture or choose an image from your device
          </Typography>
          <Button
            variant="contained"
            startIcon={<CameraAltIcon />}
            sx={{ borderRadius: 3, textTransform: 'none', fontWeight: 700, px: 3 }}
            onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
          >
            Open Camera / Choose Photo
          </Button>
        </Box>
      ) : (
        <Box>
          <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 1.5 }}>
            Your Review Photo
          </Typography>
          <Box
            sx={{
              borderRadius: 4,
              overflow: 'hidden',
              boxShadow: 4,
              maxHeight: 400,
              display: 'flex',
              justifyContent: 'center',
              bgcolor: 'black',
            }}
          >
            <Box
              component="img"
              src={preview}
              alt="Your handwritten review"
              sx={{ maxWidth: '100%', maxHeight: 400, objectFit: 'contain' }}
            />
          </Box>

          {!confirmed ? (
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Button
                startIcon={<ReplayIcon />}
                onClick={handleRetake}
                variant="outlined"
                sx={{ borderRadius: 3, textTransform: 'none', fontWeight: 700, flex: 1 }}
              >
                Retake
              </Button>
              <Button
                startIcon={<CheckCircleIcon />}
                onClick={handleConfirm}
                variant="contained"
                color="success"
                sx={{ borderRadius: 3, textTransform: 'none', fontWeight: 700, flex: 1 }}
              >
                Use This Photo
              </Button>
            </Box>
          ) : (
            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <CheckCircleIcon color="success" />
              <Typography color="success.main" fontWeight={700}>Photo selected!</Typography>
              <Button size="small" onClick={handleRetake} sx={{ ml: 'auto', textTransform: 'none' }}>
                Change
              </Button>
            </Box>
          )}
        </Box>
      )}
    </Box>
  );
};
