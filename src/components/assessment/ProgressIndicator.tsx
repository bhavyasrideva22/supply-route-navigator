import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

interface ProgressIndicatorProps {
  currentSection: number;
  totalSections: number;
  currentQuestion: number;
  totalQuestions: number;
  sectionTitles: string[];
}

export const ProgressIndicator = ({ 
  currentSection, 
  totalSections, 
  currentQuestion, 
  totalQuestions,
  sectionTitles 
}: ProgressIndicatorProps) => {
  const overallProgress = ((currentSection - 1) * 100 + (currentQuestion / totalQuestions * 100)) / totalSections;
  
  return (
    <div className="bg-white/80 backdrop-blur-sm border-b border-border/50 sticky top-0 z-10">
      <div className="max-w-4xl mx-auto p-4">
        {/* Section Progress */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            {sectionTitles.map((title, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                  index + 1 < currentSection 
                    ? 'bg-success text-success-foreground' 
                    : index + 1 === currentSection 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                }`}>
                  {index + 1 < currentSection ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span className={`text-sm font-medium hidden sm:inline ${
                  index + 1 === currentSection ? 'text-primary' : 'text-muted-foreground'
                }`}>
                  {title}
                </span>
                {index < sectionTitles.length - 1 && (
                  <div className="w-8 h-px bg-border hidden md:block ml-2" />
                )}
              </div>
            ))}
          </div>
          <Badge variant="secondary" className="text-xs">
            {currentQuestion} of {totalQuestions}
          </Badge>
        </div>

        {/* Overall Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Overall Progress</span>
            <span className="text-sm text-muted-foreground">{Math.round(overallProgress)}%</span>
          </div>
          <Progress value={overallProgress} className="h-2" />
        </div>
      </div>
    </div>
  );
};