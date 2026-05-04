"use client"

import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { createPaymentIntent } from "@/app/actions/stripe"
import { useCart } from "@/lib/cookieCart"
import CheckoutForm from "@/components/checkoutForm"
import { useEffect, useState } from "react"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const appearance = {
  variables: {
    colorBackground: '#e0d5bc'
  }
};

export default function CheckoutPage() {
  const total = useCart(state => state.total())
  const [clientSecret, setClientSecret] = useState("")

  useEffect(() => {
    createPaymentIntent(total).then(({ clientSecret }) => {
      if (clientSecret) setClientSecret(clientSecret)
    })
  }, [])

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold mb-8">Checkout</h1>
      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret, appearance }}>
          <CheckoutForm />
        </Elements>
      )}
    </main>
  )
}