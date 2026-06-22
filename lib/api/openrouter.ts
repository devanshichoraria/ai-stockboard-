const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY
const BASE_URL = "https://openrouter.ai/api/v1"

export async function generateAIResponse(
  messages: { role: string; content: string }[],
  model: string = "anthropic/claude-3.5-sonnet",
  responseFormat?: { type: string }
) {
  const body: any = {
    model,
    messages,
    temperature: 0.7,
    max_tokens: 2000,
  }

  if (responseFormat) {
    body.response_format = responseFormat
  }

  const res = await fetch(`${BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
      "HTTP-Referer": "https://lumen-research.vercel.app",
      "X-Title": "Lumen Research",
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`OpenRouter API error: ${res.status} ${text}`)
  }

  const data = await res.json()
  return data.choices?.[0]?.message?.content || ""
}

export async function generateStructuredJSON(
  messages: { role: string; content: string }[],
  model: string = "anthropic/claude-3.5-sonnet"
) {
  const content = await generateAIResponse(messages, model, { type: "json_object" })
  try {
    return JSON.parse(content)
  } catch (e) {
    // Try to extract JSON from markdown code blocks
    const jsonMatch = content.match(/```json\n?([\s\S]*?)\n?```/) || content.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      return JSON.parse(jsonMatch[1] || jsonMatch[0])
    }
    throw new Error("Failed to parse AI response as JSON")
  }
}
