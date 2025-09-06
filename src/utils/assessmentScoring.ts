import { AssessmentResponse, AssessmentResults, WiscarDimension } from '@/types/assessment';
import { assessmentSections, careerAlternatives } from '@/data/assessmentData';

export const calculateResults = (responses: AssessmentResponse[]): AssessmentResults => {
  // Calculate section scores
  const psychometricScore = calculateSectionScore(responses, 'psychometric');
  const technicalScore = calculateSectionScore(responses, 'technical');
  const wiscarScore = calculateWiscarScore(responses);
  
  // Calculate overall score with weights
  const overallScore = Math.round(
    (psychometricScore * 0.25) + 
    (technicalScore * 0.35) + 
    (wiscarScore * 0.40)
  );

  // Determine recommendation
  let recommendation: 'yes' | 'maybe' | 'no';
  if (overallScore >= 75) recommendation = 'yes';
  else if (overallScore >= 60) recommendation = 'maybe';
  else recommendation = 'no';

  // Generate insights
  const strengths = generateStrengths(responses, { psychometricScore, technicalScore, wiscarScore });
  const improvements = generateImprovements(responses, { psychometricScore, technicalScore, wiscarScore });
  const nextSteps = generateNextSteps(recommendation, improvements);

  return {
    psychometricScore,
    technicalScore,
    wiscarScore,
    overallScore,
    recommendation,
    strengths,
    improvements,
    nextSteps,
    careerMatches: careerAlternatives
  };
};

const calculateSectionScore = (responses: AssessmentResponse[], sectionId: string): number => {
  const sectionQuestions = assessmentSections
    .find(section => section.id === sectionId)?.questions || [];
  
  const sectionResponses = responses.filter(response => 
    sectionQuestions.some(q => q.id === response.questionId)
  );

  if (sectionResponses.length === 0) return 0;

  let totalScore = 0;
  let totalWeight = 0;

  sectionResponses.forEach(response => {
    const question = sectionQuestions.find(q => q.id === response.questionId);
    if (!question) return;

    const weight = question.weight || 1;
    let score = 0;

    if (question.type === 'likert') {
      // Likert scale: 1-5 becomes 0-100
      score = ((Number(response.answer) - 1) / 4) * 100;
    } else if (question.type === 'multiple-choice' || question.type === 'scenario') {
      // For MC questions, score based on optimal answer
      score = getMultipleChoiceScore(question.id, response.answer as string);
    }

    totalScore += score * weight;
    totalWeight += weight;
  });

  return Math.round(totalScore / totalWeight);
};

const calculateWiscarScore = (responses: AssessmentResponse[]): number => {
  const wiscarQuestions = assessmentSections
    .find(section => section.id === 'wiscar')?.questions || [];
  
  const wiscarResponses = responses.filter(response => 
    wiscarQuestions.some(q => q.id === response.questionId)
  );

  const dimensions: { [key: string]: number[] } = {};
  
  wiscarResponses.forEach(response => {
    const question = wiscarQuestions.find(q => q.id === response.questionId);
    if (!question) return;

    const construct = question.construct || 'general';
    if (!dimensions[construct]) dimensions[construct] = [];
    
    if (question.type === 'likert') {
      dimensions[construct].push(((Number(response.answer) - 1) / 4) * 100);
    } else {
      dimensions[construct].push(getMultipleChoiceScore(question.id, response.answer as string));
    }
  });

  // Average all dimension scores
  const dimensionAverages = Object.values(dimensions).map(scores => 
    scores.reduce((sum, score) => sum + score, 0) / scores.length
  );

  return Math.round(
    dimensionAverages.reduce((sum, avg) => sum + avg, 0) / dimensionAverages.length
  );
};

const getMultipleChoiceScore = (questionId: string, answer: string): number => {
  // Define optimal answers for specific questions
  const optimalAnswers: { [key: string]: { [answer: string]: number } } = {
    'tech_1': { '16 trucks': 100, '15 trucks': 60, '17 trucks': 60, '18 trucks': 20 },
    'tech_2': { 'Route B - guaranteed but longer': 100, 'Split the delivery across multiple routes': 80, 'Route C - risky but potentially faster': 40, 'Wait for Route A to clear': 20 },
    'tech_3': { 'Extra time added to account for delays': 100, 'Storage time in warehouse': 40, 'Time between order and payment': 20, 'The fastest possible delivery time': 10 },
    'tech_4': { '=IF(urgent,fast_route,standard_route)': 100, '=MIN(delivery_times)': 70, '=SUM(distances)/speed': 50, '=AVERAGE(delivery_times)': 30 },
    'tech_5': { 'A → C → B → D → E': 100, 'C → A → B → E → D': 90, 'A → B → C → D → E': 70, 'B → A → C → E → D': 60 },
    'psych_6': { 'Fast-paced office coordinating shipments': 100, 'Quiet analytical work with data': 80, 'Field work visiting warehouses': 60, 'Creative brainstorming sessions': 30 },
    'wiscar_6': { 'Exciting - I love dynamic problem-solving': 100, 'Manageable with good systems': 80, 'Stressful but doable': 50, 'Overwhelming and chaotic': 20 }
  };

  return optimalAnswers[questionId]?.[answer] || 50; // Default to 50% if not specified
};

const generateStrengths = (responses: AssessmentResponse[], scores: any): string[] => {
  const strengths: string[] = [];
  
  if (scores.psychometricScore >= 80) {
    strengths.push('Strong personality fit for logistics planning roles');
  }
  if (scores.technicalScore >= 80) {
    strengths.push('Excellent analytical and technical problem-solving abilities');
  }
  if (scores.wiscarScore >= 80) {
    strengths.push('High career readiness and motivation');
  }

  // Check specific question responses for detailed strengths
  const highMotivationResponse = responses.find(r => r.questionId === 'wiscar_1' && Number(r.answer) >= 4);
  if (highMotivationResponse) {
    strengths.push('Strong motivation and commitment to logistics career');
  }

  const planningResponse = responses.find(r => r.questionId === 'psych_1' && Number(r.answer) >= 4);
  if (planningResponse) {
    strengths.push('Natural planning and organizational mindset');
  }

  const pressureResponse = responses.find(r => r.questionId === 'psych_2' && Number(r.answer) >= 4);
  if (pressureResponse) {
    strengths.push('Ability to work effectively under pressure');
  }

  return strengths.length > 0 ? strengths : ['Completed comprehensive assessment', 'Demonstrates interest in logistics field'];
};

const generateImprovements = (responses: AssessmentResponse[], scores: any): string[] => {
  const improvements: string[] = [];
  
  if (scores.technicalScore < 70) {
    improvements.push('Develop technical skills in Excel, data analysis, and logistics software');
  }
  if (scores.psychometricScore < 70) {
    improvements.push('Build comfort with structured, detail-oriented work environments');
  }
  if (scores.wiscarScore < 70) {
    improvements.push('Gain more exposure to logistics and supply chain concepts');
  }

  // Check for specific skill gaps
  const toolResponse = responses.find(r => r.questionId === 'tech_4');
  if (toolResponse && getMultipleChoiceScore('tech_4', toolResponse.answer as string) < 80) {
    improvements.push('Strengthen Excel and analytical tool proficiency');
  }

  const domainResponse = responses.find(r => r.questionId === 'tech_3');
  if (domainResponse && getMultipleChoiceScore('tech_3', domainResponse.answer as string) < 80) {
    improvements.push('Build foundational supply chain and logistics knowledge');
  }

  return improvements.length > 0 ? improvements : ['Continue developing relevant skills and experience'];
};

const generateNextSteps = (recommendation: string, improvements: string[]): string[] => {
  const baseSteps = [
    'Take an introductory course in Supply Chain Management or Logistics',
    'Develop Excel skills with focus on data analysis and optimization',
    'Explore logistics software and tools (SAP, TMS systems)',
    'Consider internships or entry-level positions in operations'
  ];

  if (recommendation === 'yes') {
    return [
      'Enroll in a logistics or supply chain certification program',
      'Start building experience with Excel and data analysis',
      'Network with logistics professionals on LinkedIn',
      'Apply for logistics coordinator or analyst positions'
    ];
  } else if (recommendation === 'maybe') {
    return [
      'Focus on strengthening identified skill gaps',
      'Take online courses to build technical competencies',
      'Gain practical experience through projects or internships',
      'Retake this assessment in 3-6 months to track progress'
    ];
  } else {
    return [
      'Consider alternative careers in operations or business analysis',
      'Develop foundational business and analytical skills',
      'Explore related fields that match your strengths better',
      'Focus on roles that leverage your natural talents and interests'
    ];
  }
};