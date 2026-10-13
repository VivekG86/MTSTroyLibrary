import { CurriculumData, Project, WeekCurriculum } from '../../types/curriculum';

const DOC = 'Grade4_Student_Handbook.pdf';
const GRADE = 4;

// ── Standard conversation tasks (used every week) ────────────────────────────
const stdConversationTasks = (week: number) => [
  {
    id: `hw_${week}_conversation_0`,
    text: 'பெற்றோர் / உறவினர் / நண்பருடன் தமிழில் பேசவும்',
    textEnglish: 'Speak in Tamil with parent / relative / friend',
    sourcePage: 0,
  },
  {
    id: `hw_${week}_conversation_1`,
    text: 'குரல் வடிவில் பதிவு செய்து ஆசிரியருக்கு அனுப்பவும்',
    textEnglish: 'Record audio and send to teacher',
    sourcePage: 0,
  },
  {
    id: `hw_${week}_conversation_2`,
    text: 'உரையாடல் பதிவேட்டில் பெற்றோர் கையொப்பம் இடவும்',
    textEnglish: 'Parent signature in conversation log',
    sourcePage: 0,
  },
];

// ── Standard reading tasks (used every week) ──────────────────────────────────
const stdReadingTasks = (week: number) => [
  {
    id: `hw_${week}_reading_0`,
    text: 'கொடுக்கப்பட்ட பகுதியை வாசிக்கவும்',
    textEnglish: 'Read the assigned passage',
    sourcePage: 0,
  },
  {
    id: `hw_${week}_reading_1`,
    text: 'மூன்று வாக்கியங்களை ஆங்கிலத்தில் மொழி பெயர்த்து எழுதவும்',
    textEnglish: 'Translate 3 sentences into English',
    sourcePage: 0,
  },
  {
    id: `hw_${week}_reading_2`,
    text: 'பெற்றோர் கையொப்பம் இடவும்',
    textEnglish: 'Parent signature required',
    sourcePage: 0,
  },
];

// ── Projects ──────────────────────────────────────────────────────────────────
const project1: Project = {
  id: 'project_1',
  projectNumber: 1,
  title: 'திட்டப்பணி 1',
  topics: [
    'நீ சென்று வந்த மறக்க முடியாத இடம்',
    'உனக்குக் கிடைத்த அன்பளிப்பு',
  ],
  requirements: [
    { id: 'proj1_req_0', text: 'குறைந்தது 10 வாக்கியங்கள் எழுதவும்', textEnglish: 'Write minimum 10 sentences', sourcePage: 39 },
    { id: 'proj1_req_1', text: '3 படங்கள் இணைக்கவும்', textEnglish: 'Include 3 pictures', sourcePage: 39 },
    { id: 'proj1_req_2', text: 'தலைப்பு எழுதவும்', textEnglish: 'Write a title', sourcePage: 39 },
    { id: 'proj1_req_3', text: 'வகுப்பில் வாய்மொழியாக விளக்கம் செய்யவும்', textEnglish: 'Oral presentation in class', sourcePage: 39 },
  ],
  assignedWeek: 1,
  dueWeek: 4,
  sourcePage: 39,
};

const project2: Project = {
  id: 'project_2',
  projectNumber: 2,
  title: 'திட்டப்பணி 2',
  topics: [
    'நீ சமைத்த உணவு',
    'உனக்கு பிடித்த தோழன் / தோழி',
  ],
  requirements: [
    { id: 'proj2_req_0', text: 'குறைந்தது 15 வாக்கியங்கள் எழுதவும்', textEnglish: 'Write minimum 15 sentences', sourcePage: 75 },
    { id: 'proj2_req_1', text: '3 படங்கள் இணைக்கவும்', textEnglish: 'Include 3 pictures', sourcePage: 75 },
    { id: 'proj2_req_2', text: 'தலைப்பு எழுதவும்', textEnglish: 'Write a title', sourcePage: 75 },
    { id: 'proj2_req_3', text: 'வகுப்பில் வாய்மொழியாக விளக்கம் செய்யவும்', textEnglish: 'Oral presentation in class', sourcePage: 75 },
  ],
  assignedWeek: 12,
  dueWeek: 16,
  sourcePage: 75,
};

// ── Weeks ─────────────────────────────────────────────────────────────────────

const weeks: WeekCurriculum[] = [
  // ── Week 1 ──────────────────────────────────────────────────────────────────
  {
    grade: GRADE,
    week: 1,
    source: { document: DOC, pages: [37, 38, 39, 40, 41] },
    classwork: [
      { id: 'cw_1_0', text: 'பேசுவோம்: குடும்பம் (1.1)', sourcePage: 37 },
      { id: 'cw_1_1', text: '1.2 வாசிப்போம்: பிறந்தநாள்', sourcePage: 37 },
      { id: 'cw_1_2', text: 'பெயர்ச்சொல் - Noun (names of persons/things)', sourcePage: 38 },
      { id: 'cw_1_3', text: "வேற்றுமை உருபு - 2ஆம் வேற்றுமை உருபு 'ஐ'", sourcePage: 38 },
    ],
    homework: [
      { id: 'hw_1_homework_0', text: '1.2.1 விடை காண்போம்', sourcePage: 38 },
      { id: 'hw_1_homework_1', text: "வேற்றுமை உருபுப் பயிற்சி: 2ஆம் வேற்றுமை உருபு 'ஐ' இணைத்து எழுதவும் (சொற்கள்: ஆசிரியர், வேடன்)", sourcePage: 38 },
      { id: 'hw_1_homework_2', text: 'வாக்கியம் அமை: பிறந்தநாள், அணிந்தான், மகிழ்ச்சி, வெற்றி', sourcePage: 39 },
    ],
    reading: {
      required: true,
      duration: '15-20 நிமிடங்கள்',
      passage: 'பயிற்சி 1.2 ஐ வாசிக்கவும்',
      tasks: [
        ...stdReadingTasks(1),
        { id: 'hw_1_reading_3', text: 'விருப்பமான கதை அல்லது கட்டுரை படிக்கலாம்', sourcePage: 38 },
      ],
      parentSignatureRequired: true,
      sourcePage: 38,
    },
    conversation: {
      required: true,
      duration: '2-4 நிமிடங்கள்',
      tasks: stdConversationTasks(1),
      sourcePage: 38,
    },
    projectAssigned: project1,
    tests: [],
    notes: ['திட்டப்பணி 1 இந்த வாரம் கொடுக்கப்படுகிறது. வாரம் 4-ல் சமர்ப்பிக்கவும்.'],
  },

  // ── Week 2 ──────────────────────────────────────────────────────────────────
  {
    grade: GRADE,
    week: 2,
    source: { document: DOC, pages: [42, 43, 44, 45, 46] },
    classwork: [
      { id: 'cw_2_0', text: '1.3 சொல்லிப் பழகுவோம் / கலந்துரையாடுவோம்', sourcePage: 42 },
      { id: 'cw_2_1', text: '1.4 சொல்லிப் பழகுவோம்', sourcePage: 42 },
      { id: 'cw_2_2', text: 'ஆண்பால் – பெண்பால்', sourcePage: 43 },
      { id: 'cw_2_3', text: 'குறில் - நெடில்', sourcePage: 43 },
      { id: 'cw_2_4', text: '1.5 குறிலை நெடிலாகவும் நெடிலை குறிலாகவும் மாற்றிச் சொல் உருவாக்கு', sourcePage: 44 },
      { id: 'cw_2_5', text: '1.8 அறிந்துகொள்வோம்', sourcePage: 45 },
    ],
    homework: [
      { id: 'hw_2_homework_0', text: '1.6 தெரிந்துகொள்வோம்: குறில் எழுத்தை நெடில் எழுத்தாக மாற்றி எழுதுக', sourcePage: 44 },
      { id: 'hw_2_homework_1', text: '1.7 உரிய சொல்லைக் கோட்டில் எழுதுக', sourcePage: 44 },
      { id: 'hw_2_homework_2', text: 'வேற்றுமை உருபுப் பயிற்சி: 2ஆம், 3ஆம் வேற்றுமை உருபுகள் (ஐ, ஆல், ஓடு, உடன்) இணைத்து எழுதவும் (சொற்கள்: நண்பன், ஊர்)', sourcePage: 45 },
      { id: 'hw_2_homework_3', text: 'வாக்கியம் அமை: புதுச்சட்டை, நேற்று, தேநீர்', sourcePage: 46 },
    ],
    reading: {
      required: true,
      duration: '15-20 நிமிடங்கள்',
      passage: 'பயிற்சி 1.3 ஐ வாசிக்கவும்',
      tasks: stdReadingTasks(2),
      parentSignatureRequired: true,
      sourcePage: 44,
    },
    conversation: {
      required: true,
      duration: '2-4 நிமிடங்கள்',
      tasks: stdConversationTasks(2),
      sourcePage: 44,
    },
    tests: [],
    notes: [],
  },

  // ── Week 3 ──────────────────────────────────────────────────────────────────
  {
    grade: GRADE,
    week: 3,
    source: { document: DOC, pages: [47, 48, 49] },
    classwork: [
      { id: 'cw_3_0', text: '1.9 ஒருமை - பன்மை நிரப்புக', sourcePage: 47 },
      { id: 'cw_3_1', text: 'எதிர்ச்சொற்கள் - Antonyms', sourcePage: 47 },
      { id: 'cw_3_2', text: '1.11 பொருத்தமான சொல்லைத் தேர்ந்தெடுத்து எழுதுக', sourcePage: 48 },
      { id: 'cw_3_3', text: '1.13 கேட்டல் கருத்தறிதல்', sourcePage: 48 },
      { id: 'cw_3_4', text: '1.14 பொருத்தமாக இணைக்க: எதிர்ச்சொற்கள்', sourcePage: 49 },
      { id: 'cw_3_5', text: '4ஆம் வேற்றுமை உருபு: கு', sourcePage: 49 },
    ],
    homework: [
      { id: 'hw_3_homework_0', text: 'தேர்வு #1: திட்டப்பணி 1 க்கு தயார் செய்யவும் (Due Week 4)', sourcePage: 48 },
    ],
    reading: {
      required: true,
      duration: '15-20 நிமிடங்கள்',
      passage: 'விருப்பமான கதை அல்லது கட்டுரை படிக்கவும்',
      tasks: stdReadingTasks(3),
      parentSignatureRequired: true,
      sourcePage: 48,
    },
    conversation: {
      required: true,
      duration: '2-4 நிமிடங்கள்',
      tasks: stdConversationTasks(3),
      sourcePage: 48,
    },
    projectReminder: project1,
    tests: [],
    notes: ['திட்டப்பணி 1 அடுத்த வாரம் (வாரம் 4) சமர்ப்பிக்கவும்.'],
  },

  // ── Week 4 ──────────────────────────────────────────────────────────────────
  {
    grade: GRADE,
    week: 4,
    source: { document: DOC, pages: [50, 51, 52] },
    classwork: [
      { id: 'cw_4_0', text: 'தேர்வு #1: திட்டப்பணி 1 (வகுப்பில் வாய்மொழியாக விளக்கம்)', sourcePage: 50 },
      { id: 'cw_4_1', text: 'கலந்துரையாடுவோம்: கடற்கரை / குடும்ப உரையாடல்', sourcePage: 51 },
    ],
    homework: [
      { id: 'hw_4_homework_0', text: '1.10 பொருத்தமான சொல்லைக் கோட்டில் எழுதுக: ஒருமை – பன்மை', sourcePage: 50 },
      { id: 'hw_4_homework_1', text: '1.12 உரிய எதிர்ச் சொல்லை எழுதுக', sourcePage: 51 },
      { id: 'hw_4_homework_2', text: 'வேற்றுமை உருபுப் பயிற்சி: (ஐ, ஆல், ஓடு, உடன், கு) இணைத்து எழுதவும் (சொற்கள்: தேநீர், தேன்)', sourcePage: 51 },
      { id: 'hw_4_homework_3', text: 'வாக்கியம் அமை: தொலைக்காட்சி, புத்தகம்', sourcePage: 52 },
    ],
    reading: {
      required: true,
      duration: '15-20 நிமிடங்கள்',
      passage: 'விருப்பமான கதை புத்தகம் வாசிக்கவும்',
      tasks: stdReadingTasks(4),
      parentSignatureRequired: true,
      sourcePage: 50,
    },
    conversation: {
      required: true,
      duration: '2-4 நிமிடங்கள்',
      tasks: stdConversationTasks(4),
      sourcePage: 50,
    },
    projectDue: project1,
    tests: [
      { title: 'தேர்வு 1 – திட்டப்பணி 1 வாய்மொழி விளக்கம்', sourcePage: 50 },
    ],
    notes: ['திட்டப்பணி 1 இன்று சமர்ப்பிக்கவும்!'],
  },

  // ── Week 5 ──────────────────────────────────────────────────────────────────
  {
    grade: GRADE,
    week: 5,
    source: { document: DOC, pages: [53, 54, 55, 56] },
    classwork: [
      { id: 'cw_5_0', text: '2.1 பேசுவோம்: பூங்கா', sourcePage: 53 },
      { id: 'cw_5_1', text: '2.2 வாசிப்போம்: நல்ல பொழுதுபோக்கு', sourcePage: 53 },
      { id: 'cw_5_2', text: '2.8 ஒருமை – பன்மை', sourcePage: 54 },
      { id: 'cw_5_3', text: '2.14 காலங்கள்: நிகழ்காலம் (இடைநிலைகள்: கிறு, கின்று)', sourcePage: 55 },
      { id: 'cw_5_4', text: '5ஆம் வேற்றுமை உருபு: இன் (possessive)', sourcePage: 56 },
    ],
    homework: [
      { id: 'hw_5_homework_0', text: '2.2.1 விடையளிக்க', sourcePage: 54 },
      { id: 'hw_5_homework_1', text: '2.9 கோடிட்ட பன்மைச் சொற்களை ஒருமைச் சொற்களாக மாற்றி எழுது', sourcePage: 54 },
      { id: 'hw_5_homework_2', text: 'வேற்றுமை உருபுப் பயிற்சி: (கு, இல், இன், இலிருந்து, இருந்து) இணைத்து எழுதவும் (சொற்கள்: முயல், பழம்)', sourcePage: 55 },
      { id: 'hw_5_homework_3', text: 'வாக்கியம் அமை: நண்பர்கள், அருகில், இன்பமாக, கால்பந்து, திடல்', sourcePage: 56 },
    ],
    reading: {
      required: true,
      duration: '15-20 நிமிடங்கள்',
      passage: 'பயிற்சி 2.2 மற்றும் விருப்பமான கதை அல்லது கட்டுரை',
      readingQuestions: [
        'கண்ணனுக்கு எந்த விளையாட்டு விளையாடப் பிடிக்கும்?',
        'கண்ணன் தன் நண்பர்களுடன் எங்குச் செல்வான்?',
      ],
      tasks: stdReadingTasks(5),
      parentSignatureRequired: true,
      sourcePage: 54,
    },
    conversation: {
      required: true,
      duration: '2-4 நிமிடங்கள்',
      tasks: stdConversationTasks(5),
      sourcePage: 54,
    },
    tests: [],
    notes: [],
  },

  // ── Week 6 ──────────────────────────────────────────────────────────────────
  {
    grade: GRADE,
    week: 6,
    source: { document: DOC, pages: [57, 58, 59] },
    classwork: [
      { id: 'cw_6_0', text: '2.3 கலந்துரையாடுவோம்', sourcePage: 57 },
      { id: 'cw_6_1', text: '2.10 குறில் எழுத்தை நெடிலாகவும், நெடில் எழுத்தை குறிலாகவும் மாற்றி எழுதுக', sourcePage: 57 },
      { id: 'cw_6_2', text: '2.15 உரிய சொற்களைத் தேர்ந்தெடுத்து எழுதுக: நிகழ்காலம்', sourcePage: 58 },
      { id: 'cw_6_3', text: 'திருக்குறள்: கற்க கசடறக் கற்பவை கற்றபின் நிற்க அதற்குத் தக', sourcePage: 58 },
      { id: 'cw_6_4', text: '6ஆம் வேற்றுமை உருபு: அது/உடைய', sourcePage: 59 },
    ],
    homework: [
      { id: 'hw_6_homework_0', text: '2.5 படத்துடன் சொல்லை இணைக்க', sourcePage: 58 },
      { id: 'hw_6_homework_1', text: '2.11 குறில் - நெடில்', sourcePage: 58 },
      { id: 'hw_6_homework_2', text: '2.16 உரிய சொல்லைக் கொண்டு நிரப்புக: நிகழ்காலம்', sourcePage: 58 },
      { id: 'hw_6_homework_3', text: 'வேற்றுமை உருபுப் பயிற்சி: (இல், இலிருந்து, இன், இருந்து, அது, உடைய) இணைத்து எழுதவும் (சொற்கள்: பயிர், மான்)', sourcePage: 59 },
      { id: 'hw_6_homework_4', text: 'வாக்கியம் அமை: நடனம், உடற்பயிற்சி, நடக்கிறார்', sourcePage: 59 },
    ],
    reading: {
      required: true,
      duration: '15-20 நிமிடங்கள்',
      passage: 'பயிற்சி 2.4 வாசிக்கவும்',
      tasks: stdReadingTasks(6),
      parentSignatureRequired: true,
      sourcePage: 58,
    },
    conversation: {
      required: true,
      duration: '2-4 நிமிடங்கள்',
      tasks: stdConversationTasks(6),
      sourcePage: 58,
    },
    tests: [],
    notes: [],
  },

  // ── Week 7 ──────────────────────────────────────────────────────────────────
  {
    grade: GRADE,
    week: 7,
    source: { document: DOC, pages: [60, 61] },
    classwork: [
      { id: 'cw_7_0', text: '2.6 கோடிட்ட இடத்தில் கீழேக் கொடுக்கப்பட்டுள்ள சொற்களைக் கொண்டு நிரப்புக', sourcePage: 60 },
      { id: 'cw_7_1', text: '2.7 கீழ்க்காணும் பகுதியைக் கவனமாகப் படிக்க', sourcePage: 60 },
      { id: 'cw_7_2', text: '2.12 ஆண்பால் – பெண்பால்', sourcePage: 61 },
      { id: 'cw_7_3', text: '7ஆம் வேற்றுமை உருபு: இல்/இடம்', sourcePage: 61 },
      { id: 'cw_7_4', text: '2.17 கேட்டுக் கருத்தறிதல்', sourcePage: 61 },
    ],
    homework: [
      { id: 'hw_7_homework_0', text: 'தேர்வு 2 (வாரம் 1-7) தயார் செய்யவும்', sourcePage: 61 },
    ],
    reading: {
      required: true,
      duration: '15-20 நிமிடங்கள்',
      passage: 'விருப்பமான கதை அல்லது கட்டுரை படிக்கவும்',
      tasks: stdReadingTasks(7),
      parentSignatureRequired: true,
      sourcePage: 61,
    },
    conversation: {
      required: true,
      duration: '2-4 நிமிடங்கள்',
      tasks: stdConversationTasks(7),
      sourcePage: 61,
    },
    tests: [],
    notes: ['அடுத்த வாரம் தேர்வு 2 உள்ளது (வாரம் 1-7 பாடங்கள்).'],
  },

  // ── Week 8 ──────────────────────────────────────────────────────────────────
  {
    grade: GRADE,
    week: 8,
    source: { document: DOC, pages: [62, 63] },
    classwork: [
      { id: 'cw_8_0', text: 'தேர்வு 2 (வாரம் 1-7)', sourcePage: 62 },
    ],
    homework: [
      { id: 'hw_8_homework_0', text: '2.13 ஆண்பால் – பெண்பால்', sourcePage: 62 },
      { id: 'hw_8_homework_1', text: 'வேற்றுமை உருபுப் பயிற்சி: (அது, உடைய, இடம், இல்) இணைத்து எழுதவும் (சொற்கள்: மரம், அயன்)', sourcePage: 63 },
      { id: 'hw_8_homework_2', text: 'வாக்கியம் அமை: களைப்பு, நீச்சல் குளம், மிதவை, விரைவு உணவகம்', sourcePage: 63 },
    ],
    reading: {
      required: true,
      duration: '10 நிமிடம்',
      passage: 'பயிற்சி 2.7',
      readingQuestions: [
        'கீர்த்தனாவும் மாலினியும் அடிக்கடி எங்குச் செல்வார்கள்?',
        'அவர்கள் பூங்காவில் என்ன விளையாடுவார்கள்?',
      ],
      tasks: stdReadingTasks(8),
      parentSignatureRequired: true,
      sourcePage: 62,
    },
    conversation: {
      required: true,
      duration: '2-4 நிமிடங்கள்',
      tasks: stdConversationTasks(8),
      sourcePage: 62,
    },
    tests: [
      { title: 'தேர்வு 2 – வாரம் 1-7 பாடங்கள்', sourcePage: 62 },
    ],
    notes: [],
  },

  // ── Week 9 ──────────────────────────────────────────────────────────────────
  {
    grade: GRADE,
    week: 9,
    source: { document: DOC, pages: [64, 65, 66, 67, 68] },
    classwork: [
      { id: 'cw_9_0', text: '3.1 பேசுவோம்', sourcePage: 64 },
      { id: 'cw_9_1', text: '3.2 கலந்துரையாடுவோம்', sourcePage: 64 },
      { id: 'cw_9_2', text: '3.4 வாசிப்போம்: யானை', sourcePage: 65 },
      { id: 'cw_9_3', text: '3.4.1 விடை காண்போம்', sourcePage: 65 },
      { id: 'cw_9_4', text: '3.7 ஒருமை பன்மை', sourcePage: 66 },
      { id: 'cw_9_5', text: '8ஆம் வேற்றுமை உருபு: விளி (ஆ/ஏ)', sourcePage: 67 },
      { id: 'cw_9_6', text: 'திருக்குறள்: உடுக்கை இழந்தவன் கைபோல ஆங்கே இடுக்கண் களைவதாம் நட்பு', sourcePage: 68 },
    ],
    homework: [
      { id: 'hw_9_homework_0', text: '3.4.2 பொருத்தமான எழுத்தை எழுதுக', sourcePage: 65 },
      { id: 'hw_9_homework_1', text: '3.5 வாக்கியங்களை நிறைவு செய்க', sourcePage: 66 },
      { id: 'hw_9_homework_2', text: 'வேற்றுமை உருபுப் பயிற்சி: (இடம், இல், ஆ, ஏ) இணைத்து எழுதவும் (சொற்கள்: சூரியன், காகம்)', sourcePage: 67 },
      { id: 'hw_9_homework_3', text: 'வாக்கியம் அமை: விலங்கியல் பூங்கா, உறக்கம், கனமான', sourcePage: 68 },
    ],
    reading: {
      required: true,
      duration: '15-20 நிமிடங்கள்',
      passage: 'பயிற்சி 3.4',
      readingQuestions: [
        'யானை தும்பிக்கையால் என்ன செய்யும்?',
        'யானை எப்படி நடக்கும்?',
      ],
      tasks: stdReadingTasks(9),
      parentSignatureRequired: true,
      sourcePage: 65,
    },
    conversation: {
      required: true,
      duration: '2-4 நிமிடங்கள்',
      tasks: stdConversationTasks(9),
      sourcePage: 65,
    },
    tests: [],
    notes: [],
  },

  // ── Week 10 ─────────────────────────────────────────────────────────────────
  {
    grade: GRADE,
    week: 10,
    source: { document: DOC, pages: [69, 70, 71, 72] },
    classwork: [
      { id: 'cw_10_0', text: '3.3 அறிந்துகொள்வோம்', sourcePage: 69 },
      { id: 'cw_10_1', text: '3.6 கருத்தறிதல்', sourcePage: 70 },
      { id: 'cw_10_2', text: 'மூவிடப்பெயர்கள் (தன்மை, முன்னிலை, படர்க்கை)', sourcePage: 70 },
      { id: 'cw_10_3', text: '3.9 மூவிடப்பெயர்கள்', sourcePage: 71 },
      { id: 'cw_10_4', text: '-டு வேற்றுமை உருபு விதி (வீடு → வீட்டை)', sourcePage: 72 },
    ],
    homework: [
      { id: 'hw_10_homework_0', text: '3.8 ஆண்பால் – பெண்பால்', sourcePage: 70 },
      { id: 'hw_10_homework_1', text: 'திருக்குறளை பொருளுடன் மனப்பாடம் செய்யவும்: உடுக்கை இழந்தவன் கைபோல ஆங்கே இடுக்கண் களைவதாம் நட்பு', sourcePage: 70 },
      { id: 'hw_10_homework_2', text: 'வேற்றுமை உருபுப் பயிற்சி: (ஐ, ஆல், ஓடு, உடன், கு) இணைத்து எழுதவும் (சொற்கள்: மாணவன், காடு)', sourcePage: 71 },
      { id: 'hw_10_homework_3', text: 'வாக்கியம் அமை: புகைப்படம், விடுமுறை, நூலகம்', sourcePage: 72 },
    ],
    reading: {
      required: true,
      duration: '15-20 நிமிடங்கள்',
      passage: 'பயிற்சி 3.6 மற்றும் பிடித்த கதை / கட்டுரை',
      readingQuestions: [
        'ரவி தன் அம்மாவுடன் எங்குச் சென்றான்?',
        'ரவி நூலகத்தில் எவ்வளவு புத்தகங்களை தன் கணக்கில் பெற்றான்?',
      ],
      tasks: stdReadingTasks(10),
      parentSignatureRequired: true,
      sourcePage: 70,
    },
    conversation: {
      required: true,
      duration: '2-4 நிமிடங்கள்',
      tasks: stdConversationTasks(10),
      sourcePage: 70,
    },
    tests: [],
    notes: [],
  },

  // ── Week 11 ─────────────────────────────────────────────────────────────────
  {
    grade: GRADE,
    week: 11,
    source: { document: DOC, pages: [73] },
    classwork: [
      { id: 'cw_11_0', text: '3.10 பொருத்தமான சொல்லை நிரப்புக – இரண்டாம் பாதி', sourcePage: 73 },
      { id: 'cw_11_1', text: '3.11 பொருத்தமான சொல்லின் கீழ்க் கோடிடுக', sourcePage: 73 },
      { id: 'cw_11_2', text: '3.12 உரிய எதிர்ச்சொல்லுடன் இணைக்க', sourcePage: 73 },
      { id: 'cw_11_3', text: '3.13 உரிய எதிர்ச்சொல்லை எழுதுக', sourcePage: 73 },
      { id: 'cw_11_4', text: '3.14 பொருத்தமாக இணைக்க', sourcePage: 73 },
      { id: 'cw_11_5', text: '-று வேற்றுமை உருபு விதி (ஆறு → ஆற்றை)', sourcePage: 73 },
    ],
    homework: [
      { id: 'hw_11_homework_0', text: 'தேர்வு 3 க்கு தயார் செய்யவும்', sourcePage: 73 },
    ],
    reading: {
      required: true,
      duration: '15-20 நிமிடங்கள்',
      passage: 'விருப்பமான கதை அல்லது கட்டுரை படிக்கவும்',
      tasks: stdReadingTasks(11),
      parentSignatureRequired: true,
      sourcePage: 73,
    },
    conversation: {
      required: true,
      duration: '2-4 நிமிடங்கள்',
      tasks: stdConversationTasks(11),
      sourcePage: 73,
    },
    tests: [],
    notes: ['அடுத்த வாரம் தேர்வு 3 உள்ளது.'],
  },

  // ── Week 12 ─────────────────────────────────────────────────────────────────
  {
    grade: GRADE,
    week: 12,
    source: { document: DOC, pages: [74, 75, 76, 77] },
    classwork: [
      { id: 'cw_12_0', text: 'தேர்வு 3', sourcePage: 74 },
    ],
    homework: [
      { id: 'hw_12_homework_0', text: '4.3 சிங்கமும் எலியும் (கதை வாசிக்க)', sourcePage: 75 },
      { id: 'hw_12_homework_1', text: '4.4 பொருத்தமான உதவிச் சொற்களைத் தேர்ந்தெடுத்துக் கோடிட்ட இடங்களை நிரப்புக', sourcePage: 75 },
      { id: 'hw_12_homework_2', text: 'வேற்றுமை உருபுப் பயிற்சி: (கு, இல், இன், இலிருந்து, இருந்து) இணைத்து எழுதவும் (சொற்கள்: சோறு, வேர்)', sourcePage: 76 },
      { id: 'hw_12_homework_3', text: 'வாக்கியம் அமை: வலை, வேடன்', sourcePage: 77 },
    ],
    reading: {
      required: true,
      duration: '15-20 நிமிடங்கள்',
      passage: 'பயிற்சி 4.3 மற்றும் விருப்பமான கதை அல்லது கட்டுரை',
      readingQuestions: [
        'சிங்கம் எதற்காக பலமுறை கர்ஜித்தது?',
        'சிங்கத்தின் சத்தத்தைக் கேட்டு எது ஓடி வந்தது?',
      ],
      tasks: stdReadingTasks(12),
      parentSignatureRequired: true,
      sourcePage: 75,
    },
    conversation: {
      required: true,
      duration: '2-4 நிமிடங்கள்',
      tasks: stdConversationTasks(12),
      sourcePage: 75,
    },
    projectAssigned: project2,
    tests: [
      { title: 'தேர்வு 3', sourcePage: 74 },
    ],
    notes: ['திட்டப்பணி 2 இந்த வாரம் கொடுக்கப்படுகிறது. வாரம் 16-ல் சமர்ப்பிக்கவும்.'],
  },

  // ── Week 13 ─────────────────────────────────────────────────────────────────
  {
    grade: GRADE,
    week: 13,
    source: { document: DOC, pages: [78, 79, 80] },
    classwork: [
      { id: 'cw_13_0', text: '4.1 பேசுவோம்: கண்டுபிடிப்போம்', sourcePage: 78 },
      { id: 'cw_13_1', text: '4.2 படிப்போம்: காப்பாற்றுங்கள்! காப்பாற்றுங்கள்!', sourcePage: 78 },
      { id: 'cw_13_2', text: '4.2.2 பயிற்சி - விடை எழுதுக', sourcePage: 79 },
      { id: 'cw_13_3', text: '4.5 அறிந்துகொள்வோம்', sourcePage: 79 },
      { id: 'cw_13_4', text: 'இரட்டிப்பு விதி வேற்றுமை உருபு (கண் → கண்ணை)', sourcePage: 80 },
    ],
    homework: [
      { id: 'hw_13_homework_0', text: '4.2.1 கோடிட்ட இடத்தை நிரப்புக', sourcePage: 78 },
      { id: 'hw_13_homework_1', text: '4.2.3 கட்டங்களையும் கோடுகளையும் நிரப்புக', sourcePage: 79 },
      { id: 'hw_13_homework_2', text: '4.7 ஆண்பால் சொல்லைப் பெண்பாலாகவும், பெண்பால் சொல்லை ஆண்பாலாகவும் மாற்றி எழுதுக', sourcePage: 79 },
      { id: 'hw_13_homework_3', text: 'வேற்றுமை உருபுப் பயிற்சி: (இல், இலிருந்து, இன், இருந்து, அது, உடைய) இணைத்து எழுதவும் (சொற்கள்: திருடன், மாடு)', sourcePage: 80 },
      { id: 'hw_13_homework_4', text: 'வாக்கியம் அமை: அணில், காடு, குறி', sourcePage: 80 },
    ],
    reading: {
      required: true,
      duration: '15-20 நிமிடங்கள்',
      passage: 'பயிற்சி 4.2',
      readingQuestions: [
        'ஒரு நாள் காட்டிற்கு யார் வந்தான்?',
        'வேடனின் குறி எதனால் தப்பியது?',
      ],
      tasks: stdReadingTasks(13),
      parentSignatureRequired: true,
      sourcePage: 78,
    },
    conversation: {
      required: true,
      duration: '2-4 நிமிடங்கள்',
      tasks: stdConversationTasks(13),
      sourcePage: 78,
    },
    tests: [],
    notes: [],
  },

  // ── Week 14 ─────────────────────────────────────────────────────────────────
  {
    grade: GRADE,
    week: 14,
    source: { document: DOC, pages: [81, 82, 83] },
    classwork: [
      { id: 'cw_14_0', text: 'கலந்துரையாடல்: விலங்கியல் safari அனுபவம்', sourcePage: 81 },
      { id: 'cw_14_1', text: '4.8 பொருத்தமான சொல்லை எடுத்து எழுதுக', sourcePage: 81 },
      { id: 'cw_14_2', text: 'இலக்கணம்: இறந்தகாலம் (இடைநிலைகள்: த், ட், ற், இன்)', sourcePage: 82 },
      { id: 'cw_14_3', text: '4.11 காலங்கள் – இறந்த காலம்', sourcePage: 82 },
      { id: 'cw_14_4', text: '4.12 பொருத்தமான சொல்லைக் கொண்டு நிரப்புக', sourcePage: 82 },
      { id: 'cw_14_5', text: 'திருக்குறள்: இன்னா செய்தாரை ஒறுத்தல் அவர்நாண நன்னயம் செய்து விடல்', sourcePage: 83 },
    ],
    homework: [
      { id: 'hw_14_homework_0', text: '4.9 பொருத்தமான சொல்லை கோட்டில் எழுதுக', sourcePage: 82 },
      { id: 'hw_14_homework_1', text: 'திருக்குறளை பொருளுடன் மனப்பாடம் செய்யவும்: இன்னா செய்தாரை ஒறுத்தல் அவர்நாண நன்னயம் செய்து விடல்', sourcePage: 83 },
      { id: 'hw_14_homework_2', text: 'வேற்றுமை உருபுப் பயிற்சி: (அது, உடைய, இடம், இல்) இணைத்து எழுதவும் (சொற்கள்: அவள், நாடு)', sourcePage: 82 },
      { id: 'hw_14_homework_3', text: 'வாக்கியம் அமை: புறா, நெருப்பு, நண்பர்கள்', sourcePage: 83 },
    ],
    reading: {
      required: true,
      duration: '15-20 நிமிடங்கள்',
      passage: 'விருப்பமான கதை புத்தகம் வாசிக்கவும்',
      tasks: stdReadingTasks(14),
      parentSignatureRequired: true,
      sourcePage: 82,
    },
    conversation: {
      required: true,
      duration: '2-4 நிமிடங்கள்',
      tasks: stdConversationTasks(14),
      sourcePage: 82,
    },
    tests: [],
    notes: [],
  },

  // ── Week 15 ─────────────────────────────────────────────────────────────────
  {
    grade: GRADE,
    week: 15,
    source: { document: DOC, pages: [84, 85, 86] },
    classwork: [
      { id: 'cw_15_0', text: 'கலந்துரையாடுவோம்: வீட்டில் படித்த கதை பற்றி', sourcePage: 84 },
      { id: 'cw_15_1', text: '4.10 பொருத்தமான சொல்லைக் கோட்டில் எழுதுக', sourcePage: 84 },
      { id: 'cw_15_2', text: '4.13 பொருத்தமான சொல்லைத் தேர்ந்தெடுத்து எழுதுக', sourcePage: 85 },
      { id: 'cw_15_3', text: '4.14 காலத்திற்கு ஏற்றவாறு மாற்றி எழுதுக', sourcePage: 85 },
      { id: 'cw_15_4', text: 'திட்டப்பணி 2 தலைப்பு மற்றும் விதிமுறைகள் விளக்கம்', sourcePage: 86 },
    ],
    homework: [
      { id: 'hw_15_homework_0', text: 'தேர்வு 4: திட்டப்பணி 2 (Due next week - Week 16) தயார் செய்யவும்', sourcePage: 84 },
    ],
    reading: {
      required: true,
      duration: '15-20 நிமிடங்கள்',
      passage: 'விருப்பமான கதை அல்லது கட்டுரை படிக்கவும்',
      tasks: stdReadingTasks(15),
      parentSignatureRequired: true,
      sourcePage: 84,
    },
    conversation: {
      required: true,
      duration: '2-4 நிமிடங்கள்',
      tasks: stdConversationTasks(15),
      sourcePage: 84,
    },
    projectReminder: project2,
    tests: [],
    notes: ['திட்டப்பணி 2 அடுத்த வாரம் (வாரம் 16) சமர்ப்பிக்கவும்.'],
  },

  // ── Week 16 ─────────────────────────────────────────────────────────────────
  {
    grade: GRADE,
    week: 16,
    source: { document: DOC, pages: [87, 88] },
    classwork: [
      { id: 'cw_16_0', text: 'தேர்வு 4: திட்டப்பணி 2 (வகுப்பில் வாய்மொழியாக விளக்கம்)', sourcePage: 87 },
    ],
    homework: [
      { id: 'hw_16_homework_0', text: 'வேற்றுமை உருபுப் பயிற்சி: (ஐ, ஆல், ஓடு, உடன்) இணைத்து எழுதவும் (சொற்கள்: பாடம், தண்ணீர்)', sourcePage: 87 },
      { id: 'hw_16_homework_1', text: 'வாக்கியம் அமை: உதவி, ஒலி', sourcePage: 88 },
    ],
    reading: {
      required: true,
      duration: '15-20 நிமிடங்கள்',
      passage: 'விருப்பமான கதை / கட்டுரை படிக்கவும்',
      tasks: stdReadingTasks(16),
      parentSignatureRequired: true,
      sourcePage: 87,
    },
    conversation: {
      required: true,
      duration: '2-4 நிமிடங்கள்',
      tasks: stdConversationTasks(16),
      sourcePage: 87,
    },
    projectDue: project2,
    tests: [
      { title: 'தேர்வு 4 – திட்டப்பணி 2 வாய்மொழி விளக்கம்', sourcePage: 87 },
    ],
    notes: ['திட்டப்பணி 2 இன்று சமர்ப்பிக்கவும்!'],
  },

  // ── Week 17 ─────────────────────────────────────────────────────────────────
  {
    grade: GRADE,
    week: 17,
    source: { document: DOC, pages: [89, 90] },
    classwork: [
      { id: 'cw_17_0', text: '5.1 பேசுவோம்: பொங்கல் திருநாள்', sourcePage: 89 },
      { id: 'cw_17_1', text: '5.2 வாசிப்போம்', sourcePage: 89 },
      { id: 'cw_17_2', text: '5.3 பதில் காண்போம்', sourcePage: 89 },
      { id: 'cw_17_3', text: '5.8 அறிந்து கொள்வோம்', sourcePage: 90 },
    ],
    homework: [
      { id: 'hw_17_homework_0', text: '5.6 கண்டுபிடி வட்டமிடு', sourcePage: 89 },
      { id: 'hw_17_homework_1', text: '5.9 மூவிடப்பெயர்கள்: வாக்கியங்களை நிரப்புக', sourcePage: 90 },
      { id: 'hw_17_homework_2', text: 'வேற்றுமை உருபுப் பயிற்சி: (கு, இல், இன், இலிருந்து, இருந்து) இணைத்து எழுதவும் (சொற்கள்: நிலம், நையிர்)', sourcePage: 90 },
      { id: 'hw_17_homework_3', text: 'வாக்கியம் அமை: தை மாதம், கோலம், பாகன', sourcePage: 90 },
    ],
    reading: {
      required: true,
      duration: '15-20 நிமிடங்கள்',
      passage: '5.2 மற்றும் பிடித்த கதை / கட்டுரை',
      readingQuestions: [
        'பொங்கல் பண்டிகை என்று கொண்டாடப்படுகிறது?',
        'பயிர்கள் வளர எவை தேவை?',
      ],
      tasks: stdReadingTasks(17),
      parentSignatureRequired: true,
      sourcePage: 89,
    },
    conversation: {
      required: true,
      duration: '2-4 நிமிடங்கள்',
      tasks: stdConversationTasks(17),
      sourcePage: 89,
    },
    tests: [],
    notes: [],
  },

  // ── Week 18 ─────────────────────────────────────────────────────────────────
  {
    grade: GRADE,
    week: 18,
    source: { document: DOC, pages: [91, 92, 93] },
    classwork: [
      { id: 'cw_18_0', text: '5.4 கருத்தறிதல்', sourcePage: 91 },
      { id: 'cw_18_1', text: '5.12 காலங்கள் - எதிர்காலம் (இடைநிலைகள்: ப், வ்)', sourcePage: 92 },
      { id: 'cw_18_2', text: 'திருக்குறள்: நன்றி மறப்பது நன்றன்று நன்றல்லது அன்றே மறப்பது நன்று', sourcePage: 93 },
    ],
    homework: [
      { id: 'hw_18_homework_0', text: '5.13 வாக்கியத்திற்கு ஏற்ற சொல்லைத் தேர்ந்தெடுத்து எழுதுக', sourcePage: 92 },
      { id: 'hw_18_homework_1', text: 'வேற்றுமை உருபுப் பயிற்சி: (இல், இலிருந்து, இன், இருந்து, அது) இணைத்து எழுதவும் (சொற்கள்: திடல், உணவு)', sourcePage: 92 },
      { id: 'hw_18_homework_2', text: 'வாக்கியம் அமை: சூரியன், கரும்பு, நெல்', sourcePage: 93 },
    ],
    reading: {
      required: true,
      duration: '15-20 நிமிடங்கள்',
      passage: 'பயிற்சி 5.4 மற்றும் பிடித்த கதை / கட்டுரை',
      tasks: stdReadingTasks(18),
      parentSignatureRequired: true,
      sourcePage: 92,
    },
    conversation: {
      required: true,
      duration: '2-4 நிமிடங்கள்',
      tasks: stdConversationTasks(18),
      sourcePage: 92,
    },
    tests: [],
    notes: [],
  },

  // ── Week 19 ─────────────────────────────────────────────────────────────────
  {
    grade: GRADE,
    week: 19,
    source: { document: DOC, pages: [94] },
    classwork: [
      { id: 'cw_19_0', text: '5.5 முன்னுணர்வுக் கருத்தறிதல்', sourcePage: 94 },
      { id: 'cw_19_1', text: '5.7 சொல்லிப் பழகுவோம்', sourcePage: 94 },
      { id: 'cw_19_2', text: '5.10 உரிய எதிர்ச்சொல்லைத் தேர்ந்தெடுத்து எழுதுக', sourcePage: 94 },
      { id: 'cw_19_3', text: '5.14 பொருத்தமான காலத்தை எழுதுக', sourcePage: 94 },
      { id: 'cw_19_4', text: '5.15 வாக்கியங்களில் வண்ணமிட்ட சொற்கள் எந்தக் காலத்தில் உள்ளன என எழுதுக', sourcePage: 94 },
    ],
    homework: [
      { id: 'hw_19_homework_0', text: 'தேர்வு 5 பயிற்சி', sourcePage: 94 },
    ],
    reading: {
      required: true,
      duration: '15-20 நிமிடங்கள்',
      passage: 'விருப்பமான கதை அல்லது கட்டுரை படிக்கவும்',
      tasks: stdReadingTasks(19),
      parentSignatureRequired: true,
      sourcePage: 94,
    },
    conversation: {
      required: true,
      duration: '2-4 நிமிடங்கள்',
      tasks: stdConversationTasks(19),
      sourcePage: 94,
    },
    tests: [],
    notes: ['அடுத்த வாரம் தேர்வு 5 உள்ளது.'],
  },

  // ── Week 20 ─────────────────────────────────────────────────────────────────
  {
    grade: GRADE,
    week: 20,
    source: { document: DOC, pages: [95, 96] },
    classwork: [
      { id: 'cw_20_0', text: 'தேர்வு 5', sourcePage: 95 },
    ],
    homework: [
      { id: 'hw_20_homework_0', text: '5.11 வாசித்து விடையளிக்கவும்', sourcePage: 95 },
      { id: 'hw_20_homework_1', text: 'வேற்றுமை உருபுப் பயிற்சி: (இல், இலிருந்து, இன், இருந்து, அது) இணைத்து எழுதவும் (சொற்கள்: படம், பாம்பு)', sourcePage: 96 },
    ],
    reading: {
      required: true,
      duration: '15-20 நிமிடங்கள்',
      passage: 'பிடித்த கதை / கட்டுரை படிக்கவும்',
      tasks: stdReadingTasks(20),
      parentSignatureRequired: true,
      sourcePage: 95,
    },
    conversation: {
      required: true,
      duration: '2-4 நிமிடங்கள்',
      tasks: stdConversationTasks(20),
      sourcePage: 95,
    },
    tests: [
      { title: 'தேர்வு 5', sourcePage: 95 },
    ],
    notes: [],
  },

  // ── Week 21 ─────────────────────────────────────────────────────────────────
  {
    grade: GRADE,
    week: 21,
    source: { document: DOC, pages: [97, 98, 99] },
    classwork: [
      { id: 'cw_21_0', text: '6.1 பேசுவோம்: கடற்கரை', sourcePage: 97 },
      { id: 'cw_21_1', text: '6.2 வாசிப்போம்: கடற்கரையில் ஒருநாள்', sourcePage: 97 },
      { id: 'cw_21_2', text: '6.2.1 விடை காண்போம்', sourcePage: 98 },
      { id: 'cw_21_3', text: '6.3 சொல்லிப் பழகுவோம்', sourcePage: 98 },
      { id: 'cw_21_4', text: '6.5 சொற்களை முறைப்படுத்தி வாக்கியத்தை உருவாக்குக', sourcePage: 98 },
      { id: 'cw_21_5', text: '6.6 அறிந்துகொள்வோம்', sourcePage: 99 },
    ],
    homework: [
      { id: 'hw_21_homework_0', text: '6.2.2 உரிய சொற்களை எழுதுக', sourcePage: 98 },
      { id: 'hw_21_homework_1', text: '6.10 கோடிட்டுப் பொருத்தமாக இணைக்க', sourcePage: 99 },
      { id: 'hw_21_homework_2', text: 'வேற்றுமை உருபுப் பயிற்சி: (ஐ, ஆல், ஓடு, உடன், கு) இணைத்து எழுதவும் (சொற்கள்: தங்கை, கடற்கரை)', sourcePage: 99 },
      { id: 'hw_21_homework_3', text: 'வாக்கியம் அமை: துரத்தினர், வண்ண வண்ண, மணல்வீடு', sourcePage: 99 },
    ],
    reading: {
      required: true,
      duration: '15-20 நிமிடங்கள்',
      passage: 'பயிற்சி 6.2 மற்றும் பிடித்த கதை / கட்டுரை',
      readingQuestions: [
        'கலா தன் குடும்பத்துடன் எங்குச் சென்றாள்?',
        'கடற்கரை எங்கும் என்ன கிடந்தது?',
      ],
      tasks: stdReadingTasks(21),
      parentSignatureRequired: true,
      sourcePage: 97,
    },
    conversation: {
      required: true,
      duration: '2-4 நிமிடங்கள்',
      tasks: stdConversationTasks(21),
      sourcePage: 97,
    },
    tests: [],
    notes: [],
  },

  // ── Week 22 ─────────────────────────────────────────────────────────────────
  {
    grade: GRADE,
    week: 22,
    source: { document: DOC, pages: [100, 101] },
    classwork: [
      { id: 'cw_22_0', text: '6.7 கருத்தறிதல்', sourcePage: 100 },
      { id: 'cw_22_1', text: '6.8 பொருத்தமான விடைகளைத் தேர்ந்தெடுத்து எழுதுக', sourcePage: 100 },
      { id: 'cw_22_2', text: '6.11 ஆண்பால் பெண்பால்', sourcePage: 101 },
      { id: 'cw_22_3', text: '6.12 ஆண்பால் சொற்களைப் பெண்பாலாகவும், பெண்பால் சொற்களை ஆண்பாலாகவும் மாற்றி எழுதுக', sourcePage: 101 },
    ],
    homework: [
      { id: 'hw_22_homework_0', text: '6.15 காலங்கள்', sourcePage: 101 },
      { id: 'hw_22_homework_1', text: '6.13 ஒருமைச் சொற்களைப் பன்மையாகவும் பன்மைச் சொற்களை ஒருமையாகவும் மாற்றி எழுதுக', sourcePage: 101 },
      { id: 'hw_22_homework_2', text: 'வேற்றுமை உருபுப் பயிற்சி: (ஐ, ஆல், ஓடு, உடன், கு) இணைத்து எழுதவும் (சொற்கள்: கடை, அவர்)', sourcePage: 101 },
      { id: 'hw_22_homework_3', text: 'வாக்கியம் அமை: கடற்கரை, சிப்பிகள், மணல்வாரி', sourcePage: 101 },
    ],
    reading: {
      required: true,
      duration: '15-20 நிமிடங்கள்',
      passage: 'பயிற்சி 6.7 மற்றும் பிடித்த கதை',
      tasks: stdReadingTasks(22),
      parentSignatureRequired: true,
      sourcePage: 100,
    },
    conversation: {
      required: true,
      duration: '2-4 நிமிடங்கள்',
      tasks: stdConversationTasks(22),
      sourcePage: 100,
    },
    tests: [],
    notes: [],
  },

  // ── Week 23 ─────────────────────────────────────────────────────────────────
  {
    grade: GRADE,
    week: 23,
    source: { document: DOC, pages: [102] },
    classwork: [
      { id: 'cw_23_0', text: 'கலந்துரையாடல்: இந்தியா கடற்கரை அனுபவம்', sourcePage: 102 },
      { id: 'cw_23_1', text: '6.9 ஆசிரியர் கூறுவதைக் கேட்டு உரிய விடையளிக்கவும்', sourcePage: 102 },
      { id: 'cw_23_2', text: '6.14 கோடிட்ட வினைச்சொல்லைக் காலத்துக்கு ஏற்ப மாற்றி எழுதுக', sourcePage: 102 },
      { id: 'cw_23_3', text: '6.16 வாக்கியங்களைப் பொருத்தமான சொற்களைக் கொண்டு நிரப்புக', sourcePage: 102 },
    ],
    homework: [
      { id: 'hw_23_homework_0', text: 'தேர்வு 6 பயிற்சி', sourcePage: 102 },
    ],
    reading: {
      required: true,
      duration: '15-20 நிமிடங்கள்',
      passage: 'விருப்பமான கதை அல்லது கட்டுரை படிக்கவும்',
      tasks: stdReadingTasks(23),
      parentSignatureRequired: true,
      sourcePage: 102,
    },
    conversation: {
      required: true,
      duration: '2-4 நிமிடங்கள்',
      tasks: stdConversationTasks(23),
      sourcePage: 102,
    },
    tests: [],
    notes: ['அடுத்த வாரம் தேர்வு 6 உள்ளது.'],
  },

  // ── Week 24 ─────────────────────────────────────────────────────────────────
  {
    grade: GRADE,
    week: 24,
    source: { document: DOC, pages: [103, 104] },
    classwork: [
      { id: 'cw_24_0', text: 'தேர்வு 6', sourcePage: 103 },
    ],
    homework: [
      { id: 'hw_24_homework_0', text: 'வேற்றுமை உருபுப் பயிற்சி: (இடம், இல், ஆ, ஏ) இணைத்து எழுதவும் (சொற்கள்: அருவி, கிளி)', sourcePage: 103 },
      { id: 'hw_24_homework_1', text: 'வாக்கியம் அமை: உழவர் விழா, சர்க்கரை, அரிசி, வண்ணம்', sourcePage: 104 },
    ],
    reading: {
      required: true,
      duration: '15-20 நிமிடங்கள்',
      passage: 'பயிற்சி 6.9 மற்றும் பிடித்த கதை / கட்டுரை',
      readingQuestions: [
        'ராமு பூங்காவில் யாரைப் பார்த்தான்?',
        'பூங்காவில் என்ன இருந்தது?',
      ],
      tasks: stdReadingTasks(24),
      parentSignatureRequired: true,
      sourcePage: 103,
    },
    conversation: {
      required: true,
      duration: '2-4 நிமிடங்கள்',
      tasks: stdConversationTasks(24),
      sourcePage: 103,
    },
    tests: [
      { title: 'தேர்வு 6', sourcePage: 103 },
    ],
    notes: [],
  },

  // ── Week 25 ─────────────────────────────────────────────────────────────────
  {
    grade: GRADE,
    week: 25,
    source: { document: DOC, pages: [105, 106] },
    classwork: [
      { id: 'cw_25_0', text: '7.1 பேசுவோம்: பல்பொருள் அங்காடி', sourcePage: 105 },
      { id: 'cw_25_1', text: '7.2 வாசிப்போம்: காய்கறி', sourcePage: 105 },
      { id: 'cw_25_2', text: '7.7 மூவிடப் பெயருக்கு பொருத்தமான சொற்களைத் தேர்ந்தெடுத்து எழுதுக', sourcePage: 106 },
      { id: 'cw_25_3', text: '7.10 கோடிடப்பட்ட சொற்களை சரியான காலத்திற்கு மாற்றி எழுதுக', sourcePage: 106 },
    ],
    homework: [
      { id: 'hw_25_homework_0', text: '7.2.1 பொருத்தமான விடை எழுதுக', sourcePage: 105 },
      { id: 'hw_25_homework_1', text: '7.8 உரிய சொற்களைத் தேர்ந்தெடுத்து எழுதுக', sourcePage: 106 },
      { id: 'hw_25_homework_2', text: 'வேற்றுமை உருபுப் பயிற்சி: (ஐ, ஆல், ஓடு, உடன், கு) இணைத்து எழுதவும் (சொற்கள்: பட்டம், தாத்தா)', sourcePage: 106 },
      { id: 'hw_25_homework_3', text: 'வாக்கியம் அமை: மறக்காமல், காய்கறி, சந்தை', sourcePage: 106 },
    ],
    reading: {
      required: true,
      duration: '15-20 நிமிடங்கள்',
      passage: 'பயிற்சி 7.2 மற்றும் பிடித்த கதை / கட்டுரை',
      tasks: stdReadingTasks(25),
      parentSignatureRequired: true,
      sourcePage: 105,
    },
    conversation: {
      required: true,
      duration: '2-4 நிமிடங்கள்',
      tasks: stdConversationTasks(25),
      sourcePage: 105,
    },
    tests: [],
    notes: [],
  },

  // ── Week 26 ─────────────────────────────────────────────────────────────────
  {
    grade: GRADE,
    week: 26,
    source: { document: DOC, pages: [107, 108, 109] },
    classwork: [
      { id: 'cw_26_0', text: 'கலந்துரையாடுவோம்: இந்தியன் பலசரக்கு கடை அனுபவம்', sourcePage: 107 },
      { id: 'cw_26_1', text: '7.3 தெரிந்து கொள்வோம்', sourcePage: 107 },
      { id: 'cw_26_2', text: '7.3.1 காய்கறிகள்', sourcePage: 108 },
      { id: 'cw_26_3', text: '7.5 கருத்தறிதல்', sourcePage: 108 },
      { id: 'cw_26_4', text: 'திருக்குறள்: ஈன்ற பொழுதின் பெரிதுவக்கும் தன்மகனைச் சான்றோன் எனக்கேட்ட தாய்', sourcePage: 109 },
    ],
    homework: [
      { id: 'hw_26_homework_0', text: '7.4 இணைக்க', sourcePage: 108 },
      { id: 'hw_26_homework_1', text: '7.5.1 விடை எழுது', sourcePage: 108 },
      { id: 'hw_26_homework_2', text: 'திருக்குறள் மனப்பாடம்: ஈன்ற பொழுதின் பெரிதுவக்கும் தன்மகனைச் சான்றோன் எனக்கேட்ட தாய்', sourcePage: 109 },
      { id: 'hw_26_homework_3', text: 'வேற்றுமை உருபுப் பயிற்சி: (ஐ, ஆல், ஓடு, உடன், கு) இணைத்து எழுதவும் (சொற்கள்: கதவு, பாட்டி)', sourcePage: 109 },
      { id: 'hw_26_homework_4', text: 'வாக்கியம் அமை: எல்லாரும், சுவையாக, அதிகமாக', sourcePage: 109 },
    ],
    reading: {
      required: true,
      duration: '15-20 நிமிடங்கள்',
      passage: 'பயிற்சி 7.5 மற்றும் பிடித்த கதை / கட்டுரை',
      readingQuestions: [
        'மீராவுக்குப் பிடித்தது என்ன என்ன?',
        'அம்மா ஏன் மகிழ்ச்சியாக இருந்தார்?',
      ],
      tasks: stdReadingTasks(26),
      parentSignatureRequired: true,
      sourcePage: 107,
    },
    conversation: {
      required: true,
      duration: '2-4 நிமிடங்கள்',
      tasks: stdConversationTasks(26),
      sourcePage: 107,
    },
    tests: [],
    notes: [],
  },

  // ── Week 27 ─────────────────────────────────────────────────────────────────
  {
    grade: GRADE,
    week: 27,
    source: { document: DOC, pages: [110] },
    classwork: [
      { id: 'cw_27_0', text: 'கலந்துரையாடுவோம்: உணவகம் (restaurant ordering scenario)', sourcePage: 110 },
      { id: 'cw_27_1', text: '7.3.2 சுவைகள்', sourcePage: 110 },
      { id: 'cw_27_2', text: '7.6 உரிய விடையை எடுத்து எழுதுக', sourcePage: 110 },
      { id: 'cw_27_3', text: '7.9 ஆண்பால் பெண்பால்', sourcePage: 110 },
      { id: 'cw_27_4', text: '7.11 வாக்கியத்திற்குப் பொருத்தமான சொற்களைத் தேர்ந்தெடுத்து எழுதுக', sourcePage: 110 },
    ],
    homework: [
      { id: 'hw_27_homework_0', text: 'தேர்வு 7 பயிற்சி', sourcePage: 110 },
    ],
    reading: {
      required: true,
      duration: '15-20 நிமிடங்கள்',
      passage: 'விருப்பமான கதை அல்லது கட்டுரை படிக்கவும்',
      tasks: stdReadingTasks(27),
      parentSignatureRequired: true,
      sourcePage: 110,
    },
    conversation: {
      required: true,
      duration: '2-4 நிமிடங்கள்',
      tasks: stdConversationTasks(27),
      sourcePage: 110,
    },
    tests: [],
    notes: ['அடுத்த வாரம் தேர்வு 7 உள்ளது.'],
  },

  // ── Week 28 ─────────────────────────────────────────────────────────────────
  {
    grade: GRADE,
    week: 28,
    source: { document: DOC, pages: [111, 112] },
    classwork: [
      { id: 'cw_28_0', text: 'தேர்வு 7', sourcePage: 111 },
    ],
    homework: [
      { id: 'hw_28_homework_0', text: '8.7 எதிர்ச்சொல்', sourcePage: 111 },
      { id: 'hw_28_homework_1', text: '8.8 ஒருமை பன்மை', sourcePage: 112 },
      { id: 'hw_28_homework_2', text: '8.9 காலங்கள்', sourcePage: 112 },
      { id: 'hw_28_homework_3', text: 'வேற்றுமை உருபுப் பயிற்சி: (இல், இலிருந்து, இன், இருந்து, அது, உடைய) இணைத்து எழுதவும் (சொற்கள்: கரும்பு, பால்)', sourcePage: 112 },
    ],
    reading: {
      required: true,
      duration: '15-20 நிமிடங்கள்',
      passage: 'பயிற்சி 8.4 மற்றும் பிடித்த கதை / கட்டுரை',
      tasks: stdReadingTasks(28),
      parentSignatureRequired: true,
      sourcePage: 111,
    },
    conversation: {
      required: true,
      duration: '2-4 நிமிடங்கள்',
      tasks: stdConversationTasks(28),
      sourcePage: 111,
    },
    tests: [
      { title: 'தேர்வு 7', sourcePage: 111 },
    ],
    notes: [],
  },

  // ── Week 29 ─────────────────────────────────────────────────────────────────
  {
    grade: GRADE,
    week: 29,
    source: { document: DOC, pages: [113, 114, 115] },
    classwork: [
      { id: 'cw_29_0', text: '8.1 பேசுவோம்: மாறுவேடப் போட்டி', sourcePage: 113 },
      { id: 'cw_29_1', text: '8.2 வாசிப்போம்', sourcePage: 113 },
      { id: 'cw_29_2', text: '8.3 பாடுவோம் - மசடி வளர்ப்பேன்', sourcePage: 114 },
      { id: 'cw_29_3', text: '8.3.1 கலந்துரையாடுவோம்', sourcePage: 114 },
      { id: 'cw_29_4', text: '8.5 பாடுவோம்', sourcePage: 114 },
      { id: 'cw_29_5', text: '8.6 கேட்டுச் செய்வோம்', sourcePage: 115 },
      { id: 'cw_29_6', text: '8.11 சொற்களை முறைப்படுத்தி வாக்கியம் அமை', sourcePage: 115 },
    ],
    homework: [
      { id: 'hw_29_homework_0', text: '8.2.1 விடை காண்போம்', sourcePage: 113 },
      { id: 'hw_29_homework_1', text: '8.10 காலங்கள்', sourcePage: 115 },
      { id: 'hw_29_homework_2', text: '8.12 பொருத்தமான சொற்களைக் கொண்டு பகுதியை நிரப்புக', sourcePage: 115 },
      { id: 'hw_29_homework_3', text: 'வேற்றுமை உருபுப் பயிற்சி: (ஐ, ஆல், ஓடு, உடன், கு) இணைத்து எழுதவும் (சொற்கள்: புலவர், பூனை)', sourcePage: 115 },
      { id: 'hw_29_homework_4', text: 'வாக்கியம் அமை: புலவர், நூற்றாண்டு, நூல், உலகம்', sourcePage: 115 },
    ],
    reading: {
      required: true,
      duration: '15-20 நிமிடங்கள்',
      passage: 'பயிற்சி 8.2',
      readingQuestions: [
        'ஒளவையார் யார்?',
        'ஒளவையார் எழுதிய புகழ்பெற்ற நூல்கள் எவை?',
      ],
      tasks: stdReadingTasks(29),
      parentSignatureRequired: true,
      sourcePage: 113,
    },
    conversation: {
      required: true,
      duration: '2-4 நிமிடங்கள்',
      tasks: stdConversationTasks(29),
      sourcePage: 113,
    },
    tests: [],
    notes: [],
  },

  // ── Week 30 ─────────────────────────────────────────────────────────────────
  {
    grade: GRADE,
    week: 30,
    source: { document: DOC, pages: [116] },
    classwork: [
      { id: 'cw_30_0', text: 'தேர்வு 8-க்குப் பயிற்சி செய்யவும் (இறுதித் தேர்வு - All vocabulary தேர்வு 1-7)', sourcePage: 116 },
    ],
    homework: [
      { id: 'hw_30_homework_0', text: 'தேர்வு 8-க்குப் பயிற்சி செய்யவும் (தேர்வு 1-7 அனைத்து சொற்கள்)', sourcePage: 116 },
    ],
    reading: {
      required: true,
      duration: '15-20 நிமிடங்கள்',
      passage: 'விருப்பமான கதை அல்லது கட்டுரை படிக்கவும்',
      tasks: stdReadingTasks(30),
      parentSignatureRequired: true,
      sourcePage: 116,
    },
    conversation: {
      required: true,
      duration: '2-4 நிமிடங்கள்',
      tasks: stdConversationTasks(30),
      sourcePage: 116,
    },
    tests: [],
    notes: ['இறுதித் தேர்வு (தேர்வு 8) – தேர்வு 1 முதல் 7 வரை அனைத்து சொற்களும் தேவை.'],
  },

  // ── Week 31 ─────────────────────────────────────────────────────────────────
  {
    grade: GRADE,
    week: 31,
    source: { document: DOC, pages: [116] },
    classwork: [
      { id: 'cw_31_0', text: 'தேர்வு 8-க்குப் பயிற்சி செய்யவும்', sourcePage: 116 },
    ],
    homework: [
      { id: 'hw_31_homework_0', text: 'தேர்வு 8-க்குப் பயிற்சி செய்யவும் (தேர்வு 1-7 அனைத்து சொற்கள்)', sourcePage: 116 },
    ],
    reading: {
      required: true,
      duration: '15-20 நிமிடங்கள்',
      passage: 'விருப்பமான கதை அல்லது கட்டுரை படிக்கவும்',
      tasks: stdReadingTasks(31),
      parentSignatureRequired: true,
      sourcePage: 116,
    },
    conversation: {
      required: true,
      duration: '2-4 நிமிடங்கள்',
      tasks: stdConversationTasks(31),
      sourcePage: 116,
    },
    tests: [],
    notes: ['இறுதித் தேர்வுக்கு நன்கு தயார் செய்யவும்!'],
  },

  // ── Week 32 ─────────────────────────────────────────────────────────────────
  {
    grade: GRADE,
    week: 32,
    source: { document: DOC, pages: [116] },
    classwork: [
      { id: 'cw_32_0', text: 'தேர்வு 8 (இறுதித் தேர்வு - Vocabulary from தேர்வு 1 through தேர்வு 7)', sourcePage: 116 },
    ],
    homework: [],
    reading: {
      required: false,
      duration: '',
      tasks: [],
      parentSignatureRequired: false,
      sourcePage: 116,
    },
    conversation: {
      required: false,
      duration: '',
      tasks: [],
      sourcePage: 116,
    },
    tests: [
      {
        title: 'தேர்வு 8 – இறுதித் தேர்வு (தேர்வு 1-7 அனைத்து சொற்கள்)',
        description: 'Final vocabulary test covering all words from தேர்வு 1 through தேர்வு 7',
        sourcePage: 116,
      },
    ],
    notes: ['இன்று இறுதித் தேர்வு. வாழ்த்துக்கள்!'],
  },
];

// ── Export ────────────────────────────────────────────────────────────────────

export const grade4Curriculum: CurriculumData = {
  grade: GRADE,
  totalWeeks: 32,
  document: DOC,
  weeks,
  projects: [project1, project2],
};
