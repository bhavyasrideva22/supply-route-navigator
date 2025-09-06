import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Question } from '@/types/assessment';
import { useState } from 'react';

interface QuestionCardProps {
  question: Question;
  currentAnswer?: string | number;
  onAnswer: (answer: string | number) => void;
  isLast?: boolean;
  onNext: () => void;
}

export const QuestionCard = ({ question, currentAnswer, onAnswer, isLast, onNext }: QuestionCardProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | number>(currentAnswer || '');

  const handleAnswerChange = (value: string | number) => {
    setSelectedAnswer(value);
    onAnswer(value);
  };

  const renderLikertScale = () => {
    const labels = ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'];
    return (
      <div className="space-y-4">
        <RadioGroup 
          value={selectedAnswer.toString()} 
          onValueChange={(value) => handleAnswerChange(parseInt(value))}
          className="space-y-3"
        >
          {labels.map((label, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors">
              <RadioGroupItem value={(index + 1).toString()} id={`option-${index}`} />
              <Label 
                htmlFor={`option-${index}`} 
                className="flex-1 cursor-pointer text-sm"
              >
                <span className="font-medium">{index + 1}</span> - {label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    );
  };

  const renderMultipleChoice = () => {
    return (
      <div className="space-y-3">
        <RadioGroup 
          value={selectedAnswer.toString()} 
          onValueChange={handleAnswerChange}
          className="space-y-3"
        >
          {question.options?.map((option, index) => (
            <div key={index} className="flex items-start space-x-3 p-4 rounded-lg hover:bg-accent transition-colors border border-border/50">
              <RadioGroupItem value={option} id={`option-${index}`} className="mt-1" />
              <Label 
                htmlFor={`option-${index}`} 
                className="flex-1 cursor-pointer text-sm leading-relaxed"
              >
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    );
  };

  const renderScenario = () => {
    return (
      <div className="space-y-4">
        <div className="p-4 bg-accent/50 rounded-lg border-l-4 border-primary">
          <p className="text-sm leading-relaxed">{question.question}</p>
        </div>
        <RadioGroup 
          value={selectedAnswer.toString()} 
          onValueChange={handleAnswerChange}
          className="space-y-3"
        >
          {question.options?.map((option, index) => (
            <div key={index} className="flex items-start space-x-3 p-4 rounded-lg hover:bg-accent transition-colors border border-border/50">
              <RadioGroupItem value={option} id={`option-${index}`} className="mt-1" />
              <Label 
                htmlFor={`option-${index}`} 
                className="flex-1 cursor-pointer text-sm leading-relaxed"
              >
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    );
  };

  const renderQuestion = () => {
    switch (question.type) {
      case 'likert':
        return renderLikertScale();
      case 'multiple-choice':
        return renderMultipleChoice();
      case 'scenario':
        return renderScenario();
      default:
        return renderMultipleChoice();
    }
  };

  return (
    <Card className="shadow-card bg-gradient-card">
      <CardHeader>
        <CardTitle className="text-lg leading-relaxed">
          {question.type !== 'scenario' ? question.question : 'Scenario-Based Question'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {renderQuestion()}
        
        <div className="flex justify-end pt-4">
          <Button 
            onClick={onNext}
            disabled={!selectedAnswer}
            variant="assessment"
            className="min-w-[120px]"
          >
            {isLast ? 'Finish' : 'Next'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};