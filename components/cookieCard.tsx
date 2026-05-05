"use client"

import { Cookie } from "@/lib/cookies"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { useCart } from "@/lib/cookieCart"

type Props = {
  cookie: Cookie
}

export default function CookieCard({ cookie }: Props) {
  const addItem = useCart(state => state.addItem)

  return (
    <Card className="flex flex-col overflow-hidden">
      <div className="relative h-80 w-full bg-amber-50">
        <Image
          src={cookie.image}
          alt={cookie.name}
          fill
          className="object-cover"
        />
      </div>
      <CardContent className="flex flex-col gap-2 pt-4">
        <div className="flex items-center justify-between">
          <h2 className="font-medium text-lg">{cookie.name}</h2>
          <Badge variant="secondary">
            ${(cookie.price / 100).toFixed(2)}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">{cookie.description}</p>
      </CardContent>
      <CardFooter className="mt-auto pt-0 border-0 bg-cream">
        <Button className="w-full" onClick={() => addItem(cookie)}>
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  )
}