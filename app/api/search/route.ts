import { NextResponse } from "next/server"
import companies from "@/data/companies.json"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")?.toLowerCase() || ""

    if (!query) {
      return NextResponse.json({ data: [], count: 0 })
    }

    const results = companies
      .filter((company) => {
        const nameMatch = company.name.toLowerCase().includes(query)
        const tickerMatch = company.ticker.toLowerCase().startsWith(query)
        return nameMatch || tickerMatch
      })
      .slice(0, 8)

    return NextResponse.json({ data: results, count: results.length })
  } catch (error) {
    console.error("Search error:", error)
    return NextResponse.json(
      { error: "Search failed", data: [] },
      { status: 200 }
    )
  }
}
