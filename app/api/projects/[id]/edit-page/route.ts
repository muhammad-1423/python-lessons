import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getProject, saveGeneratedHtmlWithVersion } from '@/lib/projects-store';
import { editLandingPageHtml } from '@/lib/ai-generate';

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = (session.user as { id: string }).id;
  const { id } = await params;
  const project = await getProject(id, userId);
  if (!project || !project.generatedHtml) {
    return NextResponse.json({ error: 'No page to edit yet' }, { status: 400 });
  }

  const { instruction } = (await request.json()) as { instruction?: string };
  if (!instruction) {
    return NextResponse.json({ error: 'Instruction is required' }, { status: 400 });
  }

  try {
    const html = await editLandingPageHtml(project.generatedHtml, instruction);
    const versionLabel = `Edit: ${instruction.slice(0, 40)}`;
    await saveGeneratedHtmlWithVersion(id, html, userId, versionLabel);
    return NextResponse.json({ html });
  } catch (error) {
    console.error('AI edit error:', error);
    return NextResponse.json({ error: 'Failed to edit page' }, { status: 500 });
  }
}