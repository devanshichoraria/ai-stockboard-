export interface Company {
  ticker: string
  name: string
  exchange: string
  domain?: string
}

export interface CompanyProfile {
  name: string
  ticker: string
  exchange: string
  sector: string
  industry: string
  marketCapitalization: number
  website: string
  country: string
  logo?: string
  ceo?: string
  phone?: string
  description?: string
  currency?: string
}

export interface Quote {
  c: number
  d: number
  dp: number
  h: number
  l: number
  o: number
  pc: number
  t: number
}

export interface KeyMetrics {
  marketCap?: number
  peRatio?: number
  eps?: number
  revenue?: number
  netIncome?: number
  cashFlow?: number
  grossMargin?: number
  operatingMargin?: number
  debt?: number
  cash?: number
  dividendYield?: number
  beta?: number
  fiftyTwoWeekHigh?: number
  fiftyTwoWeekLow?: number
  volume?: number
  avgVolume?: number
}

export interface NewsItem {
  datetime: number
  headline: string
  source: string
  url: string
  summary: string
  image?: string
  sentiment?: "positive" | "neutral" | "negative"
}

export interface HistoricalDataPoint {
  date: string
  close: number
  open: number
  high: number
  low: number
  volume: number
}

export interface AIOverview {
  summary: string
  whatTheyDo: string
  products: string
  businessModel: string
  competitivePosition: string
  growthOpportunities: string
}

export interface BullBear {
  bullCase: string[]
  bearCase: string[]
  outlook: string
  confidence: "Low" | "Medium" | "High"
}

export interface RiskScore {
  overall: "Low" | "Medium" | "High"
  business: string
  competition: string
  market: string
  economic: string
}

export interface LastMonthPerformance {
  percentChange: number
  explanation: string
}

export interface HeatmapTile {
  ticker: string
  name: string
  price: number
  change: number
  changePercent: number
}

export type ChartRange = "1D" | "1W" | "1M" | "3M" | "6M" | "1Y"

export interface PortfolioHolding {
  ticker: string
  shares: number
  avgCost: number
  addedAt: string
}

export interface WatchlistItem {
  ticker: string
  addedAt: string
}

export interface ApiResponse<T> {
  data?: T
  error?: string
  cachedAt?: string
}
