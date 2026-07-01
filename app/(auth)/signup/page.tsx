import Link from 'next/link';
import { Nav } from '@/components/Nav';

export default function SignupPage() {
  return (
    <main>
      <Nav />
      <section className="mx-auto max-w-md px-6 py-16">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-8">
          <h1 className="text-4xl font-black">Create account</h1>
          <p className="mt-2 text-white/60">Start with the Free plan and 25 credits.</p>
          <form className="mt-8 space-y-4">
            <input className="w-full rounded-2xl bg-white p-4 text-ink" placeholder="Name" />
            <input className="w-full rounded-2xl bg-white p-4 text-ink" placeholder="Email" type="email" />
            <input className="w-full rounded-2xl bg-white p-4 text-ink" placeholder="Password" type="password" />
            <button className="w-full rounded-full bg-aqua px-5 py-3 font-bold text-ink">Create workspace</button>
          </form>
          <p className="mt-6 text-sm text-white/60">Already have an account? <Link className="text-aqua" href="/login">Sign in</Link></p>
        </div>
      </section>
    </main>
  );
}
