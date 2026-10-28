import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, Typography, Alert, LinearProgress } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import StopIcon from '@mui/icons-material/Stop';
import ReplayIcon from '@mui/icons-material/Replay';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useVideoRecorder } from '../../hooks/useVideoRecorder';
import { formatTime } from '../../utils/fileUtils';
import { config } from '../../config/config';

const ACCENT = '#ff7a00';
const ACCENT_DARK = '#e65100';

interface VideoReviewProps {
  onVideoReady: (blob: Blob | null) => void;
}

export const VideoReview: React.FC<VideoReviewProps> = ({ onVideoReady }) => {
  const { state, stream, videoBlob, videoUrl, elapsedSeconds, error, startRecording, stopRecording, resetRecording } = useVideoRecorder();
  const [confirmed, setConfirmed] = useState(false);
  const previewRef = useRef<HTMLVideoElement | null>(null);

  // Hand the recorded blob up to the parent as soon as it's available.
  // Use a ref for the callback so an unstable prop identity can't loop the effect.
  const onVideoReadyRef = useRef(onVideoReady);
  onVideoReadyRef.current = onVideoReady;
  useEffect(() => {
    onVideoReadyRef.current(videoBlob);
  }, [videoBlob]);

  // Show the live camera feed while recording
  useEffect(() => {
    if (previewRef.current) previewRef.current.srcObject = stream;
  }, [stream, state]);

  const handleReset = () => {
    resetRecording();
    setConfirmed(false);
    onVideoReady(null);
  };

  const progress = (elapsedSeconds / config.maxVideoDurationSeconds) * 100;

  const videoFrameSx = {
    width: '100%',
    maxHeight: 360,
    borderRadius: 12,
    background: '#000',
    display: 'block',
  } as const;

  return (
    <Box>
      {error && (
        <Alert severity="warning" sx={{ mb: 2, borderRadius: 2 }}>{error}</Alert>
      )}

      {(state === 'idle' || state === 'error') && !confirmed && (
        <Box sx={{ textAlign: 'center', py: 3 }}>
          <Typography sx={{ fontSize: 64, mb: 2 }}>🎬</Typography>
          <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
            Tell us about your book on camera!
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Hold the book up, look at the camera and speak clearly. You have up to 2 minutes.
          </Typography>
          <Button
            variant="contained"
            startIcon={<VideocamIcon />}
            onClick={startRecording}
            size="large"
            sx={{
              borderRadius: 4,
              textTransform: 'none',
              fontWeight: 800,
              fontSize: '1.1rem',
              px: 4,
              py: 1.5,
              bgcolor: ACCENT,
              '&:hover': { bgcolor: ACCENT_DARK },
            }}
          >
            Start Video
          </Button>
        </Box>
      )}

      {state === 'recording' && (
        <Box sx={{ textAlign: 'center' }}>
          <Box sx={{ position: 'relative', mb: 2 }}>
            <video
              ref={previewRef}
              autoPlay
              muted
              playsInline
              style={{ ...videoFrameSx, transform: 'scaleX(-1)' }}
              aria-label="Live camera preview"
            />
            <Typography
              variant="body2"
              fontWeight={800}
              sx={{
                position: 'absolute',
                top: 12,
                left: 12,
                px: 1.25,
                py: 0.5,
                borderRadius: 2,
                bgcolor: 'rgba(0,0,0,0.6)',
                color: 'white',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              🔴 {formatTime(config.maxVideoDurationSeconds - elapsedSeconds)}
            </Typography>
          </Box>

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
            Stop Video
          </Button>
        </Box>
      )}

      {state === 'stopped' && !confirmed && videoUrl && (
        <Box>
          <Typography variant="subtitle1" fontWeight={700} sx={{ mb: 2 }}>
            Your Video ({formatTime(elapsedSeconds)})
          </Typography>

          <Box sx={{ mb: 3 }}>
            <video controls playsInline src={videoUrl} style={videoFrameSx} aria-label="Your recorded video review" />
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
              onClick={() => setConfirmed(true)}
              variant="contained"
              color="success"
              sx={{ borderRadius: 3, textTransform: 'none', fontWeight: 700, flex: 1 }}
            >
              Use This Video
            </Button>
          </Box>
        </Box>
      )}

      {confirmed && (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 1 }}>
          <CheckCircleIcon color="success" />
          <Typography color="success.main" fontWeight={700}>Video saved!</Typography>
          <Button size="small" onClick={handleReset} sx={{ ml: 'auto', textTransform: 'none' }}>
            Record Again
          </Button>
        </Box>
      )}
    </Box>
  );
};
