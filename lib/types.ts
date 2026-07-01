export type BuilderInput = {
  goal: string;
  projectType: string;
  style: string;
  color: string;
  features: string[];
  navigation: string[];
  projectName: string;
  companyName: string;
  tagline: string;
  generateContent: boolean;
  audience?: string;
  offer?: string;
  primaryAction?: string;
  proofAssets?: string[];
  competitorUrl?: string;
  memoryProfileId?: string;
  evolveFromProjectId?: string;
  evolutionTarget?: string;
};

export type BusinessGoalAnalysis = {
  goal: string;
  primaryMetric: string;
  funnelStrategy: string;
  recommendedPages: string[];
  recommendedFeatures: string[];
  conversionPriorities: string[];
  trustSignals: string[];
  contentAngle: string;
};

export type SmartQuestion = {
  id: keyof BuilderInput | 'proofAssetsText';
  step: string;
  question: string;
  helpText: string;
  inputType: 'choice' | 'multi-choice' | 'text' | 'textarea';
  options?: string[];
};

export type AutoContent = {
  headline: string;
  subheadline: string;
  primaryCta: string;
  secondaryCta: string;
  featureBlurbs: { title: string; description: string }[];
  faq: { question: string; answer: string }[];
  seo: { title: string; description: string; keywords: string[] };
  pricing: { name: string; description: string; cta: string }[];
  testimonialPrompts: string[];
};

export type CompetitorIntelligence = {
  url?: string;
  detectedCategory: string;
  likelyStrengths: string[];
  gapsToBeat: string[];
  differentiationStrategy: string[];
  layoutRecommendations: string[];
};

export type MemoryProfile = {
  id: string;
  preferredStyle: string;
  preferredColor: string;
  commonFeatures: string[];
  lastGoals: string[];
  brandTone: string;
};

export type BusinessOptimization = {
  score: number;
  ctaQuality: string;
  sectionOrder: string[];
  seoStrength: string;
  trustSignalPlan: string[];
  recommendations: string[];
};

export type EvolutionPlan = {
  from: string;
  to: string;
  phases: { name: string; description: string; features: string[] }[];
  dataModelChanges: string[];
  riskNotes: string[];
};

export type ProjectBlueprint = {
  summary: string;
  analysis: BusinessGoalAnalysis;
  content: AutoContent;
  competitor: CompetitorIntelligence;
  memory: MemoryProfile;
  optimizer: BusinessOptimization;
  evolution: EvolutionPlan;
  pages: { name: string; sections: string[] }[];
  brand: { primary: string; secondary: string; font: string; tone: string };
  components: string[];
  database: string[];
  launchChecklist: string[];
};
