import Link from 'next/link';

const links = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/builder', label: 'Builder' },
  { href: '/billing', label: 'Billing' },
  { href: '/admin', label: 'Admin' }
];

export function Nav() {
  return (
    <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
      <Link href="/" className="text-2xl font-black tracking-tight">Codable</Link>
      <div className="hidden gap-6 text-sm text-white/70 md:flex">
        {links.map((link) => <Link key={link.href} href={link.href}>{link.label}</Link>)}
      </div>
      <div className="flex items-center gap-3">
        <Link href="/login" className="hidden text-sm text-white/70 sm:block">Sign in</Link>
        <Link href="/builder" className="rounded-full bg-white px-5 py-2 font-semibold text-ink">Start</Link>
      </div>
    </nav>
  );
}
