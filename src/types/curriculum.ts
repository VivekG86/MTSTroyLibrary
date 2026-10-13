export interface CurriculumTask {
  id: string;
  text: string;
  textEnglish?: string;
  sourcePage: number;
  needsReview?: boolean;
}

export interface ReadingPractice {
  required: boolean;
  duration: string;
  passage?: string;
  readingQuestions?: string[];
  tasks: CurriculumTask[];
  parentSignatureRequired: boolean;
  sourcePage: number;
}

export interface ConversationPractice {
  required: boolean;
  duration: string;
  tasks: CurriculumTask[];
  sourcePage: number;
}

export interface Project {
  id: string;
  projectNumber: number;
  title: string;
  topics: string[];
  requirements: CurriculumTask[];
  assignedWeek: number;
  dueWeek: number;
  sourcePage: number;
}

export interface TestInfo {
  title: string;
  isPreparation?: boolean;
  description?: string;
  sourcePage: number;
}

export interface WeekCurriculum {
  grade: number;
  week: number;
  source: {
    document: string;
    pages: number[];
  };
  classwork: CurriculumTask[];
  homework: CurriculumTask[];
  reading: ReadingPractice;
  conversation: ConversationPractice;
  projectAssigned?: Project;
  projectDue?: Project;
  projectReminder?: Project;
  tests: TestInfo[];
  notes: string[];
}

export interface CurriculumData {
  grade: number;
  totalWeeks: number;
  document: string;
  weeks: WeekCurriculum[];
  projects: Project[];
}
