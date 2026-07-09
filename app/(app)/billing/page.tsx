'use client';

import { useState } from 'react';
import { Nav } from '@/components/Nav';
import { Card } from '@/components/ui/Card';
import { planCatalog } from '@/lib/builder-data';

export default function BillingPage() {
  const [loadingKey, setLoadingKey] = useState<string | null>(null);

  async function handleChoose(plan: typeof planCatalog[number]) {
    if (!plan.priceId) {
      alert('This is the free plan — no payment needed!');
      return;
    }
    setLoadingKey(plan.key);
    try {
      const response = await fetch('/api/billing/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId: plan.priceId })
      });
      const data = (await response.json()) as { checkoutUrl: string };
      window.location.href = data.checkoutUrl;
    } finally {
      setLoadingKey(null);
    }
  }

  return (
    <main>
      <Nav />
      <section className="mx-auto max-w-7xl px-6 py-10">
        <p className="text-aqua">Billing</p>
        <h1 className="text-5xl font-black">Plans and generation credits</h1>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {planCatalog.map((plan) => (
            <Card key={plan.key}>
              <h2 className="text-2xl font-bold">{plan.name}</h2>
              <p className="my-4 text-5xl font-black">${plan.price}<span className="text-base text-white/50">/mo</span></p>
              <p className="text-aqua">{plan.credits} credits</p>
              <ul className="mt-5 space-y-2 text-white/70">
                {plan.features.map((feature) => <li key={feature}>• {feature}</li>)}
              </ul>
              <button
                onClick={() => handleChoose(plan)}
                disabled={loadingKey === plan.key}
                className="mt-6 w-full rounded-full bg-white px-5 py-3 font-bold text-ink disabled:opacity-60"
              >
                {loadingKey === plan.key ? 'Redirecting…' : `Choose ${plan.name}`}
              </button>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}