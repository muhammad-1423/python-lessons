import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/billing/stripe';
import { prisma } from '@/lib/db';
import type Stripe from 'stripe';

export async function POST(request: Request) {
  if (!stripe) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 500 });
  }

  const body = await request.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature');

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (error) {
    console.error('Webhook signature verification failed:', error);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const customerId = session.customer as string;
    const subscriptionId = session.subscription as string;

    if (subscriptionId && stripe) {
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      const priceId = subscription.items.data[0]?.price.id;

      let plan: 'FREE' | 'PRO' | 'TEAM' = 'FREE';
      if (priceId === process.env.STRIPE_PRO_PRICE_ID) plan = 'PRO';
      if (priceId === process.env.STRIPE_TEAM_PRICE_ID) plan = 'TEAM';

      const userId = session.client_reference_id;
      if (userId) {
        const existing = await prisma.subscription.findFirst({ where: { userId } });
        if (existing) {
          await prisma.subscription.update({
            where: { id: existing.id },
            data: {
              plan,
              stripeCustomerId: customerId,
              stripeSubscriptionId: subscriptionId,
              status: 'active',
              credits: plan === 'PRO' ? 500 : plan === 'TEAM' ? 2500 : 25
            }
          });
        } else {
          await prisma.subscription.create({
            data: {
              userId,
              plan,
              stripeCustomerId: customerId,
              stripeSubscriptionId: subscriptionId,
              status: 'active',
              credits: plan === 'PRO' ? 500 : plan === 'TEAM' ? 2500 : 25
            }
          });
        }
      
      }
    }
  }

  return NextResponse.json({ received: true });
}