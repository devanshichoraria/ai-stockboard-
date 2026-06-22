import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatNumber(num: number | undefined, digits = 2): string {
  if (num === null || num === undefined || isNaN(num)) return "—"
  if (num >= 1e12) return (num / 1e12).toFixed(digits) + "T"
  if (num >= 1e9) return (num / 1e9).toFixed(digits) + "B"
  if (num >= 1e6) return (num / 1e6).toFixed(digits) + "M"
  if (num >= 1e3) return (num / 1e3).toFixed(digits) + "K"
  return num.toFixed(digits)
}

export function formatPrice(price: number | undefined): string {
  if (price === null || price === undefined || isNaN(price)) return "—"
  return price.toFixed(2)
}

export function formatPercent(num: number | undefined, digits = 2): string {
  if (num === null || num === undefined || isNaN(num)) return "—"
  const sign = num > 0 ? "+" : ""
  return `${sign}${num.toFixed(digits)}%`
}

export function formatMarketCap(num: number | undefined): string {
  return formatNumber(num, 2)
}

export function formatVolume(num: number | undefined): string {
  return formatNumber(num, 0)
}

export function getInitials(name: string): string {
  if (!name) return "??"
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

export function getDomainFromUrl(url: string): string {
  try {
    return new URL(url).hostname.replace("www.", "")
  } catch {
    return url
  }
}

export function getLogoUrl(domain: string): string {
  if (!domain) return ""
  return `https://logo.clearbit.com/${domain}`
}

export function timeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp * 1000) / 1000)
  if (seconds < 60) return "Just now"
  const minutes = Math.floor(seconds / 60)
  if (minutes < 60) return `${minutes}m ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours}h ago`
  const days = Math.floor(hours / 24)
  if (days < 30) return `${days}d ago`
  return new Date(timestamp * 1000).toLocaleDateString()
}

export function getRangeParams(range: string): { resolution: string; days: number } {
  switch (range) {
    case "1D": return { resolution: "5", days: 1 }
    case "1W": return { resolution: "15", days: 7 }
    case "1M": return { resolution: "60", days: 30 }
    case "3M": return { resolution: "D", days: 90 }
    case "6M": return { resolution: "D", days: 180 }
    case "1Y": return { resolution: "D", days: 365 }
    default: return { resolution: "D", days: 30 }
  }
}

export function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
