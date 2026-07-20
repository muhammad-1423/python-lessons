import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getProject, saveGeneratedHtmlWithVersion } from '@/lib/projects-store';
import { generateLandingPageHtml } from '@/lib/ai-generate';

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
    const html = await generateLandingPageHtml(project.input);
    const versionLabel = `Version ${new Date().toLocaleString()}`;
    await saveGeneratedHtmlWithVersion(id, html, userId, versionLabel);
    return NextResponse.json({ html });
  } catch (error) {
    console.error('AI generation error:', error);
    return NextResponse.json({ error: 'Failed to generate page' }, { status: 500 });
  }
}