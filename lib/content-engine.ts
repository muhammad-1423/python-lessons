import { analyzeBusinessGoal } from '@/lib/intent-engine';
import type { AutoContent, BuilderInput } from '@/lib/types';

const ctaByGoal: Record<string, string> = {
  'Get clients': 'Book a consultation',
  'Sell products': 'Shop best sellers',
  'Build personal brand': 'Follow the journey',
  'Get bookings': 'Check availability',
  'Build a community': 'Join the community',
  'Launch a startup': 'Join the waitlist',
  'Collect leads': 'Get the free guide',
  'Showcase portfolio': 'View the work'
};

export function generateAutoContent(input: BuilderInput): AutoContent {
  const analysis = analyzeBusinessGoal(input);
  const audience = input.audience || 'your ideal audience';
  const offer = input.offer || `a ${input.projectType.toLowerCase()} designed to ${input.goal.toLowerCase()}`;
  const company = input.companyName || input.projectName || 'Your brand';
  const primaryCta = input.primaryAction || ctaByGoal[input.goal] || 'Get started';
  const features = analysis.recommendedFeatures.slice(0, 6).map((feature) => ({
    title: feature,
    description: `${feature} is included because it supports ${analysis.primaryMetric} and keeps the experience aligned with your ${input.goal.toLowerCase()} goal.`
  }));

  return {
    headline: `${company} helps ${audience} ${input.goal.toLowerCase()}`,
    subheadline: `${offer} with a ${input.style.toLowerCase()} experience built around ${analysis.funnelStrategy}.`,
    primaryCta,
    secondaryCta: 'See how it works',
    featureBlurbs: features,
    faq: [
      { question: `How does this help me ${input.goal.toLowerCase()}?`, answer: `The structure prioritizes ${analysis.conversionPriorities.join(', ').toLowerCase()} so every page supports ${analysis.primaryMetric}.` },
      { question: 'Can I change the content later?', answer: 'Yes. The blueprint separates strategy, content, pages, and components so each layer can be edited independently.' },
      { question: 'What should I launch first?', answer: `Start with ${analysis.recommendedPages.slice(0, 3).join(', ')} and add deeper flows after validating demand.` }
    ],
    seo: {
      title: `${company} | ${input.goal} with ${input.projectType}`,
      description: `${company} gives ${audience} ${offer}. Built to optimize ${analysis.primaryMetric}.`,
      keywords: [input.goal, input.projectType, company, ...analysis.recommendedFeatures.slice(0, 3)]
    },
    pricing: [
      { name: 'Starter', description: 'Validate the offer and capture early demand.', cta: primaryCta },
      { name: 'Growth', description: 'Add automation, analytics, and stronger conversion paths.', cta: 'Choose Growth' },
      { name: 'Scale', description: 'Support teams, custom workflows, and higher-volume operations.', cta: 'Talk to sales' }
    ],
    testimonialPrompts: analysis.trustSignals.map((signal) => `Ask customers for a quote about your ${signal}.`)
  };
}
