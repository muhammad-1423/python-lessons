import { createProjectBlueprint } from '@/lib/blueprint';
import type { BuilderInput, ProjectBlueprint } from '@/lib/types';
import { prisma } from '@/lib/db';
import type { Project as PrismaProject } from '@prisma/client';

export type StoredProject = {
  id: string;
  ownerId: string;
  name: string;
  status: 'draft' | 'generated' | 'deployed';
  input: BuilderInput;
  blueprint: ProjectBlueprint;
  generatedHtml: string | null;
  createdAt: string;
  updatedAt: string;
};

const statusFromDb: Record<string, StoredProject['status']> = {
  DRAFT: 'draft',
  GENERATED: 'generated',
  DEPLOYED: 'deployed',
  ARCHIVED: 'draft'
};

function toStoredProject(row: PrismaProject): StoredProject {
  return {
    id: row.id,
    ownerId: row.userId,
    name: row.name,
    status: statusFromDb[row.status] ?? 'draft',
    input: row.input as BuilderInput,
    blueprint: (row.blueprint ?? {}) as ProjectBlueprint,
    generatedHtml: row.generatedHtml,
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString()
  };
}

export async function listProjects(userId: string): Promise<StoredProject[]> {
  const rows = await prisma.project.findMany({
    where: { userId },
    orderBy: { updatedAt: 'desc' }
  });
  return rows.map(toStoredProject);
}

export async function getProject(id: string, userId: string): Promise<StoredProject | null> {
  const row = await prisma.project.findFirst({ where: { id, userId } });
  return row ? toStoredProject(row) : null;
}

export async function saveProject(input: BuilderInput, userId: string): Promise<StoredProject> {
  const blueprint = createProjectBlueprint(input);
  const row = await prisma.project.create({
    data: {
      userId,
      name: input.projectName || input.companyName || 'Untitled project',
      type: input.projectType,
      goal: input.goal,
      style: input.style,
      status: 'GENERATED',
      input: input as unknown as object,
      blueprint: blueprint as unknown as object
    }
  });
  return toStoredProject(row);
}

export async function updateProject(id: string, input: BuilderInput, userId: string): Promise<StoredProject | null> {
  const existing = await prisma.project.findFirst({ where: { id, userId } });
  if (!existing) return null;

  const blueprint = createProjectBlueprint(input);
  const row = await prisma.project.update({
    where: { id },
    data: {
      name: input.projectName || input.companyName || 'Untitled project',
      type: input.projectType,
      goal: input.goal,
      style: input.style,
      input: input as unknown as object,
      blueprint: blueprint as unknown as object
    }
  });
  return toStoredProject(row);
}

export async function deleteProject(id: string, userId: string): Promise<boolean> {
  const existing = await prisma.project.findFirst({ where: { id, userId } });
  if (!existing) return false;

  await prisma.project.delete({ where: { id } });
  return true;
}

export async function saveGeneratedHtml(id: string, html: string, userId: string): Promise<StoredProject | null> {
  const existing = await prisma.project.findFirst({ where: { id, userId } });
  if (!existing) return null;

  const row = await prisma.project.update({
    where: { id },
    data: { generatedHtml: html }
  });
  return toStoredProject(row);
}