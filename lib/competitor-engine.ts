import type { BuilderInput, CompetitorIntelligence } from '@/lib/types';

function hostname(url?: string) {
  if (!url) return undefined;
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url.replace(/^https?:\/\//, '').split('/')[0];
  }
}

export function analyzeCompetitor(input: BuilderInput): CompetitorIntelligence {
  const host = hostname(input.competitorUrl);
  const category = input.projectType || 'Business Website';
  const hasCompetitor = Boolean(host);

  return {
    url: host,
    detectedCategory: hasCompetitor ? `${category} competitor pattern from ${host}` : `${category} market baseline`,
    likelyStrengths: hasCompetitor
      ? ['clear above-the-fold positioning', 'familiar navigation model', 'established trust cues']
      : ['standard category expectations', 'familiar layout conventions', 'proven conversion sections'],
    gapsToBeat: [
      'make the business outcome clearer in the hero',
      'reduce unnecessary navigation choices',
      'add stronger proof near every conversion point',
      'personalize sections around the selected goal instead of generic content'
    ],
    differentiationStrategy: [
      `lead with ${input.goal.toLowerCase()} rather than generic product claims`,
      `speak directly to ${input.audience || 'the target audience'}`,
      'pair every feature with a measurable business reason',
      'use a more guided CTA path with fewer dead ends'
    ],
    layoutRecommendations: ['intent-led hero', 'problem-to-outcome section', 'proof band', 'feature-to-metric grid', 'FAQ objection handling', 'final CTA']
  };
}
