'use client';

'use client';

import { useMemo, useState } from 'react';
import { createProjectBlueprint } from '@/lib/blueprint';
import { getSmartQuestions } from '@/lib/question-engine';
import type { BuilderInput, SmartQuestion } from '@/lib/types';
import { ProjectPreview } from '@/components/projects/ProjectPreview';

const defaultInput: BuilderInput = {
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
  audience: 'service businesses and startup founders',
  offer: 'a no-prompt AI business builder',
  primaryAction: 'Start free',
  proofAssets: ['fast setup', 'premium templates'],
  competitorUrl: 'https://example.com',
  evolutionTarget: 'SaaS App'
};

export function BuilderClient({ editId, initialInput }: { editId?: string; initialInput?: BuilderInput }) {
  const [step, setStep] = useState(0);
  const [input, setInput] = useState<BuilderInput>(initialInput ?? defaultInput);
  const [savedId, setSavedId] = useState<string>();
  const [saving, setSaving] = useState(false);
  const questions = useMemo(() => getSmartQuestions(input), [input]);
  const currentQuestion = questions[step];
  const blueprint = useMemo(() => createProjectBlueprint(input), [input]);

  const update = <K extends keyof BuilderInput>(key: K, value: BuilderInput[K]) => setInput((current) => ({ ...current, [key]: value }));

  function updateQuestion(question: SmartQuestion, value: string | string[]) {
    if (question.id === 'proofAssetsText') {
      update('proofAssets', String(value).split(',').map((item) => item.trim()).filter(Boolean));
      return;
    }
    if (question.id === 'navigation') {
      update('navigation', String(value).split(',').map((item) => item.trim()).filter(Boolean));
      return;
    }
    update(question.id, value as never);
  }

  async function saveProject() {
    setSaving(true);
    const url = editId ? `/api/projects/${editId}` : '/api/projects';
    const method = editId ? 'PATCH' : 'POST';
    const response = await fetch(url, {
      method,
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(input)
    });
    const project = await response.json();
    setSavedId(project.id);
    setSaving(false);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <section className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-6">
        <p className="text-sm font-semibold text-aqua">{currentQuestion.step} · Question {step + 1} of {questions.length}</p>
        <h1 className="mt-2 text-4xl font-black">{currentQuestion.question}</h1>
        <p className="mt-3 text-white/60">{currentQuestion.helpText}</p>
        <div className="mt-4 h-2 rounded-full bg-white/10"><div className="h-2 rounded-full bg-aqua" style={{ width: `${((step + 1) / questions.length) * 100}%` }} /></div>
        <div className="mt-8 min-h-80"><QuestionInput question={currentQuestion} input={input} onChange={(value) => updateQuestion(currentQuestion, value)} /></div>
        <div className="mt-8 flex items-center justify-between">
          <button className="rounded-full bg-white/10 px-5 py-3" onClick={() => setStep(Math.max(0, step - 1))}>Back</button>
          {step < questions.length - 1 ? <button className="rounded-full bg-white px-5 py-3 font-bold text-ink" onClick={() => setStep(step + 1)}>Next smart question</button> : <button className="rounded-full bg-aqua px-5 py-3 font-bold text-ink" onClick={saveProject}>{saving ? 'Saving...' : editId ? 'Update project' : 'Save intent blueprint'}</button>}
        </div>
        {savedId && <p className="mt-4 text-sm text-aqua">Saved. <a className="underline" href={`/projects/${savedId}`}>Open project</a></p>}
      </section>
      <ProjectPreview blueprint={blueprint} color={input.color} />
    </div>
  );
}

function QuestionInput({ question, input, onChange }: { question: SmartQuestion; input: BuilderInput; onChange: (value: string | string[]) => void }) {
  if (question.inputType === 'choice') {
    return <div className="grid gap-3 sm:grid-cols-2">{question.options?.map((item) => <button className={`rounded-2xl p-4 text-left ${input[question.id as keyof BuilderInput] === item ? 'bg-brand' : 'bg-white/10'}`} key={item} onClick={() => onChange(item)}>{item}</button>)}</div>;
  }

  if (question.inputType === 'multi-choice') {
    return <div className="grid gap-3 sm:grid-cols-2">{question.options?.map((item) => <button className={`rounded-2xl p-4 text-left ${input.features.includes(item) ? 'bg-brand' : 'bg-white/10'}`} key={item} onClick={() => onChange(input.features.includes(item) ? input.features.filter((feature) => feature !== item) : [...input.features, item])}>{item}</button>)}</div>;
  }

  const value = question.id === 'proofAssetsText' ? input.proofAssets?.join(', ') ?? '' : question.id === 'navigation' ? input.navigation.join(', ') : String(input[question.id as keyof BuilderInput] ?? '');
  const className = 'w-full rounded-2xl bg-white p-4 text-ink';

  if (question.inputType === 'textarea') {
    return <textarea className={`${className} min-h-48`} value={value} onChange={(event) => onChange(event.target.value)} />;
  }

  return <input className={className} value={value} onChange={(event) => onChange(event.target.value)} />;
}