export function buildOverviewPrompt(companyName: string, ticker: string, profile: any, metrics: any) {
  return [
    {
      role: "system" as const,
      content: `You are a senior equity research analyst. Provide a concise, professional company overview in exactly 150 words or less. Output strictly as JSON.`,
    },
    {
      role: "user" as const,
      content: `Company: ${companyName} (${ticker})
Profile: ${JSON.stringify(profile, null, 2)}
Metrics: ${JSON.stringify(metrics, null, 2)}

Provide a JSON response with these exact keys:
{
  "summary": "One sentence executive summary",
  "whatTheyDo": "What the company does (2-3 sentences)",
  "products": "Key products and services (2-3 sentences)",
  "businessModel": "How they make money (2 sentences)",
  "competitivePosition": "Competitive landscape and moat (2 sentences)",
  "growthOpportunities": "Key growth drivers (2 sentences)"
}`,
    },
  ]
}
