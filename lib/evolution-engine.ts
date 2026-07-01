import type { BuilderInput, EvolutionPlan } from '@/lib/types';

const evolutionFeatures: Record<string, string[]> = {
  'SaaS App': ['Auth', 'Dashboard', 'Billing', 'Usage limits', 'Settings'],
  Marketplace: ['Vendor profiles', 'Listings', 'Search', 'Payments', 'Reviews'],
  CRM: ['Contacts', 'Pipeline', 'Tasks', 'Notes', 'Reporting'],
  'Booking System': ['Calendar', 'Availability', 'Payments', 'Reminders', 'Admin scheduling'],
  Community: ['Member profiles', 'Posts', 'Events', 'Notifications', 'Moderation']
};

export function createEvolutionPlan(input: BuilderInput): EvolutionPlan {
  const from = input.projectType;
  const to = input.evolutionTarget || inferTarget(input.projectType);
  const features = evolutionFeatures[to] || ['Auth', 'Dashboard', 'Admin Panel', 'Analytics'];

  return {
    from,
    to,
    phases: [
      { name: 'Stabilize foundation', description: `Keep the current ${from} focused on ${input.goal.toLowerCase()} while validating demand.`, features: input.features.slice(0, 4) },
      { name: `Add ${to} core`, description: `Introduce the minimum workflows needed to operate as a ${to}.`, features: features.slice(0, 3) },
      { name: 'Scale operations', description: 'Add team, admin, analytics and monetization workflows after usage is proven.', features: features.slice(3) }
    ],
    dataModelChanges: ['add project_versions for major rebuilds', 'track usage_events by feature', 'connect subscriptions to feature limits', `add ${to.toLowerCase().replaceAll(' ', '_')} domain tables`],
    riskNotes: ['do not add complex workflows before the primary CTA converts', 'preserve existing SEO URLs during evolution', 'migrate users and billing data before launch']
  };
}

function inferTarget(projectType: string) {
  if (projectType === 'Landing Page' || projectType === 'Business Website') return 'SaaS App';
  if (projectType === 'Portfolio') return 'CRM';
  if (projectType === 'Blog') return 'Community';
  return projectType;
}
