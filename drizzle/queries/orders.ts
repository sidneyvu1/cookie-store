import { db } from "@/lib/db";
import { addOrder, addOrderItem, orderItems, orders, orderStatusEnum } from "../schema";
import { eq } from "drizzle-orm";

export async function getOrders() {
    return db.select()
        .from(orders)
        .orderBy(orders.createdAt)
}

export async function newOrder(data: addOrder) {
    const result = await db
        .insert(orders)
        .values(data)
        .returning()
    return result[0]
    }

export async function insertOrderItems(items:addOrderItem[]) {
    await db
        .insert(orderItems)
        .values(items)
    }

export async function updateOrderStatus(
        orderId: string,
        status: "pending" | "preparing" | "ready" | "completed" | "cancelled"
        ) {
    await db
        .update(orders)
        .set({ status })
        .where(eq(orders.id, orderId))
    }