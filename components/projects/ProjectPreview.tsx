import type { ProjectBlueprint } from '@/lib/types';

export function ProjectPreview({ blueprint, color }: { blueprint: ProjectBlueprint; color: string }) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-ink">
      <div className="p-8" style={{ background: `linear-gradient(135deg, ${color}66, #070A13 70%)` }}>
        <p className="text-sm font-semibold text-aqua">Live product preview</p>
        <h2 className="mt-4 text-4xl font-black">{blueprint.content.headline}</h2>
        <p className="mt-4 max-w-2xl text-white/70">{blueprint.content.subheadline}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <span className="rounded-full bg-white px-4 py-2 text-sm font-bold text-ink">{blueprint.content.primaryCta}</span>
          <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold">{blueprint.content.secondaryCta}</span>
        </div>
      </div>
      <div className="grid gap-4 p-6 md:grid-cols-2">
        <Insight title="Business goal analysis" value={`Optimize for ${blueprint.analysis.primaryMetric}`} detail={blueprint.analysis.funnelStrategy} />
        <Insight title="Business optimizer" value={`${blueprint.optimizer.score}/100`} detail={blueprint.optimizer.recommendations[0]} />
        <Insight title="Competitor intelligence" value={blueprint.competitor.detectedCategory} detail={blueprint.competitor.differentiationStrategy[0]} />
        <Insight title="AI memory" value={blueprint.memory.brandTone} detail={`Reusing ${blueprint.memory.commonFeatures.slice(0, 3).join(', ')} preferences.`} />
        <Insight title="Evolution mode" value={`${blueprint.evolution.from} → ${blueprint.evolution.to}`} detail={blueprint.evolution.phases[1]?.description ?? blueprint.evolution.phases[0].description} />
        {blueprint.pages.map((page) => (
          <div className="rounded-2xl bg-white/[0.06] p-4" key={page.name}>
            <h3 className="font-bold">{page.name}</h3>
            <p className="mt-2 text-sm text-white/60">{page.sections.join(' • ')}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Insight({ title, value, detail }: { title: string; value: string; detail: string }) {
  return (
    <div className="rounded-2xl bg-white/[0.06] p-4">
      <p className="text-sm text-aqua">{title}</p>
      <h3 className="mt-2 font-bold">{value}</h3>
      <p className="mt-2 text-sm text-white/60">{detail}</p>
    </div>
  );
}
