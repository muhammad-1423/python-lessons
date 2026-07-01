import { Nav } from '@/components/Nav';
import { Card } from '@/components/ui/Card';

const sections = ['Profile', 'Supabase authentication', 'Billing and credits', 'Team support', 'Custom domains', 'Project memory', 'API keys'];

export default function SettingsPage() {
  return (
    <main>
      <Nav />
      <section className="mx-auto max-w-4xl px-6 py-10">
        <p className="text-aqua">Workspace controls</p>
        <h1 className="text-5xl font-black">Settings</h1>
        <div className="mt-8 space-y-4">{sections.map((section) => <Card key={section}><h2 className="text-xl font-bold">{section}</h2><p className="mt-2 text-white/60">Configured as a first-class production module in the Codable foundation.</p></Card>)}</div>
      </section>
    </main>
  );
}
