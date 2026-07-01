import { NextResponse } from 'next/server';
import { createProjectBlueprint } from '@/lib/blueprint';
import { analyzeCompetitor } from '@/lib/competitor-engine';
import { generateAutoContent } from '@/lib/content-engine';
import { createEvolutionPlan } from '@/lib/evolution-engine';
import { analyzeBusinessGoal } from '@/lib/intent-engine';
import { getMemoryProfile } from '@/lib/memory-engine';
import { getSmartQuestions } from '@/lib/question-engine';
import type { BuilderInput } from '@/lib/types';

export async function POST(request: Request) {
  const input = (await request.json()) as BuilderInput;
  const blueprint = createProjectBlueprint(input);

  return NextResponse.json({
    analysis: analyzeBusinessGoal(input),
    questions: getSmartQuestions(input),
    content: generateAutoContent(input),
    competitor: analyzeCompetitor(input),
    memory: getMemoryProfile(input),
    optimizer: blueprint.optimizer,
    evolution: createEvolutionPlan(input),
    blueprint
  });
}
