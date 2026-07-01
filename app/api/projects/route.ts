import { NextResponse } from 'next/server';
import { listProjects, saveProject } from '@/lib/projects-store';
import type { BuilderInput } from '@/lib/types';

export async function GET() {
  return NextResponse.json({ projects: listProjects() });
}

export async function POST(request: Request) {
  const input = (await request.json()) as BuilderInput;
  const project = saveProject(input);
  return NextResponse.json(project, { status: 201 });
}
