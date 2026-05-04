"use client"

import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cookieCart"
import { useState } from "react"
import { Input } from "./ui/input"

export default function CheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()
  const { total } = useCart()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [email, setEmail] = useState("")
  const [emailError, setEmailError] = useState<string | null>(null)

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!stripe || !elements) return

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address")
      return
    }

    setEmailError(null)
    setIsLoading(true)
    setError(null)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/confirmation`,
        receipt_email: email,
      },
    })

    if (error) {
      setError(error.message ?? "Something went wrong")
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="border rounded-xl p-6 flex flex-col gap-4">
        <h2 className="font-medium">Contact Information</h2>
        <div className="flex flex-col gap-2">
          <Input
            className="bg-mocha focus:border-espresso"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && (
            <p className="text-destructive text-sm">{emailError}</p>
          )}
        </div>
      </div>

      <div className="border rounded-xl p-6">
        <h2 className="font-medium mb-4">Payment</h2>
        <PaymentElement />
      </div>

      <div className="border rounded-xl p-6 flex justify-between items-center">
        <span className="font-medium">Total</span>
        <span className="text-lg font-semibold">
          ${(total() / 100).toFixed(2)}
        </span>
      </div>

      {error && (
        <p className="text-destructive text-sm">{error}</p>
      )}

      <Button disabled={!stripe || isLoading} className="w-full">
        {isLoading ? "Processing..." : "Pay Now"}
      </Button>
    </form>
  )
}