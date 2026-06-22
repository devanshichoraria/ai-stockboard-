import { NextResponse } from "next/server"
import { generateStructuredJSON } from "@/lib/api/openrouter"
import { buildLastMonthPrompt } from "@/lib/prompts/lastMonth"
import { getCompanyNews, getStockCandles, getRangeConfig } from "@/lib/api/finnhub"
import { apiCache, getCacheKey } from "@/lib/cache"

export async function GET(
  request: Request,
  { params }: { params: { ticker: string } }
) {
  try {
    const { ticker } = params
    const cacheKey = getCacheKey("ai-lastmonth", ticker)

    const cached = apiCache.get(cacheKey)
    if (cached) {
      return NextResponse.json({ data: cached, cachedAt: new Date().toISOString() })
    }

    const now = new Date()
    const to = now.toISOString().split("T")[0]
    const from = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]

    const [news, history] = await Promise.all([
      getCompanyNews(ticker, from, to).catch(() => []),
      getStockCandles(ticker, "D", Math.floor(Date.now() / 1000) - 2592000, Math.floor(Date.now() / 1000)).catch(() => null),
    ])

    let priceChange = 0
    if (history && history.c && history.c.length > 1) {
      const first = history.c[0]
      const last = history.c[history.c.length - 1]
      priceChange = ((last - first) / first) * 100
    }

    const messages = buildLastMonthPrompt(ticker, ticker, priceChange, news || [])
    const data = await generateStructuredJSON(messages)

    apiCache.set(cacheKey, data, 86400) // 24 hours

    return NextResponse.json({ data, cachedAt: new Date().toISOString() })
  } catch (error: any) {
    console.error("AI LastMonth error:", error.message)
    return NextResponse.json(
      { error: "Failed to generate last month analysis", data: null },
      { status: 200 }
    )
  }
}
