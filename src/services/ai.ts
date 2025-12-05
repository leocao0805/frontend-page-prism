const OLLAMA_API_URL = 'http://localhost:11434/api/generate'

export async function rewriteDescription(description: string): Promise<string> {
  const prompt = `Rewrite this project description to be clearer and professional:\n\n"${description}"`

  const response = await fetch(OLLAMA_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'tinyllama',
      prompt,
      stream: false,
    }),
  })

  if (!response.ok) {
    throw new Error('AI API error')
  }

  const data = await response.json()
  return data.response.trim()
}

