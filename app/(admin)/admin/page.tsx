import { Nav } from '@/components/Nav';
import { Card } from '@/components/ui/Card';

const cards = [
  ['Users', '12.4k'],
  ['Projects', '31k'],
  ['Subscriptions', '8.2k'],
  ['Revenue', '$482k'],
  ['Domains', '940'],
  ['API usage', '2.1M'],
  ['Analytics', '97%'],
  ['Plans', '3']
];

export default function AdminPage() {
  return (
    <main>
      <Nav />
      <section className="mx-auto max-w-7xl px-6 py-10">
        <p className="text-aqua">Admin system</p>
        <h1 className="text-5xl font-black">Operate Codable</h1>
        <div className="mt-8 grid gap-5 md:grid-cols-4">{cards.map(([label, value]) => <Card key={label}><p className="text-white/60">View / manage</p><h2 className="mt-2 text-2xl font-bold">{label}</h2><p className="mt-5 text-4xl font-black">{value}</p></Card>)}</div>
      </section>
    </main>
  );
}
