import { NextResponse } from "next/server"
import { generateStructuredJSON } from "@/lib/api/openrouter"
import { buildBullBearPrompt } from "@/lib/prompts/bullBear"
import { getCompanyProfile, getBasicFinancials, getCompanyNews } from "@/lib/api/finnhub"
import { apiCache, getCacheKey } from "@/lib/cache"

export async function GET(
  request: Request,
  { params }: { params: { ticker: string } }
) {
  try {
    const { ticker } = params
    const cacheKey = getCacheKey("ai-bullbear", ticker)

    const cached = apiCache.get(cacheKey)
    if (cached) {
      return NextResponse.json({ data: cached, cachedAt: new Date().toISOString() })
    }

    const now = new Date()
    const to = now.toISOString().split("T")[0]
    const from = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]

    const [profile, metrics, news] = await Promise.all([
      getCompanyProfile(ticker).catch(() => null),
      getBasicFinancials(ticker).catch(() => null),
      getCompanyNews(ticker, from, to).catch(() => []),
    ])

    if (!profile || !profile.name) {
      return NextResponse.json({ error: "Company profile not available", data: null }, { status: 200 })
    }

    const messages = buildBullBearPrompt(profile.name, ticker, profile, metrics, news || [])
    const data = await generateStructuredJSON(messages)

    apiCache.set(cacheKey, data, 86400) // 24 hours

    return NextResponse.json({ data, cachedAt: new Date().toISOString() })
  } catch (error: any) {
    console.error("AI BullBear error:", error.message)
    return NextResponse.json(
      { error: "Failed to generate bull/bear analysis", data: null },
      { status: 200 }
    )
  }
}
