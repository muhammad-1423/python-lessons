import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getProject } from '@/lib/projects-store';

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = (session.user as { id: string }).id;
  const { id } = await params;
  const project = await getProject(id, userId);
  if (!project) return NextResponse.json({ error: 'Project not found' }, { status: 404 });

  const exportData = {
    projectName: project.name,
    exportedAt: new Date().toISOString(),
    input: project.input,
    blueprint: project.blueprint
  };

  return new NextResponse(JSON.stringify(exportData, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Content-Disposition': `attachment; filename="${project.name.replace(/\s+/g, '-').toLowerCase()}-export.json"`
    }
  });
}