/**
 * AI Service for generating captions using Ollama's tinyllama model
 */

const OLLAMA_API_URL = 'http://localhost:11434/api/generate'
const MODEL = 'tinyllama'

export interface GenerateCaptionRequest {
  url: string
}

export interface OllamaResponse {
  model: string
  created_at: string
  response: string
  done: boolean
}

/**
 * Generates a caption for a design inspiration URL using AI
 * @param url - The URL of the design inspiration
 * @returns Promise with the generated caption
 * @throws Error if the API call fails
 */
export async function generateCaption(url: string): Promise<string> {
  if (!url || url.trim() === '') {
    throw new Error('URL is required to generate a caption')
  }

  const prompt = `Generate a short, descriptive caption (maximum 2-3 sentences) for this design inspiration website: ${url}. Focus on what makes it visually interesting or noteworthy for a designer.`

  try {
    const response = await fetch(OLLAMA_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        prompt: prompt,
        stream: false,
      }),
    })

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Ollama service not found. Please ensure Ollama is running on localhost:11434')
      }
      throw new Error(`AI service error: ${response.statusText}`)
    }

    const data: OllamaResponse = await response.json()

    if (!data.response || data.response.trim() === '') {
      throw new Error('AI generated an empty response')
    }

    return data.response.trim()
  } catch (error) {
    if (error instanceof TypeError && error.message.includes('fetch')) {
      throw new Error('Cannot connect to Ollama. Please ensure Ollama is running on localhost:11434')
    }
    throw error
  }
}

/**
 * Checks if the Ollama service is available
 * @returns Promise with boolean indicating availability
 */
export async function checkOllamaAvailability(): Promise<boolean> {
  try {
    const response = await fetch('http://localhost:11434/api/tags', {
      method: 'GET',
    })
    return response.ok
  } catch {
    return false
  }
}
