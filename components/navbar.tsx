"use client"

import Link from "next/link"
import { ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cookieCart"

export default function Navbar() {
  const itemCount = useCart(state => state.itemCount)

  return (
    <nav className="border-b px-6 py-4 flex items-center justify-between">
      <Link href="/" className="font-semibold text-lg">
        Cookie Store
      </Link>
      <Link href="/cart">
        <Button variant="outline" className="flex items-center gap-2">
          <ShoppingBag size={16} />
          Cart
          {itemCount > 0 && (
            <span className="bg-espresso text-cream text-xs rounded-full px-2 py-0.5">
              {itemCount}
            </span>
          )}
        </Button>
      </Link>
    </nav>
  )
}