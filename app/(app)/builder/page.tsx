import { BuilderClient } from '@/components/builder/BuilderClient';
import { Nav } from '@/components/Nav';

export default function BuilderPage() {
  return (
    <main>
      <Nav />
      <section className="mx-auto max-w-7xl px-6 py-8">
        <p className="font-semibold text-aqua">Intent-first engine</p>
        <h1 className="mt-2 text-5xl font-black">Codable asks why first, then builds the business system.</h1>
        <p className="mt-4 max-w-3xl text-white/60">The smart flow analyzes the business goal, asks adaptive questions, recommends structure and features, then auto-generates conversion-focused content.</p>
        <div className="mt-8"><BuilderClient /></div>
      </section>
    </main>
  );
}
