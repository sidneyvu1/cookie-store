"use client"

import { useCart } from "@/lib/cookieCart"
import { CartItem as CartItemType } from "@/lib/cookieCart"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2 } from "lucide-react"
import Image from "next/image"

type Props = {
  item: CartItemType
}

export default function CartCard({ item }: Props) {
  const { addItem, decrementItem, removeItem } = useCart()

  return (
    <div className="flex items-center gap-4 p-4">
      <div className="relative h-20 w-20 rounded-lg overflow-hidden bg-sand shrink-0">
        <Image
          src={item.cookie.image}
          alt={item.cookie.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col gap-1 flex-1">
        <h2 className="font-medium">{item.cookie.name}</h2>
        <p className="text-sm text-muted-foreground">
          ${(item.cookie.price / 100).toFixed(2)} each
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => decrementItem(item.cookie.id)}
        >
          <Minus size={14} />
        </Button>
        <span className="w-6 text-center text-sm font-medium">
          {item.quantity}
        </span>
        <Button
          variant="outline"
          size="icon"
          onClick={() => addItem(item.cookie)}
        >
          <Plus size={14} />
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <p className="font-semibold min-w-16 text-right">
          ${((item.cookie.price * item.quantity) / 100).toFixed(2)}
        </p>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => removeItem(item.cookie.id)}
        >
          <Trash2 size={16} className="text-destructive" />
        </Button>
      </div>
    </div>
  )
}