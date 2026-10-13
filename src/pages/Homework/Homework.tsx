import React, { useState, useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Paper,
  Checkbox,
  FormControlLabel,
  Chip,
  Collapse,
  Button,
  Divider,
  LinearProgress,
  Alert,
  Tooltip,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { grade4Curriculum } from '../../data/curriculum/grade4';
import { useChecklistState } from '../../hooks/useChecklistState';
import { CurriculumData, WeekCurriculum } from '../../types/curriculum';

// ── Curriculum registry – add more grades here later ─────────────────────────
const CURRICULA: Record<number, CurriculumData> = {
  4: grade4Curriculum,
};

const GRADE_LABELS: Record<number, string> = {
  4: 'நான்காம் வகுப்பு (Grade 4)',
};

// ── Small reusable components ─────────────────────────────────────────────────

interface CheckItemProps {
  id: string;
  label: string;
  checked: boolean;
  onToggle: (id: string) => void;
}

const CheckItem: React.FC<CheckItemProps> = ({ id, label, checked, onToggle }) => (
  <FormControlLabel
    control={
      <Checkbox
        checked={checked}
        onChange={() => onToggle(id)}
        sx={{
          color: 'primary.main',
          '&.Mui-checked': { color: 'primary.main' },
          p: 0.75,
        }}
      />
    }
    label={
      <Typography
        variant="body2"
        sx={{
          textDecoration: checked ? 'line-through' : 'none',
          color: checked ? 'text.disabled' : 'text.primary',
          lineHeight: 1.6,
          fontSize: { xs: '0.875rem', sm: '0.95rem' },
        }}
      >
        {label}
      </Typography>
    }
    sx={{ alignItems: 'flex-start', ml: 0, mb: 0.5, width: '100%' }}
  />
);

interface SectionHeaderProps {
  emoji: string;
  title: string;
  completed?: number;
  total?: number;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ emoji, title, completed, total }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
    <Typography sx={{ fontSize: '1.25rem' }}>{emoji}</Typography>
    <Typography variant="h6" fontWeight={700} color="primary.dark" sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}>
      {title}
    </Typography>
    {typeof completed === 'number' && typeof total === 'number' && total > 0 && (
      <Chip
        label={`${completed}/${total}`}
        size="small"
        color={completed === total ? 'success' : 'default'}
        sx={{ ml: 'auto', fontWeight: 700, fontSize: '0.75rem' }}
      />
    )}
  </Box>
);

// ── Main component ────────────────────────────────────────────────────────────

export const Homework: React.FC = () => {
  const [selectedGrade, setSelectedGrade] = useState<number>(4);
  const [selectedWeek, setSelectedWeek] = useState<number>(1);
  const [classworkOpen, setClassworkOpen] = useState(false);

  const curriculum = CURRICULA[selectedGrade];
  const weekData: WeekCurriculum | undefined = useMemo(
    () => curriculum?.weeks.find(w => w.week === selectedWeek),
    [curriculum, selectedWeek],
  );

  const { checkedItems, toggleItem, clearAll } = useChecklistState(selectedGrade, selectedWeek);

  // ── Derived counts for progress bars ───────────────────────────────────────
  const writingItems = weekData?.homework.filter(t =>
    t.text.includes('வேற்றுமை') || t.text.includes('வாக்கியம்')
  ) ?? [];
  const writingDone = writingItems.filter(t => checkedItems.has(t.id)).length;

  const readingCheckable = weekData?.reading.tasks ?? [];
  const readingDone = readingCheckable.filter(t => checkedItems.has(t.id)).length;

  const convCheckable = weekData?.conversation.tasks ?? [];
  const convDone = convCheckable.filter(t => checkedItems.has(t.id)).length;

  const allCheckable = [...writingItems, ...readingCheckable, ...convCheckable];
  const totalDone = allCheckable.filter(t => checkedItems.has(t.id)).length;
  const totalItems = allCheckable.length;
  const overallPct = totalItems > 0 ? Math.round((totalDone / totalItems) * 100) : 0;

  const handleWeekChange = (delta: number) => {
    const next = selectedWeek + delta;
    if (next >= 1 && next <= (curriculum?.totalWeeks ?? 32)) {
      setSelectedWeek(next);
      setClassworkOpen(false);
    }
  };

  if (!curriculum || !weekData) {
    return (
      <Container maxWidth="md" sx={{ py: 6, textAlign: 'center' }}>
        <Typography color="text.secondary">தரவு கிடைக்கவில்லை.</Typography>
      </Container>
    );
  }

  const pdfUrl = `/${curriculum.document}`;
  const firstPage = weekData.source.pages[0] ?? 1;

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#fafbff', pb: 8 }}>
      <Container maxWidth="md" sx={{ pt: { xs: 2, sm: 3 }, px: { xs: 1.5, sm: 3 } }}>

        {/* ── Page title ──────────────────────────────────────────────────── */}
        <Typography
          variant="h4"
          fontWeight={900}
          sx={{
            mb: 0.5,
            fontSize: { xs: '1.5rem', sm: '2rem' },
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          வீட்டுப்பாடம் தகவல் பலகை
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5 }}>
          Homework Dashboard
        </Typography>

        {/* ── Grade + Week selectors ───────────────────────────────────────── */}
        <Paper
          elevation={0}
          sx={{ p: { xs: 1.5, sm: 2 }, mb: 2.5, border: '1.5px solid', borderColor: 'primary.light', borderRadius: 3 }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: 1.5,
              alignItems: { xs: 'stretch', sm: 'center' },
            }}
          >
            {/* Grade select */}
            <FormControl size="small" sx={{ minWidth: 200 }}>
              <InputLabel>வகுப்பு (Grade)</InputLabel>
              <Select
                value={selectedGrade}
                label="வகுப்பு (Grade)"
                onChange={e => {
                  setSelectedGrade(Number(e.target.value));
                  setSelectedWeek(1);
                }}
              >
                {Object.entries(GRADE_LABELS).map(([g, label]) => (
                  <MenuItem key={g} value={Number(g)}>
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Week nav */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexGrow: 1, justifyContent: { sm: 'flex-end' } }}>
              <Tooltip title="முந்தைய வாரம்">
                <span>
                  <IconButton
                    size="small"
                    onClick={() => handleWeekChange(-1)}
                    disabled={selectedWeek <= 1}
                    sx={{ border: '1px solid', borderColor: 'primary.light' }}
                  >
                    <ArrowBackIosNewIcon fontSize="small" />
                  </IconButton>
                </span>
              </Tooltip>

              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>வாரம் (Week)</InputLabel>
                <Select
                  value={selectedWeek}
                  label="வாரம் (Week)"
                  onChange={e => setSelectedWeek(Number(e.target.value))}
                >
                  {Array.from({ length: curriculum.totalWeeks }, (_, i) => i + 1).map(w => (
                    <MenuItem key={w} value={w}>
                      வாரம் {w}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Tooltip title="அடுத்த வாரம்">
                <span>
                  <IconButton
                    size="small"
                    onClick={() => handleWeekChange(1)}
                    disabled={selectedWeek >= curriculum.totalWeeks}
                    sx={{ border: '1px solid', borderColor: 'primary.light' }}
                  >
                    <ArrowForwardIosIcon fontSize="small" />
                  </IconButton>
                </span>
              </Tooltip>
            </Box>
          </Box>

        </Paper>

        {/* ── Source reference ─────────────────────────────────────────────── */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Typography variant="caption" color="text.disabled">
            பக்கங்கள்: {weekData.source.pages.join(', ')} •
          </Typography>
          <Button
            component="a"
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            size="small"
            startIcon={<PictureAsPdfIcon sx={{ fontSize: 14 }} />}
            sx={{
              textTransform: 'none',
              fontSize: '0.75rem',
              color: 'primary.main',
              fontWeight: 600,
              p: 0,
              minWidth: 0,
              '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' },
            }}
          >
            PDF பார்க்க (Page {firstPage})
          </Button>
        </Box>

        {/* ── Notes / warnings ──────────────────────────────────────────────── */}
        {weekData.notes.map((note, i) => (
          <Alert key={i} severity="info" sx={{ mb: 1.5, borderRadius: 2, fontSize: '0.85rem' }}>
            {note}
          </Alert>
        ))}

        {/* ── Test banner ───────────────────────────────────────────────────── */}
        {weekData.tests.length > 0 && (
          <Paper
            elevation={0}
            sx={{
              mb: 2,
              p: 2,
              borderRadius: 3,
              border: '2px solid',
              borderColor: 'warning.main',
              bgcolor: 'warning.light',
            }}
          >
            <SectionHeader emoji="📝" title="இந்த வாரம் தேர்வு!" />
            {weekData.tests.map((test, i) => (
              <Box key={i}>
                <Typography fontWeight={700} variant="body2" color="warning.dark">
                  {test.title}
                </Typography>
                {test.description && (
                  <Typography variant="caption" color="text.secondary">
                    {test.description}
                  </Typography>
                )}
              </Box>
            ))}
          </Paper>
        )}

        {/* ── Project banner ────────────────────────────────────────────────── */}
        {(weekData.projectDue || weekData.projectAssigned || weekData.projectReminder) && (() => {
          const project = weekData.projectDue ?? weekData.projectAssigned ?? weekData.projectReminder!;
          const isDue = !!weekData.projectDue;
          const isNew = !!weekData.projectAssigned;
          const isReminder = !!weekData.projectReminder;

          const chipColor = isDue ? 'error' : isNew ? 'primary' : 'warning';
          const chipLabel = isDue ? 'இன்று சமர்ப்பிக்கவும்!' : isNew ? 'புதிய திட்டப்பணி' : 'நினைவூட்டல்';
          const borderColor = isDue ? 'error.main' : isNew ? 'primary.main' : 'warning.main';
          const bgColor = isDue ? '#fff5f5' : isNew ? '#f0f3ff' : '#fffbeb';

          return (
            <Paper
              elevation={0}
              sx={{ mb: 2, p: 2, borderRadius: 3, border: '2px solid', borderColor, bgcolor: bgColor }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                <Typography sx={{ fontSize: '1.25rem' }}>📋</Typography>
                <Typography variant="h6" fontWeight={700} sx={{ fontSize: { xs: '1rem', sm: '1.1rem' } }}>
                  திட்டப்பணி (Project {project.projectNumber})
                </Typography>
                <Chip label={chipLabel} color={chipColor} size="small" sx={{ ml: 'auto', fontWeight: 700 }} />
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                {isDue
                  ? `வாரம் ${project.assignedWeek} முதல் வாரம் ${project.dueWeek} வரை`
                  : isNew
                    ? `வாரம் ${project.dueWeek}-ல் சமர்ப்பிக்கவும்`
                    : `சமர்ப்பிக்க: வாரம் ${project.dueWeek}`}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 1.5 }}>
                {project.topics.map((topic, i) => (
                  <Chip key={i} label={topic} size="small" variant="outlined" color="primary" />
                ))}
              </Box>
              <Divider sx={{ mb: 1.5 }} />
              <Typography variant="caption" fontWeight={700} color="text.secondary" display="block" sx={{ mb: 0.75 }}>
                தேவைகள் (Requirements):
              </Typography>
              {project.requirements.map(req => (
                <Box key={req.id} sx={{ display: 'flex', alignItems: 'flex-start', gap: 0.5, mb: 0.5 }}>
                  <Typography sx={{ fontSize: '0.75rem', mt: 0.2 }}>•</Typography>
                  <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                    {req.text}
                    {req.textEnglish && (
                      <Typography component="span" variant="caption" color="text.disabled" sx={{ ml: 0.5 }}>
                        ({req.textEnglish})
                      </Typography>
                    )}
                  </Typography>
                </Box>
              ))}
              {isReminder && (
                <Box sx={{ mt: 1.5, display: 'flex', gap: 0.5, alignItems: 'center' }}>
                  <Chip
                    label={`Due in ${project.dueWeek - selectedWeek} week${project.dueWeek - selectedWeek !== 1 ? 's' : ''}`}
                    size="small"
                    color="warning"
                  />
                </Box>
              )}
            </Paper>
          );
        })()}

        {/* ── Homework parent section ───────────────────────────────────────── */}
        <Paper elevation={0} sx={{ mb: 2, borderRadius: 3, border: '1.5px solid', borderColor: 'primary.light', overflow: 'hidden' }}>

          {/* Parent header */}
          <Box sx={{ p: { xs: 2, sm: 2.5 }, pb: 1.5 }}>
            <SectionHeader emoji="📝" title="வீட்டுப்பாடம் (Homework)" completed={totalDone} total={totalItems} />
            {totalItems > 0 && (
              <LinearProgress
                variant="determinate"
                value={overallPct}
                sx={{
                  height: 6,
                  borderRadius: 3,
                  bgcolor: 'grey.100',
                  '& .MuiLinearProgress-bar': {
                    background: overallPct === 100
                      ? 'linear-gradient(90deg,#10b981,#059669)'
                      : 'linear-gradient(90deg,#667eea,#764ba2)',
                    borderRadius: 3,
                  },
                }}
              />
            )}
          </Box>

          {/* Sub-section 1: Reading Log */}
          {weekData.reading.required && readingCheckable.length > 0 && (
            <>
              <Divider />
              <Box sx={{ p: { xs: 2, sm: 2.5 } }}>
                <SectionHeader emoji="📖" title="வாசித்தல் பயிற்சி (Reading Log)" completed={readingDone} total={readingCheckable.length} />
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 1.5 }}>
                  <Chip
                    icon={<MenuBookIcon sx={{ fontSize: 14 }} />}
                    label={weekData.reading.duration}
                    size="small"
                    variant="outlined"
                    color="primary"
                  />
                  {weekData.reading.parentSignatureRequired && (
                    <Chip label="பெற்றோர் கையொப்பம் தேவை" size="small" color="warning" variant="outlined" />
                  )}
                </Box>
                {weekData.reading.passage && (
                  <Typography
                    variant="body2"
                    sx={{ mb: 1.5, p: 1.5, bgcolor: '#f0f3ff', borderRadius: 2, borderLeft: '4px solid', borderColor: 'primary.main', fontWeight: 500 }}
                  >
                    📄 {weekData.reading.passage}
                  </Typography>
                )}
                {weekData.reading.readingQuestions && weekData.reading.readingQuestions.length > 0 && (
                  <Box sx={{ mb: 1.5, p: 1.5, bgcolor: '#fef9ec', borderRadius: 2, border: '1px solid', borderColor: 'warning.light' }}>
                    <Typography variant="caption" fontWeight={700} color="warning.dark" display="block" sx={{ mb: 0.75 }}>
                      🤔 கேள்விகள் (Reading Questions):
                    </Typography>
                    {weekData.reading.readingQuestions.map((q, i) => (
                      <Typography key={i} variant="body2" sx={{ mb: 0.5, fontSize: '0.85rem' }}>
                        {i + 1}. {q}
                      </Typography>
                    ))}
                  </Box>
                )}
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
                  {readingCheckable.map(task => (
                    <CheckItem key={task.id} id={task.id} label={task.text} checked={checkedItems.has(task.id)} onToggle={toggleItem} />
                  ))}
                </Box>
              </Box>
            </>
          )}

          {/* Sub-section 2: Conversation Log */}
          {weekData.conversation.required && convCheckable.length > 0 && (
            <>
              <Divider />
              <Box sx={{ p: { xs: 2, sm: 2.5 } }}>
                <SectionHeader emoji="🗣️" title="உரையாடல் பயிற்சி (Conversation Log)" completed={convDone} total={convCheckable.length} />
                <Chip label={weekData.conversation.duration} size="small" variant="outlined" color="secondary" sx={{ mb: 1.5 }} />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
                  {convCheckable.map(task => (
                    <CheckItem key={task.id} id={task.id} label={task.text} checked={checkedItems.has(task.id)} onToggle={toggleItem} />
                  ))}
                </Box>
              </Box>
            </>
          )}

          {/* Sub-section 3: Writing */}
          {writingItems.length > 0 && (
            <>
              <Divider />
              <Box sx={{ p: { xs: 2, sm: 2.5 } }}>
                <SectionHeader emoji="✏️" title="எழுத்துப் பயிற்சி (Writing)" completed={writingDone} total={writingItems.length} />
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.25 }}>
                  {writingItems.map(task => (
                    <CheckItem key={task.id} id={task.id} label={task.text} checked={checkedItems.has(task.id)} onToggle={toggleItem} />
                  ))}
                </Box>
              </Box>
            </>
          )}
        </Paper>

        {/* ── Classwork (collapsible reference) ────────────────────────────── */}
        {weekData.classwork.length > 0 && (
          <Paper elevation={0} sx={{ mb: 2, borderRadius: 3, border: '1.5px solid', borderColor: 'grey.200', overflow: 'hidden' }}>
            <Box
              onClick={() => setClassworkOpen(o => !o)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: { xs: 2, sm: 2.5 },
                cursor: 'pointer',
                '&:hover': { bgcolor: 'grey.50' },
                transition: 'background 0.15s',
              }}
            >
              <Typography sx={{ fontSize: '1.25rem', mr: 1 }}>📚</Typography>
              <Typography variant="h6" fontWeight={700} color="text.secondary" sx={{ fontSize: { xs: '1rem', sm: '1.1rem' }, flexGrow: 1 }}>
                வகுப்புப் பாடம் (Classwork Reference)
              </Typography>
              <Chip label={`${weekData.classwork.length} தலைப்புகள்`} size="small" sx={{ mr: 1 }} />
              {classworkOpen ? <ExpandLessIcon color="action" /> : <ExpandMoreIcon color="action" />}
            </Box>
            <Collapse in={classworkOpen}>
              <Divider />
              <Box sx={{ p: { xs: 2, sm: 2.5 } }}>
                {weekData.classwork.map((item, i) => (
                  <Box key={item.id} sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1 }}>
                    <Typography
                      sx={{
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        color: 'primary.main',
                        bgcolor: '#f0f3ff',
                        borderRadius: 1,
                        px: 0.75,
                        py: 0.25,
                        minWidth: 24,
                        textAlign: 'center',
                        flexShrink: 0,
                        mt: 0.2,
                      }}
                    >
                      {i + 1}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: '0.875rem', lineHeight: 1.6 }}>
                      {item.text}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Collapse>
          </Paper>
        )}

        {/* ── Clear & PDF actions ───────────────────────────────────────────── */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 1.5,
            mt: 1,
          }}
        >
          <Button
            variant="outlined"
            color="error"
            startIcon={<DeleteSweepIcon />}
            onClick={clearAll}
            disabled={checkedItems.size === 0}
            sx={{ textTransform: 'none', fontWeight: 700, borderRadius: 3 }}
          >
            இந்த வாரம் அழிக்கவும் (Clear Week)
          </Button>

          <Button
            variant="outlined"
            color="primary"
            startIcon={<PictureAsPdfIcon />}
            component="a"
            href={pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ textTransform: 'none', fontWeight: 700, borderRadius: 3 }}
          >
            PDF கையேடு திறக்கவும்
          </Button>
        </Box>

        {/* ── Week navigation footer ────────────────────────────────────────── */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: 4,
            pt: 2,
            borderTop: '1px solid',
            borderColor: 'grey.200',
          }}
        >
          <Button
            onClick={() => handleWeekChange(-1)}
            disabled={selectedWeek <= 1}
            startIcon={<ArrowBackIosNewIcon />}
            sx={{ textTransform: 'none', fontWeight: 600 }}
          >
            வாரம் {selectedWeek - 1}
          </Button>
          <Typography variant="body2" color="text.disabled" sx={{ alignSelf: 'center' }}>
            வாரம் {selectedWeek} / {curriculum.totalWeeks}
          </Typography>
          <Button
            onClick={() => handleWeekChange(1)}
            disabled={selectedWeek >= curriculum.totalWeeks}
            endIcon={<ArrowForwardIosIcon />}
            sx={{ textTransform: 'none', fontWeight: 600 }}
          >
            வாரம் {selectedWeek + 1}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};
