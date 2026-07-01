import { createProjectBlueprint } from '@/lib/blueprint';
import type { BuilderInput, ProjectBlueprint } from '@/lib/types';

export type StoredProject = {
  id: string;
  ownerId: string;
  name: string;
  status: 'draft' | 'generated' | 'deployed';
  input: BuilderInput;
  blueprint: ProjectBlueprint;
  createdAt: string;
  updatedAt: string;
};

const initialInput: BuilderInput = {
  goal: 'Get clients',
  projectType: 'SaaS App',
  style: 'Premium',
  color: '#7C3AED',
  features: ['Auth', 'Dashboard', 'Payments'],
  navigation: ['Home', 'Features', 'Pricing', 'Dashboard'],
  projectName: 'Codable Demo',
  companyName: 'Codable',
  tagline: "Don't write prompts. Build your business.",
  generateContent: true,
  audience: 'founders and service businesses',
  offer: 'a no-prompt builder that turns business intent into launch-ready products',
  primaryAction: 'Start free',
  proofAssets: ['demo projects', 'conversion checklist'],
  competitorUrl: 'https://webflow.com',
  evolutionTarget: 'SaaS App'
};

const projects = new Map<string, StoredProject>();
const demoProject: StoredProject = {
  id: 'demo-project',
  ownerId: 'demo-user',
  name: initialInput.projectName,
  status: 'generated',
  input: initialInput,
  blueprint: createProjectBlueprint(initialInput),
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};
projects.set(demoProject.id, demoProject);

export function listProjects() {
  return Array.from(projects.values()).sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
}

export function getProject(id: string) {
  return projects.get(id);
}

export function saveProject(input: BuilderInput) {
  const now = new Date().toISOString();
  const project: StoredProject = {
    id: crypto.randomUUID(),
    ownerId: 'demo-user',
    name: input.projectName || input.companyName || 'Untitled project',
    status: 'generated',
    input,
    blueprint: createProjectBlueprint(input),
    createdAt: now,
    updatedAt: now
  };
  projects.set(project.id, project);
  return project;
}
