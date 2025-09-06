import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Truck, Clock, Target, Brain, Calculator } from 'lucide-react';

interface AssessmentIntroProps {
  onStart: () => void;
}

export const AssessmentIntro = ({ onStart }: AssessmentIntroProps) => {
  return (
    <div className="min-h-screen bg-assessment-bg py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-gradient-hero rounded-full">
              <Truck className="w-12 h-12 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
            Should I Become a Logistics Planner?
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            AI-Powered Career Readiness & Fit Assessment System
          </p>
          <div className="flex justify-center items-center gap-2 mt-4">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">20-30 minutes</span>
          </div>
        </div>

        {/* What is Logistics Planning */}
        <Card className="mb-8 shadow-card bg-gradient-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              What Is Logistics Planning?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Logistics Planners coordinate the movement of goods, materials, and services across supply chains. 
              They ensure the right items are delivered on time, in the right quantity, to the right location, 
              with optimal cost and minimal disruption.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold mb-2">Common Job Titles:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Logistics Planner</li>
                  <li>• Supply Chain Coordinator</li>
                  <li>• Transportation Scheduler</li>
                  <li>• Freight Operations Analyst</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Key Success Traits:</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Attention to detail</li>
                  <li>• Analytical thinking</li>
                  <li>• Planning & coordination</li>
                  <li>• Resilience under pressure</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Assessment Sections */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-card hover:shadow-floating transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Brain className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Personality & Motivation</CardTitle>
                  <Badge variant="secondary" className="mt-1">8 min</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Evaluate your personality fit, interests, and motivation for logistics planning careers.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-floating transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Calculator className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">Technical Skills</CardTitle>
                  <Badge variant="secondary" className="mt-1">12 min</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Test your numerical, logical, and domain-specific knowledge for logistics roles.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="shadow-card hover:shadow-floating transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Target className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-lg">WISCAR Analysis</CardTitle>
                  <Badge variant="secondary" className="mt-1">10 min</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Assess your readiness across 6 key dimensions: Will, Interest, Skill, Cognitive, Ability, Real-world fit.
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* What You'll Get */}
        <Card className="mb-8 shadow-card">
          <CardHeader>
            <CardTitle>What You'll Receive</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold">Career Fit Score</h4>
                    <p className="text-sm text-muted-foreground">Overall compatibility rating with detailed breakdown</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold">Strengths & Improvements</h4>
                    <p className="text-sm text-muted-foreground">Your top strengths and areas for development</p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold">Personalized Learning Path</h4>
                    <p className="text-sm text-muted-foreground">Custom recommendations for skill development</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <h4 className="font-semibold">Alternative Career Matches</h4>
                    <p className="text-sm text-muted-foreground">Related roles that align with your profile</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Start Button */}
        <div className="text-center">
          <Button 
            onClick={onStart}
            size="lg"
            variant="hero"
            className="text-lg px-8 py-6 h-auto"
          >
            Start Assessment
          </Button>
          <p className="text-sm text-muted-foreground mt-2">
            No registration required • Results available immediately
          </p>
        </div>
      </div>
    </div>
  );
};