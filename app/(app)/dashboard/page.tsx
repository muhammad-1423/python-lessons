import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Card } from '@/components/ui/Card';
import { listProjects } from '@/lib/projects-store';

export default function DashboardPage() {
  const projects = listProjects();
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
        <div className="mt-5 grid gap-4">{projects.map((project) => <Card className="flex items-center justify-between" key={project.id}><div><h3 className="font-bold">{project.name}</h3><p className="text-sm text-white/60">{project.input.projectType} · {project.status} · updated {new Date(project.updatedAt).toLocaleDateString()}</p></div><Link className="rounded-full bg-white px-5 py-3 font-bold text-ink" href={`/projects/${project.id}`}>Open</Link></Card>)}</div>
      </section>
    </main>
  );
}
