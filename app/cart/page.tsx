"use client"

import { useCart } from "@/lib/cookieCart"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import CartCard from "@/components/cartCard"

export default function CartPage() {
  const { items, total, itemCount } = useCart()

  if (itemCount === 0) {
    return (
      <main className="max-w-3xl mx-auto px-6 py-12 text-center">
        <h1 className="text-3xl font-semibold mb-4">Your Cart</h1>
        <p className="text-muted-foreground mb-8">Nothing here yet.</p>
        <Link href="/">
          <Button>Browse Cookies</Button>
        </Link>
      </main>
    )
  } 

  return (
    <main className="max-w-3xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold mb-8">Your Cart</h1>

      <div className="flex flex-col divide-y divide-espresso rounded-xl overflow-hidden">
        {items.map((item) => (
          <CartCard key={item.cookie.id} item={item} />
        ))}
      </div>

      <div className="mt-8 border-t pt-6 flex flex-col gap-4">
        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>${(total() / 100).toFixed(2)}</span>
        </div>
        <div className="flex gap-3">
          <Link href="/" className="flex-1">
            <Button variant="outline" className="w-full">
              Keep Shopping
            </Button>
          </Link>
          <Link href="/checkout" className="flex-1">
            <Button className="w-full">
              Checkout
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}