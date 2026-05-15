'use server'

import { getAvailableCookies, insertCookie, getAllCookies, toggleAvailability} from "@/drizzle/queries/cookies"
import { supabaseAdmin } from "@/lib/supabase"
import { revalidatePath } from "next/cache"
import { v4 as uuidv4 } from "uuid"

export async function getCatalogCookies() {
    return getAvailableCookies()
}

export async function getAdminCookies() {
    return getAllCookies()
}

export async function addCookie(formData: FormData) {
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const price = Number(formData.get("price"))
    const image = formData.get("image") as File

    if (!name || !description || !price || !image) {
        return { error: "All fields are required" }
    }

    const imageKey = `${uuidv4()}-${image.name}`

    const buffer = Buffer.from(await image.arrayBuffer())

    const { error: uploadError } = await supabaseAdmin.storage
        .from("cookie-images")
        .upload(imageKey, buffer, {
            contentType: image.type,
            upsert: false,
        })

    if (uploadError) {
        return { error: `Image upload failed: ${uploadError.message}` }
    }

    const { data: urlData } = supabaseAdmin.storage
        .from("cookie-images")
        .getPublicUrl(imageKey)

    const cookie = await insertCookie({
        name,
        description,
        price: Math.round(price * 100), 
        imageUrl: urlData.publicUrl,
        imageKey,
    })

    revalidatePath("/")
    revalidatePath("/admin/cookies")

    return { cookie }
}

export async function toggleCookie(id: string, available: boolean) {
    await toggleAvailability(id, available)

    revalidatePath("/")
    revalidatePath("/admin/cookies")

    return { success: true }
}