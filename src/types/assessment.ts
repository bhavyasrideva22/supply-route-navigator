export interface Question {
  id: string;
  section: string;
  type: 'multiple-choice' | 'likert' | 'scenario' | 'matching';
  question: string;
  options?: string[];
  construct?: string;
  weight?: number;
}

export interface AssessmentSection {
  id: string;
  title: string;
  description: string;
  icon: string;
  questions: Question[];
  timeEstimate: number;
}

export interface AssessmentResponse {
  questionId: string;
  answer: string | number;
  timeSpent?: number;
}

export interface AssessmentResults {
  psychometricScore: number;
  technicalScore: number;
  wiscarScore: number;
  overallScore: number;
  recommendation: 'yes' | 'maybe' | 'no';
  strengths: string[];
  improvements: string[];
  nextSteps: string[];
  careerMatches: CareerMatch[];
}

export interface CareerMatch {
  title: string;
  match: number;
  description: string;
  requirements: string[];
}

export interface WiscarDimension {
  dimension: string;
  score: number;
  description: string;
}