import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getProject, saveGeneratedPages } from '@/lib/projects-store';
import { generateMultiPageSite } from '@/lib/ai-generate';

export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = (session.user as { id: string }).id;
  const { id } = await params;
  const project = await getProject(id, userId);
  if (!project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  try {
    const pages = await generateMultiPageSite(project.input);
    const saved = await saveGeneratedPages(id, pages, userId);
    return NextResponse.json({ pages: saved });
  } catch (error) {
    console.error('Multi-page generation error:', error);
    return NextResponse.json({ error: 'Failed to generate site' }, { status: 500 });
  }
}