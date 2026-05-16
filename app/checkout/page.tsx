"use client"

import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import CheckoutForm from "@/components/checkoutForm"
import { useCart } from "@/lib/cookieCart"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const appearance = {
  variables: {
    colorBackground: '#e0d5bc'
  }
}

export default function CheckoutPage() {
  const items = useCart(state => state.items)
  const total = useCart(state => state.total())

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold mb-8">Checkout</h1>
      <Elements stripe={stripePromise} options={{ 
        mode: "payment",
        currency: "usd",
        amount: total,
        appearance 
      }}>
        <CheckoutForm items={items} total={total} />
      </Elements>
    </main>
  )
}