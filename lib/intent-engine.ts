import type { BuilderInput, BusinessGoalAnalysis } from '@/lib/types';

const goalPlaybooks: Record<string, Omit<BusinessGoalAnalysis, 'goal'>> = {
  'Get clients': {
    primaryMetric: 'qualified consultation requests',
    funnelStrategy: 'educate visitors, prove credibility, and route them into a low-friction consultation CTA',
    recommendedPages: ['Home', 'Services', 'Case Studies', 'Pricing', 'Contact'],
    recommendedFeatures: ['Contact Form', 'Analytics', 'Notifications'],
    conversionPriorities: ['Clear service outcome', 'Visible proof', 'Low-risk CTA', 'Fast contact path'],
    trustSignals: ['case studies', 'client logos', 'process timeline', 'guarantee or response time'],
    contentAngle: 'outcome-focused expertise that makes the buyer feel safe taking the next step'
  },
  'Sell products': {
    primaryMetric: 'completed checkout revenue',
    funnelStrategy: 'move shoppers from product value to cart with trust, urgency, and simple checkout',
    recommendedPages: ['Home', 'Shop', 'Product', 'Reviews', 'FAQ'],
    recommendedFeatures: ['Payments', 'Search', 'Analytics', 'Notifications'],
    conversionPriorities: ['Product clarity', 'Shipping and returns confidence', 'Reviews', 'Checkout speed'],
    trustSignals: ['reviews', 'secure checkout', 'return policy', 'delivery estimates'],
    contentAngle: 'benefit-led product storytelling with clear reasons to buy now'
  },
  'Build personal brand': {
    primaryMetric: 'followers and inbound opportunities',
    funnelStrategy: 'show authority, point of view, and a repeatable path to subscribe or contact',
    recommendedPages: ['Home', 'About', 'Writing', 'Speaking', 'Contact'],
    recommendedFeatures: ['Blog', 'Contact Form', 'Analytics'],
    conversionPriorities: ['Strong POV', 'Authority proof', 'Email capture', 'Featured work'],
    trustSignals: ['media mentions', 'logos', 'featured posts', 'audience numbers'],
    contentAngle: 'distinctive thought leadership that makes the person memorable'
  },
  'Get bookings': {
    primaryMetric: 'scheduled appointments',
    funnelStrategy: 'reduce scheduling friction and explain the value of booking immediately',
    recommendedPages: ['Home', 'Services', 'Availability', 'Reviews', 'Contact'],
    recommendedFeatures: ['Booking System', 'Notifications', 'Payments'],
    conversionPriorities: ['Availability visibility', 'Service fit', 'Reminder flow', 'Review proof'],
    trustSignals: ['ratings', 'certifications', 'calendar availability', 'cancellation policy'],
    contentAngle: 'convenience, confidence, and fast scheduling'
  },
  'Build a community': {
    primaryMetric: 'member signups and active participation',
    funnelStrategy: 'communicate belonging, recurring value, and a clear path to join',
    recommendedPages: ['Home', 'Community', 'Events', 'Members', 'Join'],
    recommendedFeatures: ['Auth', 'Notifications', 'Team Collaboration'],
    conversionPriorities: ['Belonging promise', 'Member benefits', 'Activity proof', 'Simple onboarding'],
    trustSignals: ['member count', 'event calendar', 'moderation rules', 'member stories'],
    contentAngle: 'shared identity and momentum'
  },
  'Launch a startup': {
    primaryMetric: 'waitlist signups and activation',
    funnelStrategy: 'validate the problem, show the product promise, and capture early adopters',
    recommendedPages: ['Home', 'Product', 'Pricing', 'Roadmap', 'Waitlist'],
    recommendedFeatures: ['Auth', 'Dashboard', 'Analytics', 'AI Features'],
    conversionPriorities: ['Problem urgency', 'Differentiation', 'Waitlist CTA', 'Founder credibility'],
    trustSignals: ['early users', 'roadmap', 'security notes', 'investor or founder proof'],
    contentAngle: 'category-defining product narrative for early adopters'
  },
  'Collect leads': {
    primaryMetric: 'lead form submissions',
    funnelStrategy: 'offer a specific incentive and minimize fields until trust is earned',
    recommendedPages: ['Home', 'Lead Magnet', 'Proof', 'FAQ', 'Contact'],
    recommendedFeatures: ['Contact Form', 'Analytics', 'Notifications'],
    conversionPriorities: ['Lead magnet value', 'Short form', 'Privacy reassurance', 'Follow-up clarity'],
    trustSignals: ['privacy note', 'sample results', 'testimonials', 'response time'],
    contentAngle: 'specific value exchange that makes submitting details worthwhile'
  },
  'Showcase portfolio': {
    primaryMetric: 'portfolio inquiries',
    funnelStrategy: 'curate the best work, explain the thinking, and route viewers to inquiry',
    recommendedPages: ['Home', 'Work', 'Case Study', 'About', 'Contact'],
    recommendedFeatures: ['File Upload', 'Contact Form', 'Search'],
    conversionPriorities: ['Best work first', 'Case study depth', 'Role clarity', 'Contact CTA'],
    trustSignals: ['client names', 'project outcomes', 'process notes', 'awards'],
    contentAngle: 'visual proof backed by business impact'
  }
};

export function analyzeBusinessGoal(input: BuilderInput): BusinessGoalAnalysis {
  const playbook = goalPlaybooks[input.goal] ?? goalPlaybooks['Launch a startup'];
  return {
    goal: input.goal,
    ...playbook,
    recommendedPages: Array.from(new Set([...input.navigation, ...playbook.recommendedPages])).slice(0, 7),
    recommendedFeatures: Array.from(new Set([...input.features, ...playbook.recommendedFeatures]))
  };
}
