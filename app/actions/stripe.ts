"use server"

import { stripe } from "@/lib/stripe"

export async function createPaymentIntent(total: number) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
    automatic_payment_methods: { enabled: true },
  })

  return { clientSecret: paymentIntent.client_secret }
}