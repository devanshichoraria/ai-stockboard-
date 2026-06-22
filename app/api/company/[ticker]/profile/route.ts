import { NextResponse } from "next/server"
import { getCompanyProfile } from "@/lib/api/finnhub"
import { apiCache, getCacheKey } from "@/lib/cache"

export async function GET(
  request: Request,
  { params }: { params: { ticker: string } }
) {
  try {
    const { ticker } = params
    const cacheKey = getCacheKey("profile", ticker)

    const cached = apiCache.get(cacheKey)
    if (cached) {
      return NextResponse.json({ data: cached, cachedAt: new Date().toISOString() })
    }

    const data = await getCompanyProfile(ticker)
    apiCache.set(cacheKey, data, 86400) // 24 hours

    return NextResponse.json({ data, cachedAt: new Date().toISOString() })
  } catch (error: any) {
    console.error("Profile error:", error.message)
    return NextResponse.json(
      { error: "Failed to load company profile", data: null },
      { status: 200 }
    )
  }
}
