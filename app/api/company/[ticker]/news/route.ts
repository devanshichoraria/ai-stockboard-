import { NextResponse } from "next/server"
import { getCompanyNews } from "@/lib/api/finnhub"
import { apiCache, getCacheKey } from "@/lib/cache"

export async function GET(
  request: Request,
  { params }: { params: { ticker: string } }
) {
  try {
    const { ticker } = params
    const cacheKey = getCacheKey("news", ticker)

    const cached = apiCache.get(cacheKey)
    if (cached) {
      return NextResponse.json({ data: cached, cachedAt: new Date().toISOString() })
    }

    const now = new Date()
    const to = now.toISOString().split("T")[0]
    const from = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]

    const data = await getCompanyNews(ticker, from, to)
    apiCache.set(cacheKey, data, 900) // 15 minutes

    return NextResponse.json({ data: data?.slice(0, 8) || [], cachedAt: new Date().toISOString() })
  } catch (error: any) {
    console.error("News error:", error.message)
    return NextResponse.json(
      { error: "Failed to load news", data: [] },
      { status: 200 }
    )
  }
}
