import { stripe } from "@/lib/stripe"
import { headers } from "next/headers"
import { insertOrderItems, newOrder } from "@/drizzle/queries/orders"

export async function POST(req: Request) {
const body = await req.text()
const signature = (await headers()).get("stripe-signature")!

let event

try {
    event = stripe.webhooks.constructEvent(
    body,
    signature,
    process.env.STRIPE_WEBHOOK_SECRET!
    )
} catch (err) {
    console.error("Webhook signature verification failed:", err)
    return new Response("Webhook signature verification failed", { status: 400 })
}

if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object

    const email = paymentIntent.receipt_email ?? ""
    const total = paymentIntent.amount
    const items = JSON.parse(paymentIntent.metadata?.items ?? "[]")

    const order = await newOrder({
        email,
        total,
        stripePaymentIntentId: paymentIntent.id,
        })

        if (items.length > 0) {
        await insertOrderItems(
            items.map((item: any) => ({
            orderId: order.id,
            cookieId: item.cookieId,
            quantity: item.quantity,
            priceAtPurchase: item.priceAtPurchase,
            }))
        )
        }

        console.log(`Order ${order.id} created for ${email}`)
    }

    return new Response(null, { status: 200 })
}