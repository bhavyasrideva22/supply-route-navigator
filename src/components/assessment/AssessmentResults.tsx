import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AssessmentResults as ResultsType } from '@/types/assessment';
import { 
  Trophy, 
  TrendingUp, 
  Target, 
  BookOpen, 
  Users, 
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Download
} from 'lucide-react';

interface AssessmentResultsProps {
  results: ResultsType;
  onRestart: () => void;
}

export const AssessmentResults = ({ results, onRestart }: AssessmentResultsProps) => {
  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'yes': return 'success';
      case 'maybe': return 'warning';
      case 'no': return 'destructive';
      default: return 'secondary';
    }
  };

  const getRecommendationIcon = (recommendation: string) => {
    switch (recommendation) {
      case 'yes': return <CheckCircle className="w-5 h-5" />;
      case 'maybe': return <AlertCircle className="w-5 h-5" />;
      case 'no': return <AlertCircle className="w-5 h-5" />;
      default: return <Target className="w-5 h-5" />;
    }
  };

  const getRecommendationText = (recommendation: string) => {
    switch (recommendation) {
      case 'yes': return 'Highly Recommended';
      case 'maybe': return 'Consider with Preparation';
      case 'no': return 'Not Recommended Currently';
      default: return 'Assessment Complete';
    }
  };

  return (
    <div className="min-h-screen bg-assessment-bg py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gradient-hero rounded-full">
              <Trophy className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Assessment Complete!</h1>
          <p className="text-lg text-muted-foreground">Your personalized career guidance report</p>
        </div>

        {/* Overall Score */}
        <Card className="mb-8 shadow-floating bg-gradient-card">
          <CardHeader className="text-center">
            <div className="flex justify-center items-center gap-3 mb-2">
              {getRecommendationIcon(results.recommendation)}
              <CardTitle className="text-xl">
                {getRecommendationText(results.recommendation)}
              </CardTitle>
            </div>
            <Badge 
              variant={getRecommendationColor(results.recommendation) as any}
              className="text-lg px-4 py-2"
            >
              {results.overallScore}% Overall Fit
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">{results.psychometricScore}%</div>
                <div className="text-sm text-muted-foreground">Personality Fit</div>
                <Progress value={results.psychometricScore} className="mt-2" />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">{results.technicalScore}%</div>
                <div className="text-sm text-muted-foreground">Technical Skills</div>
                <Progress value={results.technicalScore} className="mt-2" />
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary mb-1">{results.wiscarScore}%</div>
                <div className="text-sm text-muted-foreground">Career Readiness</div>
                <Progress value={results.wiscarScore} className="mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Strengths */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-success">
                <TrendingUp className="w-5 h-5" />
                Your Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {results.strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{strength}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Areas for Improvement */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-warning">
                <Target className="w-5 h-5" />
                Areas to Develop
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {results.improvements.map((improvement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <ArrowRight className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{improvement}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Next Steps */}
        <Card className="mb-8 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              Recommended Next Steps
            </CardTitle>
            <CardDescription>
              Personalized action plan based on your assessment results
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {results.nextSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-4 p-4 rounded-lg bg-accent/50 border">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{step}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Career Matches */}
        <Card className="mb-8 shadow-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Alternative Career Matches
            </CardTitle>
            <CardDescription>
              Other roles that align well with your profile
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {results.careerMatches.map((career, index) => (
                <div key={index} className="p-4 rounded-lg border bg-gradient-card hover:shadow-card transition-all duration-200">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold">{career.title}</h4>
                    <Badge variant="secondary">{career.match}% match</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{career.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {career.requirements.map((req, reqIndex) => (
                      <Badge key={reqIndex} variant="outline" className="text-xs">
                        {req}
                      </Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="outline" onClick={onRestart} className="flex items-center gap-2">
            Retake Assessment
          </Button>
          <Button variant="hero" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Download Report
          </Button>
        </div>
      </div>
    </div>
  );
};