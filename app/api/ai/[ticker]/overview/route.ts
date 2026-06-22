import { NextResponse } from "next/server"
import { generateStructuredJSON } from "@/lib/api/openrouter"
import { buildOverviewPrompt } from "@/lib/prompts/overview"
import { getCompanyProfile, getBasicFinancials } from "@/lib/api/finnhub"
import { apiCache, getCacheKey } from "@/lib/cache"

export async function GET(
  request: Request,
  { params }: { params: { ticker: string } }
) {
  try {
    const { ticker } = params
    const cacheKey = getCacheKey("ai-overview", ticker)

    const cached = apiCache.get(cacheKey)
    if (cached) {
      return NextResponse.json({ data: cached, cachedAt: new Date().toISOString() })
    }

    const [profile, metrics] = await Promise.all([
      getCompanyProfile(ticker).catch(() => null),
      getBasicFinancials(ticker).catch(() => null),
    ])

    if (!profile || !profile.name) {
      return NextResponse.json({ error: "Company profile not available", data: null }, { status: 200 })
    }

    const messages = buildOverviewPrompt(profile.name, ticker, profile, metrics)
    const data = await generateStructuredJSON(messages)

    apiCache.set(cacheKey, data, 86400) // 24 hours

    return NextResponse.json({ data, cachedAt: new Date().toISOString() })
  } catch (error: any) {
    console.error("AI Overview error:", error.message)
    return NextResponse.json(
      { error: "Failed to generate AI overview", data: null },
      { status: 200 }
    )
  }
}
