'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import type { StoredProject } from '@/lib/projects-store';

export function ProjectCard({ project }: { project: StoredProject }) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const [dateStr, setDateStr] = useState('');

  useEffect(() => {
    setDateStr(new Date(project.updatedAt).toLocaleDateString());
  }, [project.updatedAt]);

  async function handleDelete() {
    if (!confirm(`Delete "${project.name}"? This cannot be undone.`)) return;
    setDeleting(true);
    await fetch(`/api/projects/${project.id}`, { method: 'DELETE' });
    router.refresh();
  }

  return (
    <Card className="flex items-center justify-between">
      <div>
        <h3 className="font-bold">{project.name}</h3>
        <p className="text-sm text-white/60">
          {project.input.projectType} · {project.status} · updated {dateStr}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="rounded-full bg-red-500/20 px-4 py-2 text-sm font-semibold text-red-300 disabled:opacity-50"
        >
          {deleting ? 'Deleting…' : 'Delete'}
        </button>
        <Link className="rounded-full bg-white px-5 py-3 font-bold text-ink" href={`/projects/${project.id}`}>Open</Link>
      </div>
    </Card>
  );
}