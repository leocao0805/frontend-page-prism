import { generateCaption, checkOllamaAvailability } from './aiService'

// Mock fetch globally
global.fetch = jest.fn()

describe('aiService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('generateCaption', () => {
    test('throws error when URL is empty', async () => {
      await expect(generateCaption('')).rejects.toThrow('URL is required')
    })

    test('calls Ollama API with correct parameters', async () => {
      const mockResponse = {
        model: 'tinyllama',
        created_at: '2025-01-15T10:00:00Z',
        response: 'A beautiful modern design with clean lines',
        done: true,
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const result = await generateCaption('https://example.com/design')

      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:11434/api/generate',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: expect.stringContaining('tinyllama'),
        })
      )

      expect(result).toBe('A beautiful modern design with clean lines')
    })

    test('includes URL in the prompt', async () => {
      const mockResponse = {
        response: 'Test caption',
        done: true,
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      await generateCaption('https://test.com')

      const callArgs = (global.fetch as jest.Mock).mock.calls[0][1]
      const body = JSON.parse(callArgs.body)
      
      expect(body.prompt).toContain('https://test.com')
      expect(body.stream).toBe(false)
    })

    test('throws error when Ollama service returns 404', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found',
      })

      await expect(generateCaption('https://example.com')).rejects.toThrow(
        'Ollama service not found'
      )
    })

    test('throws error when API returns non-ok response', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      })

      await expect(generateCaption('https://example.com')).rejects.toThrow(
        'AI service error'
      )
    })

    test('throws error when AI returns empty response', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ response: '', done: true }),
      })

      await expect(generateCaption('https://example.com')).rejects.toThrow(
        'AI generated an empty response'
      )
    })

    test('throws error when fetch fails (network error)', async () => {
      ;(global.fetch as jest.Mock).mockRejectedValueOnce(
        new TypeError('Failed to fetch')
      )

      await expect(generateCaption('https://example.com')).rejects.toThrow(
        'Cannot connect to Ollama'
      )
    })

    test('trims whitespace from AI response', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          response: '  Caption with spaces  ',
          done: true,
        }),
      })

      const result = await generateCaption('https://example.com')
      expect(result).toBe('Caption with spaces')
    })
  })

  describe('checkOllamaAvailability', () => {
    test('returns true when Ollama is available', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
      })

      const result = await checkOllamaAvailability()
      expect(result).toBe(true)
    })

    test('returns false when Ollama is not available', async () => {
      ;(global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Connection failed'))

      const result = await checkOllamaAvailability()
      expect(result).toBe(false)
    })

    test('returns false when API returns error', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
      })

      const result = await checkOllamaAvailability()
      expect(result).toBe(false)
    })
  })
})
