import { AssessmentSection } from '@/types/assessment';

export const assessmentSections: AssessmentSection[] = [
  {
    id: 'psychometric',
    title: 'Personality & Motivation',
    description: 'Evaluate your personality fit, interests, and motivation for logistics planning',
    icon: 'Brain',
    timeEstimate: 8,
    questions: [
      {
        id: 'psych_1',
        section: 'psychometric',
        type: 'likert',
        question: 'I enjoy planning things weeks or months in advance',
        construct: 'conscientiousness',
        weight: 1.2
      },
      {
        id: 'psych_2',
        section: 'psychometric',
        type: 'likert',
        question: 'I work well under tight deadlines and pressure',
        construct: 'emotional_stability',
        weight: 1.1
      },
      {
        id: 'psych_3',
        section: 'psychometric',
        type: 'likert',
        question: 'I find coordination and logistics fascinating',
        construct: 'interest',
        weight: 1.3
      },
      {
        id: 'psych_4',
        section: 'psychometric',
        type: 'likert',
        question: 'I prefer tasks with clear, repeatable processes',
        construct: 'structure_preference',
        weight: 1.0
      },
      {
        id: 'psych_5',
        section: 'psychometric',
        type: 'likert',
        question: 'I continue working even when facing setbacks',
        construct: 'grit',
        weight: 1.2
      },
      {
        id: 'psych_6',
        section: 'psychometric',
        type: 'multiple-choice',
        question: 'Which work environment appeals to you most?',
        options: [
          'Fast-paced office coordinating shipments',
          'Quiet analytical work with data',
          'Field work visiting warehouses',
          'Creative brainstorming sessions'
        ],
        construct: 'work_environment',
        weight: 1.0
      }
    ]
  },
  {
    id: 'technical',
    title: 'Technical & Analytical Skills',
    description: 'Test your numerical, logical, and domain-specific knowledge',
    icon: 'Calculator',
    timeEstimate: 12,
    questions: [
      {
        id: 'tech_1',
        section: 'technical',
        type: 'multiple-choice',
        question: 'A truck can carry 500kg. How many trucks are needed to transport 8,000kg?',
        options: ['15 trucks', '16 trucks', '17 trucks', '18 trucks'],
        construct: 'numerical_ability',
        weight: 1.1
      },
      {
        id: 'tech_2',
        section: 'technical',
        type: 'scenario',
        question: 'Route A is blocked due to construction. Your delivery must arrive by 3 PM. Route B takes 20% longer but is guaranteed. Route C is 10% faster but has 30% chance of delays. Which do you choose?',
        options: [
          'Route B - guaranteed but longer',
          'Route C - risky but potentially faster',
          'Wait for Route A to clear',
          'Split the delivery across multiple routes'
        ],
        construct: 'logical_reasoning',
        weight: 1.3
      },
      {
        id: 'tech_3',
        section: 'technical',
        type: 'multiple-choice',
        question: 'What is a "lead time buffer" in supply chain management?',
        options: [
          'Extra time added to account for delays',
          'The fastest possible delivery time',
          'Time between order and payment',
          'Storage time in warehouse'
        ],
        construct: 'domain_knowledge',
        weight: 1.2
      },
      {
        id: 'tech_4',
        section: 'technical',
        type: 'multiple-choice',
        question: 'Which Excel formula would best calculate optimal delivery times?',
        options: [
          '=MIN(delivery_times)',
          '=AVERAGE(delivery_times)',
          '=IF(urgent,fast_route,standard_route)',
          '=SUM(distances)/speed'
        ],
        construct: 'tool_familiarity',
        weight: 1.0
      },
      {
        id: 'tech_5',
        section: 'technical',
        type: 'scenario',
        question: 'You need to optimize deliveries across 5 zones (A-E). Zone C has a 2-hour time window. Which sequence minimizes total travel time?',
        options: [
          'A → B → C → D → E',
          'A → C → B → D → E',
          'B → A → C → E → D',
          'C → A → B → E → D'
        ],
        construct: 'spatial_planning',
        weight: 1.2
      }
    ]
  },
  {
    id: 'wiscar',
    title: 'Career Readiness (WISCAR)',
    description: 'Assess your readiness across 6 key dimensions for career success',
    icon: 'Target',
    timeEstimate: 10,
    questions: [
      {
        id: 'wiscar_1',
        section: 'wiscar',
        type: 'likert',
        question: 'I am highly motivated to build a career in logistics planning',
        construct: 'will',
        weight: 1.3
      },
      {
        id: 'wiscar_2',
        section: 'wiscar',
        type: 'likert',
        question: 'I find supply chains and delivery networks fascinating',
        construct: 'interest',
        weight: 1.2
      },
      {
        id: 'wiscar_3',
        section: 'wiscar',
        type: 'likert',
        question: 'I have experience with planning or coordination tasks',
        construct: 'skill',
        weight: 1.1
      },
      {
        id: 'wiscar_4',
        section: 'wiscar',
        type: 'likert',
        question: 'I can solve complex problems with multiple constraints',
        construct: 'cognitive_readiness',
        weight: 1.2
      },
      {
        id: 'wiscar_5',
        section: 'wiscar',
        type: 'likert',
        question: 'I actively seek feedback to improve my performance',
        construct: 'ability_to_learn',
        weight: 1.1
      },
      {
        id: 'wiscar_6',
        section: 'wiscar',
        type: 'multiple-choice',
        question: 'How do you feel about adjusting delivery schedules daily based on real-time changes?',
        options: [
          'Exciting - I love dynamic problem-solving',
          'Manageable with good systems',
          'Stressful but doable',
          'Overwhelming and chaotic'
        ],
        construct: 'real_world_fit',
        weight: 1.3
      }
    ]
  }
];

export const careerAlternatives = [
  {
    title: 'Inventory Analyst',
    description: 'Detail-oriented role with less coordination complexity',
    match: 85,
    requirements: ['Excel proficiency', 'Attention to detail', 'Basic supply chain knowledge']
  },
  {
    title: 'Transportation Coordinator',
    description: 'Manage vehicle dispatch and routing operations',
    match: 90,
    requirements: ['Route optimization', 'Carrier management', 'Coordination skills']
  },
  {
    title: 'Supply Chain Analyst',
    description: 'Broader role covering logistics and forecasting',
    match: 95,
    requirements: ['Data analysis', 'Process understanding', 'Forecasting']
  },
  {
    title: 'Operations Assistant',
    description: 'Support role with growth potential',
    match: 75,
    requirements: ['Communication skills', 'Basic analytics', 'Process orientation']
  }
];