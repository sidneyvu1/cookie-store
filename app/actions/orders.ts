'use server'

import { getOrders, newOrder, updateOrderStatus } from "@/drizzle/queries/orders"
import { addOrder } from "@/drizzle/schema"
import { stripe } from "@/lib/stripe"

export async function allrders() {
    return getOrders()
}

export async function addOrderAction(data: addOrder) {    
    return newOrder(data)
}

export async function updateOrder(id: string, status: string) {
    return updateOrderStatus
}