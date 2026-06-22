import { NextResponse } from "next/server"
import { getQuote } from "@/lib/api/finnhub"
import { apiCache, getCacheKey } from "@/lib/cache"

export async function GET(
  request: Request,
  { params }: { params: { ticker: string } }
) {
  try {
    const { ticker } = params
    const cacheKey = getCacheKey("quote", ticker)

    const cached = apiCache.get(cacheKey)
    if (cached) {
      return NextResponse.json({ data: cached, cachedAt: new Date().toISOString() })
    }

    const data = await getQuote(ticker)
    apiCache.set(cacheKey, data, 60) // 60 seconds

    return NextResponse.json({ data, cachedAt: new Date().toISOString() })
  } catch (error: any) {
    console.error("Quote error:", error.message)
    return NextResponse.json(
      { error: "Failed to load quote", data: null },
      { status: 200 }
    )
  }
}
