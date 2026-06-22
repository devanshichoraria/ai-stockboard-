export function buildLastMonthPrompt(
  companyName: string, 
  ticker: string, 
  priceChange: number, 
  news: any[]
) {
  return [
    {
      role: "system" as const,
      content: `You are a market analyst. Explain the last month's price performance. Output strictly as JSON.`,
    },
    {
      role: "user" as const,
      content: `Company: ${companyName} (${ticker})
Last Month Price Change: ${priceChange.toFixed(2)}%
Recent News Headlines: ${news.slice(0, 5).map((n: any) => n.headline).join("; ")}

Provide a JSON response with these exact keys:
{
  "percentChange": ${priceChange},
  "explanation": "2-3 sentences explaining the price movement in context of news and market conditions"
}`,
    },
  ]
}
