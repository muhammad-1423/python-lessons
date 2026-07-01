import { featureOptions, goals, projectTypes, styles } from '@/lib/builder-data';
import { analyzeBusinessGoal } from '@/lib/intent-engine';
import type { BuilderInput, SmartQuestion } from '@/lib/types';

export function getSmartQuestions(input: BuilderInput): SmartQuestion[] {
  const analysis = analyzeBusinessGoal(input);
  return [
    {
      id: 'goal',
      step: 'Intent',
      question: 'Why are you building this?',
      helpText: 'Codable optimizes structure, CTAs, pages, and content around the business outcome first.',
      inputType: 'choice',
      options: [...goals]
    },
    {
      id: 'audience',
      step: 'Audience',
      question: `Who must take action for you to ${input.goal.toLowerCase()}?`,
      helpText: `Primary metric: ${analysis.primaryMetric}. Be specific about the buyer, user, client, or community member.`,
      inputType: 'text'
    },
    {
      id: 'offer',
      step: 'Offer',
      question: 'What are you offering them?',
      helpText: 'This becomes the core promise behind the hero, sections, features, and pricing language.',
      inputType: 'textarea'
    },
    {
      id: 'primaryAction',
      step: 'Action',
      question: 'What is the single most important action they should take?',
      helpText: `Recommended for this goal: ${analysis.conversionPriorities[0]}.`,
      inputType: 'choice',
      options: ['Book a call', 'Start free', 'Buy now', 'Join waitlist', 'Subscribe', 'Contact us', 'Create account']
    },
    {
      id: 'projectType',
      step: 'Product',
      question: 'What should Codable build first?',
      helpText: 'The first build can later evolve into a larger SaaS app, marketplace, CRM, or community.',
      inputType: 'choice',
      options: [...projectTypes]
    },
    {
      id: 'style',
      step: 'Brand feel',
      question: 'What should the product feel like?',
      helpText: 'The style influences tone, typography, spacing, and section density.',
      inputType: 'choice',
      options: [...styles]
    },
    {
      id: 'features',
      step: 'Capabilities',
      question: 'Which capabilities does this product need?',
      helpText: `Based on your intent, consider: ${analysis.recommendedFeatures.join(', ')}.`,
      inputType: 'multi-choice',
      options: [...featureOptions]
    },
    {
      id: 'navigation',
      step: 'Structure',
      question: 'Which pages or sections should be included?',
      helpText: `Recommended structure: ${analysis.recommendedPages.join(', ')}.`,
      inputType: 'textarea'
    },
    {
      id: 'proofAssetsText',
      step: 'Trust',
      question: 'What proof do you already have?',
      helpText: `Strong trust signals for this goal: ${analysis.trustSignals.join(', ')}.`,
      inputType: 'textarea'
    },
    {
      id: 'competitorUrl',
      step: 'Competitor',
      question: 'Which competitor should Codable learn from?',
      helpText: 'Add a URL so the blueprint can identify common strengths, gaps to beat, and a differentiation strategy.',
      inputType: 'text'
    },
    {
      id: 'evolutionTarget',
      step: 'Evolution',
      question: 'What should this evolve into next?',
      helpText: 'Codable plans the path from the first version into a larger product without overbuilding today.',
      inputType: 'choice',
      options: ['SaaS App', 'Marketplace', 'CRM', 'Booking System', 'Community', 'Dashboard']
    },
    {
      id: 'projectName',
      step: 'Branding',
      question: 'What is the project called?',
      helpText: 'Codable uses this across generated content, SEO titles, and dashboard records.',
      inputType: 'text'
    }
  ];
}
