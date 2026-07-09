import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { listProjects, saveProject } from '@/lib/projects-store';
import type { BuilderInput } from '@/lib/types';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = (session.user as { id: string }).id;
  const projects = await listProjects(userId);
  return NextResponse.json({ projects });
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = (session.user as { id: string }).id;
  const input = (await request.json()) as BuilderInput;
  const project = await saveProject(input, userId);
  return NextResponse.json(project, { status: 201 });
}