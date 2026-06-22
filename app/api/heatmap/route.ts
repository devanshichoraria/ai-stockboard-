import { NextResponse } from "next/server"
import { getQuote } from "@/lib/api/finnhub"
import { apiCache, getCacheKey } from "@/lib/cache"
import companies from "@/data/companies.json"

const HEATMAP_TICKERS = [
  "AAPL", "MSFT", "GOOGL", "AMZN", "NVDA", "META", "TSLA", "AVGO", "TSM", "JPM",
  "V", "LLY", "UNH", "WMT", "XOM", "MA", "JNJ", "PG", "HD", "ORCL",
  "BAC", "KO", "ABBV", "COST", "MRK", "CVX", "CRM", "ADBE", "ACN", "AMD",
  "PEP", "TMO", "NKE", "LIN", "TM", "TXN", "MCD", "CSCO", "ABT", "DHR",
  "WFC", "INTC", "QCOM", "GE", "AMGN", "HON", "INTU", "IBM", "LOW", "CAT",
  "PM", "VZ", "SBUX", "MS", "BLK", "RTX", "GS", "PFE", "DIS", "T",
  "C", "NFLX", "PYPL", "ADP", "MDT", "BKNG", "NOW", "UBER", "LRCX", "MU",
  "SNOW", "PLTR", "COIN", "ZM", "SHOP", "CRWD", "DDOG", "NET", "TWLO", "OKTA",
  "DOCU", "MDB", "TEAM", "FTNT", "PANW", "ZS", "S", "RBLX", "U", "HOOD",
  "SOFI", "AFRM", "UPST", "RIOT", "MARA", "ARM", "SMCI", "DELL", "HPQ", "LEN",
  "TMUS", "CMCSA", "CHTR", "PARA", "WBD", "FOXA", "NYT", "DJT", "BMBL", "MTCH",
  "PINS", "SNAP", "PTON", "LULU", "DECK", "VFC", "RL", "TPR", "PVH", "LEVI",
  "CROX", "SKX", "UA", "EL", "COTY", "ELF", "ULTA", "BBWI", "HAS", "MAT",
  "GPRO", "LOGI", "SPOT", "DASH", "ABNB", "EXPE", "TRIP", "LYFT", "GRAB", "BIDU",
  "BABA", "JD", "PDD", "NIO", "XPEV", "LI", "KHC", "GIS", "K", "CPB",
  "CAG", "SJM", "HSY", "MDLZ", "MNST", "CELH", "KDP", "STZ", "DEO", "MO",
  "BTI", "TPG", "KKR", "BX", "CG", "ARES", "APO", "STT", "NTRS", "BK",
  "TROW", "IVZ", "BEN", "SEIC", "EVR", "PJT", "MC", "LAZ", "USB", "PNC",
  "TFC", "COF", "SCHW", "IBKR", "ALLY", "DFS", "SYF", "AXP", "SLM", "NAVI",
  "F", "GM", "STLA", "HMC", "RACE", "RIVN", "LCID", "PSNY", "FSR", "WKHS",
  "BLNK", "CHPT", "EVGO", "SPWR", "ENPH", "SEDG", "FSLR", "RUN", "NOVA", "BE",
  "PLUG", "BLDP", "FCEL", "NKLA", "BIIB", "GILD", "REGN", "VRTX", "ALNY", "MRNA",
  "BNTX", "NVAX", "INCY", "EXEL", "SGEN", "ARWR", "IONS", "SRPT", "FOLD", "BCRX",
  "ACAD", "NBIX", "SAGE", "PTCT", "RARE", "BMRN", "HALO", "ARVN", "KURA", "FATE",
  "NVTA", "GH", "EXAS", "MYGN", "PACB", "TWST", "DNA", "SG", "BYND", "CMG",
  "YUM", "QSR", "WEN", "SHAK", "PZZA", "DPZ", "FRSH", "MNDY", "ASAN", "SMAR",
  "WVE", "EDIT", "NTLA", "CRSP", "BEAM", "BLUE"
]

export async function GET() {
  try {
    const cacheKey = "heatmap:data"

    const cached = apiCache.get(cacheKey)
    if (cached) {
      return NextResponse.json({ data: cached, cachedAt: new Date().toISOString() })
    }

    const tickers = HEATMAP_TICKERS.slice(0, 100)
    const results = await Promise.all(
      tickers.map(async (ticker) => {
        try {
          const quote = await getQuote(ticker)
          const company = companies.find((c) => c.ticker === ticker)
          return {
            ticker,
            name: company?.name || ticker,
            price: quote.c,
            change: quote.d,
            changePercent: quote.dp,
          }
        } catch {
          return null
        }
      })
    )

    const data = results.filter(Boolean)
    apiCache.set(cacheKey, data, 60) // 60 seconds

    return NextResponse.json({ data, cachedAt: new Date().toISOString() })
  } catch (error: any) {
    console.error("Heatmap error:", error.message)
    return NextResponse.json(
      { error: "Failed to load heatmap data", data: [] },
      { status: 200 }
    )
  }
}
