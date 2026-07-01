# Codable

Codable is a full-stack SaaS foundation for a no-prompt intelligent web/app builder positioned as **"Don't write prompts. Build your business."** This iteration intentionally focuses on the product architecture and core app foundation before advanced AI intelligence.

## Foundation included

- Next.js App Router, TypeScript and Tailwind CSS
- Supabase-ready authentication screens and client helper
- Workspace dashboard with saved projects
- Intent-first builder flow with adaptive smart questions and project saving
- Business goal analysis for metrics, funnel strategy, conversion priorities and trust signals
- Auto-content engine for headlines, CTAs, feature blurbs, FAQs, SEO, pricing and testimonial prompts
- Competitor intelligence for URL-based gap, layout and differentiation recommendations
- AI memory profile for preferred styles, colors, features and brand tone
- Business optimizer for score, CTA quality, SEO, trust signals and section order
- Evolution mode for growing one project type into another
- Live preview system backed by deterministic blueprints
- Project detail view with export/deploy action placeholders
- Stripe checkout route and billing plans
- Admin panel for users, projects, subscriptions, revenue, domains, API usage, analytics and plans
- Prisma schema for users, projects, versions, subscriptions, domains, usage, templates and teams

## Run locally

```bash
npm install
npm run dev
```

## Environment variables

```bash
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_SUPABASE_URL="https://..."
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."
STRIPE_SECRET_KEY="sk_..."
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```
