'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { Nav } from '@/components/Nav';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false
    });

    if (result?.error) {
      setError('Invalid email or password');
      setLoading(false);
      return;
    }

    router.push('/dashboard');
  }

  return (
    <main>
      <Nav />
      <section className="mx-auto max-w-md px-6 py-16">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.07] p-8">
          <h1 className="text-4xl font-black">Sign in</h1>
          <p className="mt-2 text-white/60">Welcome back to Codable.</p>

          {error && (
            <p className="mt-4 rounded-xl bg-red-500/20 p-3 text-sm text-red-300">{error}</p>
          )}

          <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
            <input
              className="w-full rounded-2xl bg-white p-4 text-ink"
              placeholder="Email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="relative">
              <input
                className="w-full rounded-2xl bg-white p-4 pr-12 text-ink"
                placeholder="Password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-bold text-ink/60"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-brand px-5 py-3 font-bold disabled:opacity-60"
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>
          <p className="mt-6 text-sm text-white/60">
            No account? <Link className="text-aqua" href="/signup">Create one</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
