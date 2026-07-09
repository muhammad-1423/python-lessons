import { notFound, redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { Nav } from '@/components/Nav';
import { ProjectPreview } from '@/components/projects/ProjectPreview';
import { AIPagePreview } from '@/components/projects/AIPagePreview';
import { Card } from '@/components/ui/Card';
import { getProject } from '@/lib/projects-store';

export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect('/login');

  const userId = (session.user as { id: string }).id;
  const { id } = await params;
  const project = await getProject(id, userId);
  if (!project) notFound();

  return (
    <main>
      <Nav />
      <section className="mx-auto grid max-w-7xl gap-6 px-6 py-10 lg:grid-cols-[1fr_0.8fr]">
        <div>
          <p className="text-aqua">Project detail</p>
          <h1 className="mt-2 text-5xl font-black">{project.name}</h1>
          <div className="mt-8"><ProjectPreview blueprint={project.blueprint} color={project.input.color} /></div>
          <div className="mt-8"><AIPagePreview projectId={project.id} initialHtml={project.generatedHtml} /></div>
        </div>
        <aside className="space-y-5">
          <Card><h2 className="text-xl font-bold">Actions</h2><div className="mt-4 grid gap-3"><a href={`/builder?edit=${project.id}`} className="block rounded-full bg-brand px-4 py-3 text-center font-bold">Re-edit project</a><a href={`/api/projects/${project.id}/export`} className="block rounded-full bg-white px-4 py-3 text-center font-bold text-ink">Export code</a><a href={`/preview/${project.id}`} target="_blank" rel="noopener noreferrer" className="block rounded-full bg-aqua px-4 py-3 text-center font-bold text-ink">View live preview</a></div></Card>
          <Card><h2 className="text-xl font-bold">Goal analysis</h2><p className="mt-2 text-white/60">Primary metric: {project.blueprint.analysis.primaryMetric}</p><p className="mt-2 text-white/60">{project.blueprint.analysis.contentAngle}</p></Card><Card><h2 className="text-xl font-bold">Optimizer</h2><p className="mt-2 text-white/60">Score: {project.blueprint.optimizer.score}/100</p><p className="mt-2 text-white/60">{project.blueprint.optimizer.recommendations[0]}</p></Card><Card><h2 className="text-xl font-bold">Evolution mode</h2><p className="mt-2 text-white/60">{project.blueprint.evolution.from} → {project.blueprint.evolution.to}</p><p className="mt-2 text-white/60">{project.blueprint.evolution.phases[1]?.description}</p></Card><Card><h2 className="text-xl font-bold">Launch checklist</h2><ul className="mt-4 space-y-2 text-white/70">{project.blueprint.launchChecklist.map((item) => <li key={item}>✓ {item}</li>)}</ul></Card>
        </aside>
      </section>
    </main>
  );
}