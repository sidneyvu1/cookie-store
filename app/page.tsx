import CookieCard from "@/components/cookieCard"
import { getCatalogCookies } from "./actions/cookies"

export default async function Home() {
  const cookies = await getCatalogCookies()

  if (cookies.length === 0) {
    return (
      <main className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-3xl font-semibold mb-2">Unfortunately we are not currently in stock</h1>
      <p className="text-muted-foreground mb-8">Check back soon for restocks!</p>
      </main>
    )
  }
  else {
    
    return (
      <main className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-semibold mb-2">Fresh Cookies</h1>
        <p className="text-muted-foreground mb-8">Baked fresh daily. Order by noon for same-day pickup.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cookies.map((cookie) => (
            <CookieCard key={cookie.id} cookie={cookie} />
          ))}
        </div>
      </main>
    )
  }
}