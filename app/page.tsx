import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Card } from '@/components/ui/Card';
import { planCatalog } from '@/lib/builder-data';

const foundations = ['Supabase-ready auth', 'Workspace dashboard', 'No-prompt builder flow', 'Project saving', 'Live preview system', 'Stripe billing', 'Admin operations', 'Prisma data model'];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden">
      <Nav />
      <section className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="mb-4 text-aqua">AI Business Builder</p>
          <h1 className="text-6xl font-black leading-none md:text-8xl">Don&apos;t write prompts. Build your business.</h1>
          <p className="mt-6 max-w-2xl text-xl text-white/70">Codable starts with intent, captures the business model through focused questions, saves the project, previews the product, and prepares the operational foundation for launch.</p>
          <div className="mt-8 flex flex-wrap gap-4"><Link className="rounded-full bg-brand px-7 py-4 font-bold shadow-glow" href="/builder">Build with no prompt</Link><Link className="rounded-full bg-white/10 px-7 py-4 font-bold" href="/dashboard">Open dashboard</Link></div>
        </div>
        <Card><p className="text-sm text-white/60">Foundation modules</p><div className="mt-5 grid gap-3">{foundations.map((feature) => <div className="rounded-2xl bg-white/10 p-4" key={feature}>✓ {feature}</div>)}</div></Card>
      </section>
      <section className="mx-auto max-w-7xl px-6 pb-20"><h2 className="text-4xl font-black">Business model</h2><div className="mt-8 grid gap-5 md:grid-cols-3">{planCatalog.map((plan) => <Card key={plan.key}><h3 className="text-2xl font-bold">{plan.name}</h3><p className="my-4 text-5xl font-black">${plan.price}</p><p className="text-aqua">{plan.credits} credits</p></Card>)}</div></section>
    </main>
  );
}
