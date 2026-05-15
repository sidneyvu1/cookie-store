"use client"

import { addCookie } from "@/app/actions/cookies"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function AdminPage() {
  const [message, setMessage] = useState<string | null>(null)

  async function handleSubmit(formData: FormData) {
    const result = await addCookie(formData)
    if (result.error) {
      setMessage(`Error: ${result.error}`)
    } else {
      setMessage("Cookie added successfully!")
    }
  }

  return (
    <main className="max-w-xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold mb-8">Add Cookie</h1>
      <form action={handleSubmit} className="flex flex-col gap-4">
        <Input name="name" placeholder="Cookie name" required />
        <Input name="description" placeholder="Description" required />
        <Input name="price" type="number" placeholder="Price (e.g. 3.50)" step="0.01" required />
        <Input name="image" type="file" accept="image/*" required />
        <Button type="submit">Add Cookie</Button>
      </form>
      {message && <p className="mt-4 text-sm">{message}</p>}
    </main>
  )
}