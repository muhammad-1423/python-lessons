import type { BusinessOptimization, ProjectBlueprint } from '@/lib/types';

export function optimizeBusinessBlueprint(blueprint: Omit<ProjectBlueprint, 'optimizer'>): BusinessOptimization {
  const hasPricing = blueprint.pages.some((page) => page.name.toLowerCase().includes('pricing'));
  const hasProof = blueprint.analysis.trustSignals.length > 0;
  const hasSpecificCta = blueprint.content.primaryCta.length > 3 && blueprint.content.primaryCta !== 'Get started';
  const score = 70 + (hasPricing ? 8 : 0) + (hasProof ? 10 : 0) + (hasSpecificCta ? 7 : 0) + Math.min(5, blueprint.content.featureBlurbs.length);

  return {
    score: Math.min(score, 100),
    ctaQuality: hasSpecificCta ? 'specific and intent-aligned' : 'needs a more specific action verb',
    sectionOrder: ['Hero', 'Problem', 'Outcome', 'Proof', 'Features', 'Pricing or offer', 'FAQ', 'Final CTA'],
    seoStrength: blueprint.content.seo.keywords.length >= 5 ? 'strong keyword coverage for initial launch' : 'needs more keyword coverage',
    trustSignalPlan: blueprint.analysis.trustSignals.map((signal) => `Place ${signal} near a CTA or decision point.`),
    recommendations: [
      `Optimize every page for ${blueprint.analysis.primaryMetric}.`,
      'Move proof higher on pages with purchase or booking CTAs.',
      'Use one primary CTA label consistently across the experience.',
      ...blueprint.competitor.gapsToBeat.slice(0, 2)
    ]
  };
}
