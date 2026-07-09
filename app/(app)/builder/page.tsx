import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { BuilderClient } from '@/components/builder/BuilderClient';
import { Nav } from '@/components/Nav';
import { getProject } from '@/lib/projects-store';

export default async function BuilderPage({ searchParams }: { searchParams: Promise<{ edit?: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect('/login');

  const userId = (session.user as { id: string }).id;
  const { edit } = await searchParams;

  const existingProject = edit ? await getProject(edit, userId) : null;

  return (
    <main>
      <Nav />
      <section className="mx-auto max-w-7xl px-6 py-8">
        <p className="font-semibold text-aqua">Intent-first engine</p>
        <h1 className="mt-2 text-5xl font-black">Codable asks why first, then builds the business system.</h1>
        <p className="mt-4 max-w-3xl text-white/60">The smart flow analyzes the business goal, asks adaptive questions, recommends structure and features, then auto-generates conversion-focused content.</p>
        <div className="mt-8">
          <BuilderClient editId={existingProject?.id} initialInput={existingProject?.input} />
        </div>
      </section>
    </main>
  );
}
