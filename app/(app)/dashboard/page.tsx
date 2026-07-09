import Link from 'next/link';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { Nav } from '@/components/Nav';
import { Card } from '@/components/ui/Card';
import { ProjectCard } from '@/components/dashboard/ProjectCard';
import { listProjects } from '@/lib/projects-store';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect('/login');

  const userId = (session.user as { id: string }).id;
  const projects = await listProjects(userId);
  const stats = [
    { label: 'Projects', value: projects.length },
    { label: 'Credits', value: 475 },
    { label: 'Deployments', value: 2 },
    { label: 'Team seats', value: 5 }
  ];

  return (
    <main>
      <Nav />
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div><p className="text-aqua">Workspace</p><h1 className="text-5xl font-black">Dashboard</h1></div>
          <Link className="rounded-full bg-brand px-5 py-3 font-bold" href="/builder">New project</Link>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-4">{stats.map((stat) => <Card key={stat.label}><p className="text-white/60">{stat.label}</p><p className="mt-2 text-4xl font-black">{stat.value}</p></Card>)}</div>
        <h2 className="mt-10 text-3xl font-bold">Saved projects</h2>
        <div className="mt-5 grid gap-4">
          {projects.map((project) => <ProjectCard key={project.id} project={project} />)}
        </div>
      </section>
    </main>
  );
}