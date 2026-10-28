import { useState, useRef, useCallback, useEffect } from 'react';
import { config } from '../config/config';

type RecorderState = 'idle' | 'recording' | 'stopped' | 'error';

interface UseVideoRecorderReturn {
  state: RecorderState;
  stream: MediaStream | null;
  videoBlob: Blob | null;
  videoUrl: string | null;
  elapsedSeconds: number;
  error: string | null;
  startRecording: () => Promise<void>;
  stopRecording: () => void;
  resetRecording: () => void;
}

// Chrome/Firefox/Android record WebM; Safari (incl. iOS) records MP4.
const MIME_CANDIDATES = [
  'video/webm;codecs=vp8,opus',
  'video/webm',
  'video/mp4',
];

function pickMimeType(): string {
  return MIME_CANDIDATES.find(t => MediaRecorder.isTypeSupported(t)) ?? '';
}

export function useVideoRecorder(): UseVideoRecorderReturn {
  const [state, setState] = useState<RecorderState>('idle');
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const stopStream = useCallback(() => {
    streamRef.current?.getTracks().forEach(t => t.stop());
    streamRef.current = null;
    setStream(null);
  }, []);

  const startRecording = useCallback(async () => {
    try {
      setError(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 480 } },
        audio: true,
      });
      streamRef.current = mediaStream;
      setStream(mediaStream);

      const mimeType = pickMimeType();
      const recorder = new MediaRecorder(mediaStream, {
        ...(mimeType && { mimeType }),
        videoBitsPerSecond: config.videoBitsPerSecond,
      });
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        // Store the base MIME type (no codecs) so the server allowlist and file extension match
        const baseType = (recorder.mimeType || mimeType || 'video/webm').split(';')[0];
        const blob = new Blob(chunksRef.current, { type: baseType });
        setVideoBlob(blob);
        setVideoUrl(URL.createObjectURL(blob));
        setState('stopped');
        stopStream();
      };

      recorder.start(250);
      setState('recording');
      setElapsedSeconds(0);

      timerRef.current = setInterval(() => {
        setElapsedSeconds(prev => {
          if (prev >= config.maxVideoDurationSeconds - 1) {
            recorder.stop();
            stopTimer();
            return config.maxVideoDurationSeconds;
          }
          return prev + 1;
        });
      }, 1000);

    } catch (err) {
      stopStream();
      const message = err instanceof Error && err.name === 'NotAllowedError'
        ? "We couldn't access your camera. Please allow camera and microphone access or choose another review option."
        : "Your device doesn't support video recording. Please choose another review option.";
      setError(message);
      setState('error');
    }
  }, [stopTimer, stopStream]);

  const stopRecording = useCallback(() => {
    stopTimer();
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
  }, [stopTimer]);

  const resetRecording = useCallback(() => {
    stopTimer();
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.onstop = null;
      mediaRecorderRef.current.stop();
    }
    stopStream();
    if (videoUrl) URL.revokeObjectURL(videoUrl);
    setVideoBlob(null);
    setVideoUrl(null);
    setState('idle');
    setElapsedSeconds(0);
    setError(null);
    chunksRef.current = [];
  }, [stopTimer, stopStream, videoUrl]);

  useEffect(() => {
    return () => {
      stopTimer();
      streamRef.current?.getTracks().forEach(t => t.stop());
    };
  }, [stopTimer]);

  return {
    state,
    stream,
    videoBlob,
    videoUrl,
    elapsedSeconds,
    error,
    startRecording,
    stopRecording,
    resetRecording,
  };
}
