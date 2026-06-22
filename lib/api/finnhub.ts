const FINNHUB_API_KEY = process.env.FINNHUB_API_KEY
const BASE_URL = "https://finnhub.io/api/v1"

async function fetchFinnhub(endpoint: string, params: Record<string, string> = {}) {
  const url = new URL(`${BASE_URL}${endpoint}`)
  url.searchParams.append("token", FINNHUB_API_KEY || "")
  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.append(key, value)
  })

  const res = await fetch(url.toString(), { next: { revalidate: 0 } })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Finnhub API error: ${res.status} ${text}`)
  }
  return res.json()
}

export async function getCompanyProfile(symbol: string) {
  return fetchFinnhub("/stock/profile2", { symbol: symbol.toUpperCase() })
}

export async function getQuote(symbol: string) {
  return fetchFinnhub("/quote", { symbol: symbol.toUpperCase() })
}

export async function getStockCandles(symbol: string, resolution: string, from: number, to: number) {
  return fetchFinnhub("/stock/candle", {
    symbol: symbol.toUpperCase(),
    resolution,
    from: String(from),
    to: String(to),
  })
}

export async function getCompanyNews(symbol: string, from: string, to: string) {
  return fetchFinnhub("/company-news", {
    symbol: symbol.toUpperCase(),
    from,
    to,
  })
}

export async function getBasicFinancials(symbol: string) {
  return fetchFinnhub("/stock/metric", {
    symbol: symbol.toUpperCase(),
    metric: "all",
  })
}

export function getRangeConfig(range: string) {
  const now = Math.floor(Date.now() / 1000)
  switch (range) {
    case "1D":
      return { resolution: "5", from: now - 86400, to: now }
    case "1W":
      return { resolution: "15", from: now - 604800, to: now }
    case "1M":
      return { resolution: "60", from: now - 2592000, to: now }
    case "3M":
      return { resolution: "D", from: now - 7776000, to: now }
    case "6M":
      return { resolution: "D", from: now - 15552000, to: now }
    case "1Y":
      return { resolution: "D", from: now - 31536000, to: now }
    default:
      return { resolution: "D", from: now - 2592000, to: now }
  }
}
