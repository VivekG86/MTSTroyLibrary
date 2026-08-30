import { useState, useRef, useCallback, useEffect } from 'react';
import { config } from '../config/config';

type RecorderState = 'idle' | 'recording' | 'stopped' | 'error';

interface UseVoiceRecorderReturn {
  state: RecorderState;
  audioBlob: Blob | null;
  audioUrl: string | null;
  elapsedSeconds: number;
  error: string | null;
  startRecording: () => Promise<void>;
  stopRecording: () => void;
  resetRecording: () => void;
}

export function useVoiceRecorder(): UseVoiceRecorderReturn {
  const [state, setState] = useState<RecorderState>('idle');
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
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

  const startRecording = useCallback(async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
        ? 'audio/webm;codecs=opus'
        : MediaRecorder.isTypeSupported('audio/webm')
        ? 'audio/webm'
        : 'audio/mp4';

      const recorder = new MediaRecorder(stream, { mimeType });
      mediaRecorderRef.current = recorder;
      chunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: mimeType });
        setAudioBlob(blob);
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        setState('stopped');
        streamRef.current?.getTracks().forEach(t => t.stop());
      };

      recorder.start(250);
      setState('recording');
      setElapsedSeconds(0);

      timerRef.current = setInterval(() => {
        setElapsedSeconds(prev => {
          if (prev >= config.maxAudioDurationSeconds - 1) {
            recorder.stop();
            stopTimer();
            return config.maxAudioDurationSeconds;
          }
          return prev + 1;
        });
      }, 1000);

    } catch (err) {
      const message = err instanceof Error && err.name === 'NotAllowedError'
        ? "We couldn't access your microphone. Please allow microphone access or choose the handwritten review option."
        : "Your device doesn't support audio recording. Please use the handwritten review option.";
      setError(message);
      setState('error');
    }
  }, [stopTimer]);

  const stopRecording = useCallback(() => {
    stopTimer();
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
  }, [stopTimer]);

  const resetRecording = useCallback(() => {
    stopTimer();
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    streamRef.current?.getTracks().forEach(t => t.stop());
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioBlob(null);
    setAudioUrl(null);
    setState('idle');
    setElapsedSeconds(0);
    setError(null);
    chunksRef.current = [];
  }, [stopTimer, audioUrl]);

  useEffect(() => {
    return () => {
      stopTimer();
      streamRef.current?.getTracks().forEach(t => t.stop());
    };
  }, [stopTimer]);

  return {
    state,
    audioBlob,
    audioUrl,
    elapsedSeconds,
    error,
    startRecording,
    stopRecording,
    resetRecording,
  };
}
