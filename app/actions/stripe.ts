"use server"

import { stripe } from "@/lib/stripe"
import { CartItem } from "@/lib/cookieCart"

export async function createPaymentIntent(
  total: number,
  email: string,
  items: CartItem[]
) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
    automatic_payment_methods: { enabled: true },
    receipt_email: email,
    metadata: {
      items: JSON.stringify(items.map(item => ({
        cookieId: item.cookie.id,
        quantity: item.quantity,
        priceAtPurchase: item.cookie.price,
      }))),
    }
  })

  return { clientSecret: paymentIntent.client_secret }
}