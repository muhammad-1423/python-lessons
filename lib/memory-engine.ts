import type { BuilderInput, MemoryProfile } from '@/lib/types';

const defaultMemory: MemoryProfile = {
  id: 'demo-memory',
  preferredStyle: 'Premium',
  preferredColor: '#7C3AED',
  commonFeatures: ['Auth', 'Dashboard', 'Payments'],
  lastGoals: ['Get clients', 'Launch a startup'],
  brandTone: 'premium, direct and practical'
};

export function getMemoryProfile(input: BuilderInput): MemoryProfile {
  return {
    ...defaultMemory,
    id: input.memoryProfileId || defaultMemory.id,
    preferredStyle: input.style || defaultMemory.preferredStyle,
    preferredColor: input.color || defaultMemory.preferredColor,
    commonFeatures: Array.from(new Set([...defaultMemory.commonFeatures, ...input.features])).slice(0, 8),
    lastGoals: Array.from(new Set([input.goal, ...defaultMemory.lastGoals])).slice(0, 5),
    brandTone: input.style === 'Minimal' ? 'clean, concise and calm' : defaultMemory.brandTone
  };
}

export function applyMemoryDefaults(input: BuilderInput): BuilderInput {
  const memory = getMemoryProfile(input);
  return {
    ...input,
    style: input.style || memory.preferredStyle,
    color: input.color || memory.preferredColor,
    features: Array.from(new Set([...input.features, ...memory.commonFeatures]))
  };
}
