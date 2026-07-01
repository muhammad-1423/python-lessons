export function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-3xl border border-white/10 bg-white/[0.07] p-6 shadow-2xl backdrop-blur ${className}`}>{children}</div>;
}
