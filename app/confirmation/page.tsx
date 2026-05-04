"use client"

import { useEffect } from "react"
import { useCart } from "@/lib/cookieCart"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, XCircle } from "lucide-react"

export default function ConfirmationPage() {
  const clearCart = useCart(state => state.clearCart)
  const searchParams = useSearchParams()
  const redirectStatus = searchParams.get("redirect_status")

  useEffect(() => {
    if (redirectStatus === "succeeded") {
      clearCart()
    }
  }, [redirectStatus])

  if (redirectStatus === "succeeded") {
    return (
      <main className="max-w-3xl mx-auto px-6 py-12 text-center">
        <div className="flex flex-col items-center gap-4">
          <CheckCircle size={64} className="text-green-500" />
          <h1 className="text-3xl font-semibold">Order Confirmed!</h1>
          <p className="text-muted-foreground">
            Thanks for your order. We'll have your cookies ready soon.
          </p>
          <Link href="/">
            <Button className="mt-4">Order More Cookies</Button>
          </Link>
        </div>
      </main>
    )
  }

  if (redirectStatus === "processing") {
    return (
      <main className="max-w-3xl mx-auto px-6 py-12 text-center">
        <div className="flex flex-col items-center gap-4">
          <Clock size={64} className="text-yellow-500" />
          <h1 className="text-3xl font-semibold">Payment Processing</h1>
          <p className="text-muted-foreground">
            Your payment is being processed. We'll send you a confirmation email once it's complete.
          </p>
          <Link href="/">
            <Button className="mt-4" variant="outline">Back to Home</Button>
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-12 text-center">
      <div className="flex flex-col items-center gap-4">
        <XCircle size={64} className="text-destructive" />
        <h1 className="text-3xl font-semibold">Payment Failed</h1>
        <p className="text-muted-foreground">
          Something went wrong with your payment. Your cart has been saved.
        </p>
        <Link href="/checkout">
          <Button className="mt-4">Try Again</Button>
        </Link>
      </div>
    </main>
  )
}