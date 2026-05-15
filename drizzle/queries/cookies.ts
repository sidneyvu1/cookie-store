import { db } from "@/lib/db";
import { addCookie, cookies } from "../schema";
import { eq } from "drizzle-orm";

export async function getAvailableCookies() {
    return db
        .select()
        .from(cookies)
        .where(eq(cookies.available, true))
}

export async function getAllCookies() {
    return db
        .select()
        .from(cookies)
}

export async function insertCookie(data: addCookie) {
    const result = 
        await db
            .insert(cookies)
            .values(data)
            .returning()
    return result[0]
    }


export async function toggleAvailability(id: string, available: boolean) {
    await db
        .update(cookies)
        .set({available})
        .where(eq(cookies.id, id))
}