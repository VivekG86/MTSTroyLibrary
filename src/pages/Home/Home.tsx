import React, { useState } from 'react';
import {
  Container, Box, Typography, Alert, Button, Paper
} from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { Book } from '../../types/book';
import { ReviewFormState, ReviewType } from '../../types/review';
import { BookSearch } from '../../components/BookSearch/BookSearch';
import { BookCard } from '../../components/BookCard/BookCard';
import { StudentName } from '../../components/StudentName/StudentName';
import { GradeSelect } from '../../components/GradeSelect/GradeSelect';
import { StarRating } from '../../components/StarRating/StarRating';
import { ReviewTypeSelector } from '../../components/ReviewTypeSelector/ReviewTypeSelector';
import { ImageReview } from '../../components/ImageReview/ImageReview';
import { VoiceReview } from '../../components/VoiceReview/VoiceReview';
import { LoadingState } from '../../components/LoadingState/LoadingState';
import { validateReviewForm, hasErrors, isReviewFormComplete, ValidationErrors } from '../../utils/validation';
import { fileToBase64, generateReviewId, submitReview } from '../../services/reviewApi';
import { getFileExtension, buildFileName } from '../../utils/fileUtils';
import { useNavigate } from 'react-router-dom';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<ReviewFormState>({
    book: null,
    studentName: '',
    grade: '',
    rating: null,
    reviewType: null,
    reviewFile: null,
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const formComplete = isReviewFormComplete(form);

  const setBook = (book: Book | null) => setForm(f => ({ ...f, book }));
  const setStudentName = (studentName: string) => setForm(f => ({ ...f, studentName }));
  const setGrade = (grade: string) => setForm(f => ({ ...f, grade }));
  const setRating = (rating: number) => setForm(f => ({ ...f, rating }));
  const setReviewType = (reviewType: ReviewType) =>
    setForm(f => ({ ...f, reviewType, reviewFile: null }));
  const clearReviewType = () => setForm(f => ({ ...f, reviewType: null, reviewFile: null }));
  const setReviewFile = (reviewFile: File | Blob | null) =>
    setForm(f => ({ ...f, reviewFile }));

  const handleSubmit = async () => {
    const validationErrors = validateReviewForm(form);
    setErrors(validationErrors);
    if (hasErrors(validationErrors)) return;

    setSubmitting(true);
    setSubmitError(null);

    try {
      const reviewId = generateReviewId();
      const file = form.reviewFile!;
      const mimeType = file instanceof File ? file.type : 'audio/webm';
      const ext = getFileExtension(mimeType);
      const fileName = buildFileName(reviewId, form.book!.title, ext);
      const fileData = await fileToBase64(file);

      const submission = {
        reviewId,
        studentName: form.studentName.trim(),
        grade: form.grade,
        book: {
          id: form.book!.id,
          title: form.book!.title,
          authors: form.book!.authors,
          isbn10: form.book!.isbn10,
          isbn13: form.book!.isbn13,
          thumbnail: form.book!.thumbnail,
        },
        rating: form.rating!,
        reviewType: form.reviewType!,
        fileName,
        mimeType,
        fileData,
        submittedAt: new Date().toISOString(),
      };

      const result = await submitReview(submission);

      if (result.success) {
        navigate('/success', {
          state: {
            book: form.book,
            rating: form.rating,
            reviewId: result.reviewId || reviewId,
            studentName: form.studentName.trim(),
          }
        });
      } else {
        setSubmitError(result.message || "Oops! Your review wasn't uploaded. Please try again.");
      }
    } catch {
      const message = !navigator.onLine
        ? "It looks like you're offline. Please check your internet connection and try again."
        : "Oops! Your review wasn't uploaded. Please try again.";
      setSubmitError(message);
    } finally {
      setSubmitting(false);
    }
  };

  const stepBox = (_num: number, color: string) => ({
    bgcolor: color,
    color: 'white',
    borderRadius: '50%',
    width: 28,
    height: 28,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 800,
    fontSize: '0.875rem',
    flexShrink: 0,
  });

  return (
    <Box sx={{ bgcolor: '#fafbff', minHeight: '100vh', pb: 8 }}>
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          py: { xs: 7, sm: 6 },
          px: 2,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="h3" fontWeight={900} color="white" sx={{ mb: { xs: 1.5, sm: 1 }, fontSize: { xs: '2.25rem', sm: '2.5rem' } }}>
            📚 Share Your Book Review!
          </Typography>
          <Typography variant="h6" color="rgba(255,255,255,0.85)" fontWeight={400} sx={{ fontSize: { xs: '1.15rem', sm: '1.25rem' } }}>
            Read a book? Tell us what you think!
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="sm" sx={{ mt: { xs: -1, sm: -2 }, px: { xs: 2, sm: 3 } }}>
        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            border: '1px solid',
            borderColor: 'grey.100',
            overflow: 'hidden',
            boxShadow: '0 4px 40px rgba(0,0,0,0.08)',
          }}
        >
          {/* Step 1 */}
          <Box sx={{ p: { xs: 2.5, sm: 3.5 }, borderBottom: '1px solid', borderColor: 'grey.100' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Box sx={stepBox(1, '#667eea')}>1</Box>
              <Typography variant="h6" fontWeight={700}>Find Your Book</Typography>
            </Box>
            {form.book ? (
              <BookCard book={form.book} onChangeBook={() => setBook(null)} />
            ) : (
              <BookSearch onSelectBook={setBook} />
            )}
            {errors.book && !form.book && (
              <Typography variant="body2" color="error" sx={{ mt: 1 }}>{errors.book}</Typography>
            )}
          </Box>

          {/* Step 2 */}
          <Box sx={{ p: { xs: 2.5, sm: 3.5 }, borderBottom: '1px solid', borderColor: 'grey.100' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Box sx={stepBox(2, '#764ba2')}>2</Box>
              <Typography variant="h6" fontWeight={700}>About You</Typography>
            </Box>
            <StudentName value={form.studentName} onChange={setStudentName} error={errors.studentName} />
            <Box sx={{ mt: 3 }}>
              <GradeSelect value={form.grade} onChange={setGrade} error={errors.grade} />
            </Box>
          </Box>

          {/* Step 3 */}
          <Box sx={{ p: { xs: 2.5, sm: 3.5 }, borderBottom: '1px solid', borderColor: 'grey.100' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Box sx={stepBox(3, '#f59e0b')}>3</Box>
              <Typography variant="h6" fontWeight={700}>Star Rating</Typography>
            </Box>
            <StarRating value={form.rating} onChange={setRating} error={errors.rating} />
          </Box>

          {/* Step 4 */}
          <Box sx={{ p: { xs: 2.5, sm: 3.5 }, borderBottom: '1px solid', borderColor: 'grey.100' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Box sx={stepBox(4, '#10b981')}>4</Box>
              <Typography variant="h6" fontWeight={700}>Share Your Review</Typography>
            </Box>
            <ReviewTypeSelector
              selected={form.reviewType}
              onSelect={setReviewType}
              onClear={clearReviewType}
              error={errors.reviewType}
            />
          </Box>

          {/* Step 5 */}
          {form.reviewType && (
            <Box sx={{ p: { xs: 2.5, sm: 3.5 }, borderBottom: '1px solid', borderColor: 'grey.100' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <Box sx={stepBox(5, form.reviewType === 'image' ? '#2196f3' : '#e91e8c')}>5</Box>
                <Typography variant="h6" fontWeight={700}>
                  {form.reviewType === 'image' ? 'Your Photo Review' : 'Your Voice Review'}
                </Typography>
              </Box>

              {form.reviewType === 'image' ? (
                <ImageReview
                  onFileSelected={(file) => setReviewFile(file)}
                  selectedFile={form.reviewFile instanceof File ? form.reviewFile : null}
                />
              ) : (
                <VoiceReview
                  onAudioReady={(blob) => setReviewFile(blob)}
                  audioBlob={form.reviewFile instanceof Blob ? form.reviewFile : null}
                />
              )}

              {errors.reviewFile && (
                <Typography variant="body2" color="error" sx={{ mt: 1 }}>{errors.reviewFile}</Typography>
              )}
            </Box>
          )}

          {/* Submit */}
          <Box sx={{ p: { xs: 2.5, sm: 3.5 } }}>
            {submitError && (
              <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{submitError}</Alert>
            )}
            {submitting ? (
              <LoadingState message="Saving your book review..." />
            ) : (
              <Button
                fullWidth
                variant="contained"
                size="large"
                startIcon={<RocketLaunchIcon />}
                onClick={handleSubmit}
                disabled={submitting || !formComplete}
                sx={{
                  borderRadius: 4,
                  py: 2,
                  fontSize: '1.15rem',
                  fontWeight: 800,
                  textTransform: 'none',
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  boxShadow: '0 4px 20px rgba(102, 126, 234, 0.5)',
                  '&:hover': { boxShadow: '0 6px 30px rgba(102, 126, 234, 0.7)' },
                  '&.Mui-disabled': {
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    opacity: 0.45,
                    color: 'white',
                    boxShadow: 'none',
                  },
                }}
              >
                🚀 Submit My Review
              </Button>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};
