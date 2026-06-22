export function buildBullBearPrompt(companyName: string, ticker: string, profile: any, metrics: any, news: any[]) {
  return [
    {
      role: "system" as const,
      content: `You are a senior equity research analyst. Provide a balanced bull vs bear case analysis. Output strictly as JSON.`,
    },
    {
      role: "user" as const,
      content: `Company: ${companyName} (${ticker})
Profile: ${JSON.stringify(profile, null, 2)}
Metrics: ${JSON.stringify(metrics, null, 2)}
Recent News Headlines: ${news.slice(0, 5).map((n: any) => n.headline).join("; ")}

Provide a JSON response with these exact keys:
{
  "bullCase": ["3-4 bullet points for the bull case"],
  "bearCase": ["3-4 bullet points for the bear case"],
  "outlook": "One sentence overall outlook (Cautiously Optimistic / Neutral / Cautiously Pessimistic)",
  "confidence": "High | Medium | Low"
}`,
    },
  ]
}
