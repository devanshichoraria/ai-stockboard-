import { NextResponse } from "next/server"
import { getStockCandles, getRangeConfig } from "@/lib/api/finnhub"
import { apiCache, getCacheKey } from "@/lib/cache"

export async function GET(
  request: Request,
  { params }: { params: { ticker: string } }
) {
  try {
    const { ticker } = params
    const { searchParams } = new URL(request.url)
    const range = searchParams.get("range") || "1M"

    const cacheKey = getCacheKey("history", ticker, range)

    const cached = apiCache.get(cacheKey)
    if (cached) {
      return NextResponse.json({ data: cached, cachedAt: new Date().toISOString() })
    }

    const config = getRangeConfig(range)
    const raw = await getStockCandles(ticker, config.resolution, config.from, config.to)

    if (raw.s === "no_data") {
      return NextResponse.json({ data: [], cachedAt: new Date().toISOString() })
    }

    const data = raw.t?.map((timestamp: number, i: number) => ({
      date: new Date(timestamp * 1000).toISOString().split("T")[0],
      close: raw.c[i],
      open: raw.o[i],
      high: raw.h[i],
      low: raw.l[i],
      volume: raw.v[i],
    })) || []

    apiCache.set(cacheKey, data, 3600) // 1 hour

    return NextResponse.json({ data, cachedAt: new Date().toISOString() })
  } catch (error: any) {
    console.error("History error:", error.message)
    return NextResponse.json(
      { error: "Failed to load historical data", data: [] },
      { status: 200 }
    )
  }
}
