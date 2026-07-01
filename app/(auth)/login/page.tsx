import Link from 'next/link';
import { Nav } from '@/components/Nav';

export default function LoginPage() {
  return (
    <main>
      <Nav />
      <section className="mx-auto max-w-md px-6 py-16">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-8">
          <h1 className="text-4xl font-black">Sign in</h1>
          <p className="mt-2 text-white/60">Supabase auth-ready login screen.</p>
          <form className="mt-8 space-y-4">
            <input className="w-full rounded-2xl bg-white p-4 text-ink" placeholder="Email" type="email" />
            <input className="w-full rounded-2xl bg-white p-4 text-ink" placeholder="Password" type="password" />
            <button className="w-full rounded-full bg-brand px-5 py-3 font-bold">Sign in</button>
          </form>
          <p className="mt-6 text-sm text-white/60">No account? <Link className="text-aqua" href="/signup">Create one</Link></p>
        </div>
      </section>
    </main>
  );
}
