import React, { useState } from 'react';
import {
  Container, Box, Typography, Alert, Button, Paper, List, ListItem, ListItemIcon, ListItemText
} from '@mui/material';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { Book } from '../../types/book';
import { ReviewFormState, ReviewType } from '../../types/review';
import { BookDetails } from '../../components/BookDetails/BookDetails';
import { StudentName } from '../../components/StudentName/StudentName';
import { GradeSelect } from '../../components/GradeSelect/GradeSelect';
import { SchoolSelect } from '../../components/SchoolSelect/SchoolSelect';
import { StarRating } from '../../components/StarRating/StarRating';
import { ReviewTypeSelector } from '../../components/ReviewTypeSelector/ReviewTypeSelector';
import { ImageReview } from '../../components/ImageReview/ImageReview';
import { VoiceReview } from '../../components/VoiceReview/VoiceReview';
import { VideoReview } from '../../components/VideoReview/VideoReview';
import { LoadingState } from '../../components/LoadingState/LoadingState';
import { validateReviewForm, hasErrors, isReviewFormComplete, ValidationErrors } from '../../utils/validation';
import { generateReviewId, submitReview } from '../../services/reviewApi';
import { SchoolLocation } from '../../types/review';
import { getFileExtension, buildFileName } from '../../utils/fileUtils';
import { useNavigate } from 'react-router-dom';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<ReviewFormState>({
    organization: 'MTS',
    schoolLocation: 'Troy',
    bookTitle: '',
    bookAuthor: '',
    studentName: '',
    grade: '',
    section: '',
    rating: null,
    reviewType: null,
    reviewFile: null,
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const formComplete = isReviewFormComplete(form);

  const checklist = [
    { label: 'Select your school',          done: !!form.schoolLocation },
    { label: 'Enter the book title and author', done: !!form.bookTitle.trim() && !!form.bookAuthor.trim() },
    { label: 'Enter your name',              done: form.studentName.trim().length >= 2 },
    { label: 'Select your grade and section', done: !!form.grade.trim() && !!form.section },
    { label: 'Give a star rating',           done: !!form.rating },
    { label: 'Choose a review method',       done: !!form.reviewType },
    { label: form.reviewType === 'audio' ? 'Record your review'
        : form.reviewType === 'video' ? 'Record your video review'
        : 'Upload your review photo',
      done: !!form.reviewFile },
  ];

  const setSchoolLocation = (schoolLocation: SchoolLocation) => setForm(f => ({ ...f, schoolLocation }));
  const setBookTitle = (bookTitle: string) => setForm(f => ({ ...f, bookTitle }));
  const setBookAuthor = (bookAuthor: string) => setForm(f => ({ ...f, bookAuthor }));
  const setStudentName = (studentName: string) => setForm(f => ({ ...f, studentName }));
  const setGrade = (grade: string) => setForm(f => ({ ...f, grade }));
  const setSection = (section: string) => setForm(f => ({ ...f, section }));
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
      // Recorded blobs carry their real type (e.g. audio/mp4 on Safari)
      const mimeType = file.type || (form.reviewType === 'video' ? 'video/webm' : 'audio/webm');
      const ext = getFileExtension(mimeType);
      const book: Book = {
        id: `manual-${Date.now()}`,
        title: form.bookTitle.trim(),
        authors: [form.bookAuthor.trim()],
      };
      const fileName = buildFileName(reviewId, book.title, ext);

      const submission = {
        reviewId,
        organization: form.organization,
        schoolLocation: form.schoolLocation,
        studentName: form.studentName.trim(),
        grade: (() => {
          // Convert "4th Grade" → "4", "Kindergarten" → "K", then append section
          const match = form.grade.match(/^(\d+)/);
          const gradeCode = match ? match[1] : (form.grade.toLowerCase().startsWith('k') ? 'K' : form.grade);
          return form.section ? `${gradeCode}${form.section}` : gradeCode;
        })(),
        book,
        rating: form.rating!,
        reviewType: form.reviewType!,
        fileName,
        mimeType,
        fileData: file,
        submittedAt: new Date().toISOString(),
      };

      const result = await submitReview(submission);

      if (result.success) {
        navigate('/success', {
          state: {
            book,
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
          {/* Step 1 — School */}
          <Box sx={{ p: { xs: 2.5, sm: 3.5 }, borderBottom: '1px solid', borderColor: 'grey.100' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Box sx={stepBox(1, '#667eea')}>1</Box>
              <Typography variant="h6" fontWeight={700}>Select Your School</Typography>
            </Box>
            <SchoolSelect
              location={form.schoolLocation}
              onChange={setSchoolLocation}
            />
            {errors.schoolLocation && (
              <Typography variant="body2" color="error" sx={{ mt: 1 }}>{errors.schoolLocation}</Typography>
            )}
          </Box>

          {/* Step 2 — Book */}
          <Box sx={{ p: { xs: 2.5, sm: 3.5 }, borderBottom: '1px solid', borderColor: 'grey.100' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Box sx={stepBox(2, '#764ba2')}>2</Box>
              <Typography variant="h6" fontWeight={700}>Your Book</Typography>
            </Box>
            <BookDetails
              title={form.bookTitle}
              author={form.bookAuthor}
              onTitleChange={setBookTitle}
              onAuthorChange={setBookAuthor}
              titleError={errors.bookTitle}
              authorError={errors.bookAuthor}
            />
          </Box>

          {/* Step 3 — About You */}
          <Box sx={{ p: { xs: 2.5, sm: 3.5 }, borderBottom: '1px solid', borderColor: 'grey.100' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Box sx={stepBox(3, '#10b981')}>3</Box>
              <Typography variant="h6" fontWeight={700}>About You</Typography>
            </Box>
            <StudentName value={form.studentName} onChange={setStudentName} error={errors.studentName} />
            <Box sx={{ mt: 3 }}>
              <GradeSelect value={form.grade} onChange={setGrade} section={form.section} onSectionChange={setSection} error={errors.grade} />
            </Box>
          </Box>

          {/* Step 4 — Rating */}
          <Box sx={{ p: { xs: 2.5, sm: 3.5 }, borderBottom: '1px solid', borderColor: 'grey.100' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Box sx={stepBox(4, '#f59e0b')}>4</Box>
              <Typography variant="h6" fontWeight={700}>Star Rating</Typography>
            </Box>
            <StarRating value={form.rating} onChange={setRating} error={errors.rating} />
          </Box>

          {/* Step 5 — Review method */}
          <Box sx={{ p: { xs: 2.5, sm: 3.5 }, borderBottom: '1px solid', borderColor: 'grey.100' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Box sx={stepBox(5, '#e91e8c')}>5</Box>
              <Typography variant="h6" fontWeight={700}>Share Your Review</Typography>
            </Box>
            <ReviewTypeSelector
              selected={form.reviewType}
              onSelect={setReviewType}
              onClear={clearReviewType}
              error={errors.reviewType}
            />
          </Box>

          {/* Step 6 — Capture */}
          {form.reviewType && (
            <Box sx={{ p: { xs: 2.5, sm: 3.5 }, borderBottom: '1px solid', borderColor: 'grey.100' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <Box sx={stepBox(6, { image: '#2196f3', audio: '#e91e8c', video: '#ff7a00' }[form.reviewType])}>6</Box>
                <Typography variant="h6" fontWeight={700}>
                  {{ image: 'Your Photo Review', audio: 'Your Voice Review', video: 'Your Video Review' }[form.reviewType]}
                </Typography>
              </Box>

              {form.reviewType === 'image' ? (
                <ImageReview
                  onFileSelected={(file) => setReviewFile(file)}
                  selectedFile={form.reviewFile instanceof File ? form.reviewFile : null}
                />
              ) : form.reviewType === 'video' ? (
                <VideoReview onVideoReady={(blob) => setReviewFile(blob)} />
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
            {/* Checklist — only shown while form is incomplete */}
            {!formComplete && !submitting && (
              <Box sx={{ mb: 2.5, bgcolor: '#f8f6ff', borderRadius: 3, px: 2, py: 1.5, border: '1px solid', borderColor: 'grey.200' }}>
                <Typography variant="caption" fontWeight={700} color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}>
                  Still needed:
                </Typography>
                <List dense disablePadding>
                  {checklist.filter(item => !item.done).map(item => (
                    <ListItem key={item.label} disableGutters sx={{ py: 0.25 }}>
                      <ListItemIcon sx={{ minWidth: 28 }}>
                        <RadioButtonUncheckedIcon sx={{ fontSize: 16, color: 'text.disabled' }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="body2" color="text.secondary">{item.label}</Typography>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            )}

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
