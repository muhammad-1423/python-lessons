import { analyzeCompetitor } from '@/lib/competitor-engine';
import { generateAutoContent } from '@/lib/content-engine';
import { createEvolutionPlan } from '@/lib/evolution-engine';
import { analyzeBusinessGoal } from '@/lib/intent-engine';
import { applyMemoryDefaults, getMemoryProfile } from '@/lib/memory-engine';
import { optimizeBusinessBlueprint } from '@/lib/optimizer-engine';
import type { BuilderInput, ProjectBlueprint } from '@/lib/types';

const sectionByPage: Record<string, string[]> = {
  home: ['Hero', 'Audience pain', 'Benefits', 'Trust signals', 'Primary CTA'],
  pricing: ['Plan comparison', 'Credit usage', 'ROI proof', 'Billing FAQ'],
  features: ['Feature grid', 'Use cases', 'Integrations', 'CTA'],
  services: ['Service outcomes', 'Process', 'Proof', 'Inquiry CTA'],
  contact: ['Contact form', 'Response promise', 'Trust proof'],
  dashboard: ['Workspace overview', 'Usage metrics', 'Saved projects', 'Team activity'],
  shop: ['Product grid', 'Filters', 'Reviews', 'Checkout CTA'],
  community: ['Member promise', 'Events', 'Member stories', 'Join CTA']
};

export function createProjectBlueprint(rawInput: BuilderInput): ProjectBlueprint {
  const input = applyMemoryDefaults(rawInput);
  const analysis = analyzeBusinessGoal(input);
  const content = generateAutoContent(input);
  const competitor = analyzeCompetitor(input);
  const memory = getMemoryProfile(input);
  const evolution = createEvolutionPlan(input);
  const nav = Array.from(new Set([...input.navigation, ...analysis.recommendedPages])).slice(0, 7);
  const pages = nav.map((name) => {
    const key = name.toLowerCase();
    return {
      name,
      sections: sectionByPage[key] ?? ['Hero', 'Value proposition', 'Feature proof', 'Trust signals', content.primaryCta]
    };
  });

  const baseBlueprint = {
    summary: `${input.companyName || input.projectName} is a ${input.style.toLowerCase()} ${input.projectType.toLowerCase()} optimized for ${analysis.primaryMetric}.`,
    analysis,
    content,
    competitor,
    memory,
    evolution,
    pages,
    brand: {
      primary: input.color,
      secondary: '#2DD4BF',
      font: 'Inter',
      tone: memory.brandTone
    },
    components: ['App shell', 'Responsive navigation', 'Conversion hero', 'Content sections', ...analysis.recommendedFeatures],
    database: ['users', 'projects', 'project_versions', 'subscriptions', 'domains', 'usage_events', 'teams'],
    launchChecklist: ['Validate goal analysis', 'Review generated content', 'Review competitor gaps', 'Check optimizer recommendations', 'Connect Supabase auth', 'Configure Stripe plans', 'Deploy production build']
  } satisfies Omit<ProjectBlueprint, 'optimizer'>;

  return {
    ...baseBlueprint,
    optimizer: optimizeBusinessBlueprint(baseBlueprint)
  };
}
