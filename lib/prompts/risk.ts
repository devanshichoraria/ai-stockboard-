export function buildRiskPrompt(companyName: string, ticker: string, profile: any, metrics: any) {
  return [
    {
      role: "system" as const,
      content: `You are a senior risk analyst. Assess the key risks for this company. Output strictly as JSON.`,
    },
    {
      role: "user" as const,
      content: `Company: ${companyName} (${ticker})
Profile: ${JSON.stringify(profile, null, 2)}
Metrics: ${JSON.stringify(metrics, null, 2)}

Provide a JSON response with these exact keys:
{
  "overall": "Low | Medium | High",
  "business": "2-3 sentences on business model and operational risks",
  "competition": "2-3 sentences on competitive threats",
  "market": "2-3 sentences on market and industry risks",
  "economic": "2-3 sentences on macroeconomic and regulatory risks"
}`,
    },
  ]
}
