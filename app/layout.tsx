import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AppShell } from "@/components/layout/AppShell"

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-geist",
  display: "swap"
})

export const metadata: Metadata = {
  title: "Lumen Research — AI Stock Intelligence",
  description: "Understand any public company in under two minutes. Premium AI-powered stock research dashboard.",
  keywords: ["stocks", "finance", "AI", "investment", "market research"],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans min-h-screen bg-background`}>
        <AppShell>
          {children}
        </AppShell>
      </body>
    </html>
  )
}
