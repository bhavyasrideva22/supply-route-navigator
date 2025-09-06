import { useState } from 'react';
import { AssessmentIntro } from './AssessmentIntro';
import { QuestionCard } from './QuestionCard';
import { ProgressIndicator } from './ProgressIndicator';
import { AssessmentResults } from './AssessmentResults';
import { assessmentSections } from '@/data/assessmentData';
import { AssessmentResponse, Question } from '@/types/assessment';
import { calculateResults } from '@/utils/assessmentScoring';

type AssessmentState = 'intro' | 'taking' | 'results';

export const Assessment = () => {
  const [state, setState] = useState<AssessmentState>('intro');
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<AssessmentResponse[]>([]);
  const [results, setResults] = useState(null);

  // Flatten all questions for easier navigation
  const allQuestions: Question[] = assessmentSections.flatMap(section => section.questions);
  const sectionTitles = assessmentSections.map(section => section.title);
  
  const currentQuestion = allQuestions[currentQuestionIndex];
  const totalQuestions = allQuestions.length;

  // Calculate current section based on question index
  let questionsPassedSections = 0;
  let calculatedSectionIndex = 0;
  
  for (let i = 0; i < assessmentSections.length; i++) {
    const sectionQuestionCount = assessmentSections[i].questions.length;
    if (currentQuestionIndex < questionsPassedSections + sectionQuestionCount) {
      calculatedSectionIndex = i;
      break;
    }
    questionsPassedSections += sectionQuestionCount;
  }

  const handleStart = () => {
    setState('taking');
    setCurrentSectionIndex(0);
    setCurrentQuestionIndex(0);
    setResponses([]);
  };

  const handleAnswer = (answer: string | number) => {
    const newResponse: AssessmentResponse = {
      questionId: currentQuestion.id,
      answer,
      timeSpent: 0 // Could implement time tracking
    };

    setResponses(prev => {
      const filtered = prev.filter(r => r.questionId !== currentQuestion.id);
      return [...filtered, newResponse];
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      const newQuestionIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(newQuestionIndex);
      
      // Update section index
      let newSectionIndex = 0;
      let questionsCount = 0;
      for (let i = 0; i < assessmentSections.length; i++) {
        questionsCount += assessmentSections[i].questions.length;
        if (newQuestionIndex < questionsCount) {
          newSectionIndex = i;
          break;
        }
      }
      setCurrentSectionIndex(newSectionIndex);
    } else {
      // Assessment complete, calculate results
      const assessmentResults = calculateResults(responses);
      setResults(assessmentResults);
      setState('results');
    }
  };

  const handleRestart = () => {
    setState('intro');
    setCurrentSectionIndex(0);
    setCurrentQuestionIndex(0);
    setResponses([]);
    setResults(null);
  };

  const getCurrentAnswer = () => {
    const response = responses.find(r => r.questionId === currentQuestion?.id);
    return response?.answer;
  };

  const getQuestionsInCurrentSection = () => {
    return assessmentSections[calculatedSectionIndex]?.questions.length || 0;
  };

  const getCurrentQuestionInSection = () => {
    let questionsPassedSections = 0;
    for (let i = 0; i < calculatedSectionIndex; i++) {
      questionsPassedSections += assessmentSections[i].questions.length;
    }
    return currentQuestionIndex - questionsPassedSections + 1;
  };

  if (state === 'intro') {
    return <AssessmentIntro onStart={handleStart} />;
  }

  if (state === 'results' && results) {
    return <AssessmentResults results={results} onRestart={handleRestart} />;
  }

  if (state === 'taking' && currentQuestion) {
    return (
      <div className="min-h-screen bg-assessment-bg">
        <ProgressIndicator
          currentSection={calculatedSectionIndex + 1}
          totalSections={assessmentSections.length}
          currentQuestion={getCurrentQuestionInSection()}
          totalQuestions={getQuestionsInCurrentSection()}
          sectionTitles={sectionTitles}
        />
        
        <div className="max-w-3xl mx-auto p-6 pt-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-2">
              {assessmentSections[calculatedSectionIndex]?.title}
            </h2>
            <p className="text-muted-foreground">
              {assessmentSections[calculatedSectionIndex]?.description}
            </p>
          </div>

          <QuestionCard
            question={currentQuestion}
            currentAnswer={getCurrentAnswer()}
            onAnswer={handleAnswer}
            isLast={currentQuestionIndex === totalQuestions - 1}
            onNext={handleNext}
          />
        </div>
      </div>
    );
  }

  return null;
};