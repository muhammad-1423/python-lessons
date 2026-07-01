import { NextResponse } from 'next/server';
import { stripe } from '@/lib/billing/stripe';

export async function POST(request: Request) {
  const { priceId } = (await request.json()) as { priceId?: string };

  if (!stripe || !priceId) {
    return NextResponse.json({ checkoutUrl: '/billing', mode: 'demo' });
  }

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?checkout=success`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/billing?checkout=cancelled`
  });

  return NextResponse.json({ checkoutUrl: session.url });
}
