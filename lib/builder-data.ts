export const goals = ['Get clients', 'Sell products', 'Build personal brand', 'Get bookings', 'Build a community', 'Launch a startup', 'Collect leads', 'Showcase portfolio'] as const;
export const projectTypes = ['Landing Page', 'Portfolio', 'Business Website', 'E-commerce', 'Blog', 'SaaS App', 'Marketplace', 'CRM', 'Booking System', 'Social Media App', 'AI Tool', 'Dashboard', 'Custom App'] as const;
export const styles = ['Modern', 'Minimal', 'Premium', 'Corporate', 'Luxury', 'Creative', 'Dark', 'Futuristic'] as const;
export const featureOptions = ['Auth', 'Dashboard', 'Payments', 'Contact Form', 'Analytics', 'Blog', 'Admin Panel', 'Search', 'Notifications', 'AI Features', 'File Upload', 'Team Collaboration'] as const;
export const planCatalog = [
  { key: 'free', name: 'Free', price: 0, credits: 25, priceId: null, features: ['1 draft project', 'Builder preview', 'Starter templates'] },
  { key: 'pro', name: 'Pro', price: 29, credits: 500, priceId: 'price_1TpucQ2IhiLnVn0hsDZDqwfp', features: ['Unlimited projects', 'Export code', 'Deployments', 'Custom domains'] },
  { key: 'team', name: 'Team', price: 99, credits: 2500, priceId: 'price_1TpugZ2IhiLnVn0hkGhSOocP', features: ['Team seats', 'Shared projects', 'Admin controls', 'Priority support'] }
] as const;