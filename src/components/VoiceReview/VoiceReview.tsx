import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Typography, Alert, LinearProgress } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import ReplayIcon from '@mui/icons-material/Replay';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useVoiceRecorder } from '../../hooks/useVoiceRecorder';
import { formatTime } from '../../utils/fileUtils';
import { config } from '../../config/config';

interface VoiceReviewProps {
  onAudioReady: (blob: Blob | null) => void;
  audioBlob: Blob | null;
}

export const VoiceReview: React.FC<VoiceReviewProps> = ({ onAudioReady }) => {
  const { state, audioBlob, audioUrl, elapsedSeconds, error, startRecording, stopRecording, resetRecording } = useVoiceRecorder();
  const [confirmed, setConfirmed] = useState(false);

  // Hand the recorded blob up to the parent as soon as it's available.
  // Use a ref for the callback so an unstable prop identity can't loop the effect.
  const onAudioReadyRef = useRef(onAudioReady);
  onAudioReadyRef.current = onAudioReady;
  useEffect(() => {
    onAudioReadyRef.current(audioBlob);
  }, [audioBlob]);

  const handleUseRecording = () => {
    setConfirmed(true);
  };

  const handleReset = () => {
    resetRecording();
    setConfirmed(false);
    onAudioReady(null);
  };

  const progress = (elapsedSeconds / config.maxAudioDurationSeconds) * 100;

  return (
    <Box>
      {error && (
        <Alert severity="warning" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>
      )}

      {state === 'idle' && !confirmed && (
        <Box sx={{ textAlign: 'center', py: 3 }}>
          <Typography sx={{ fontSize: 64, mb: 2 }}>🎤</Typography>
          <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
            Tell us about your book!
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Press the button and speak clearly. You have up to 2 minutes.
          </Typography>
          <Button
            variant="contained"
            startIcon={<MicIcon />}
            onClick={startRecording}
            size="large"
            sx={{
              borderRadius: 4,
              textTransform: 'none',
              fontWeight: 800,
              fontSize: '1.1rem',
              px: 4,
              py: 1.5,
              bgcolor: '#e91e8c',
              '&:hover': { bgcolor: '#c2185b' },
            }}
          >
            Start Recording
          </Button>
        </Box>
      )}

      {state === 'recording' && (
        <Box sx={{ textAlign: 'center', py: 3 }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              bgcolor: '#e91e8c',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 2,
              animation: 'pulse 1.5s infinite',
              '@keyframes pulse': {
                '0%': { boxShadow: '0 0 0 0 rgba(233, 30, 140, 0.5)' },
                '70%': { boxShadow: '0 0 0 20px rgba(233, 30, 140, 0)' },
                '100%': { boxShadow: '0 0 0 0 rgba(233, 30, 140, 0)' },
              },
            }}
          >
            <MicIcon sx={{ color: 'white', fontSize: 36 }} />
          </Box>

          <Typography variant="h5" fontWeight={800} color="error.main" sx={{ mb: 0.5 }}>
            🔴 Recording...
          </Typography>
          <Typography variant="h4" fontWeight={800} sx={{ mb: 2, fontVariantNumeric: 'tabular-nums' }}>
            {formatTime(config.maxAudioDurationSeconds - elapsedSeconds)}
          </Typography>

          <Box sx={{ mb: 3, px: 2 }}>
            <LinearProgress
              variant="determinate"
              value={progress}
              color="error"
              sx={{ height: 8, borderRadius: 4 }}
            />
          </Box>

          <Button
            variant="contained"
            startIcon={<StopIcon />}
            onClick={stopRecording}
            size="large"
            color="error"
            sx={{ borderRadius: 4, textTransform: 'none', fontWeight: 800, px: 4, py: 1.5 }}
          >
            Stop Recording
          </Button>
        </Box>
      )}

      {state === 'stopped' && !confirmed && audioUrl && (
        <Box>
          <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2 }}>
            Your Recording ({formatTime(elapsedSeconds)})
          </Typography>

          <Box sx={{ bgcolor: '#f8f6ff', borderRadius: 3, p: 2, mb: 3, border: '1px solid', borderColor: 'primary.light' }}>
            <audio controls src={audioUrl} style={{ width: '100%' }} aria-label="Your recorded review" />
          </Box>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              startIcon={<ReplayIcon />}
              onClick={handleReset}
              variant="outlined"
              sx={{ borderRadius: 3, textTransform: 'none', fontWeight: 700, flex: 1 }}
            >
              Record Again
            </Button>
            <Button
              startIcon={<CheckCircleIcon />}
              onClick={handleUseRecording}
              variant="contained"
              color="success"
              sx={{ borderRadius: 3, textTransform: 'none', fontWeight: 700, flex: 1 }}
            >
              Use This Recording
            </Button>
          </Box>
        </Box>
      )}

      {confirmed && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 1 }}>
          <CheckCircleIcon color="success" />
          <Typography color="success.main" fontWeight={700}>Recording saved!</Typography>
          <Button size="small" onClick={handleReset} sx={{ ml: 'auto', textTransform: 'none' }}>
            Record Again
          </Button>
        </Box>
      )}
    </Box>
  );
};
