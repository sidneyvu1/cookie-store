import 'server-only'
import Stripe from 'stripe'

const stripeKey = process.env.STRIPE_SECRET_KEY;

if (!stripeKey) {
  throw new Error(
    'Missing STRIPE_SECRET_KEY. Please set it in your .env.local file.'
  );
}

export const stripe = new Stripe(stripeKey)