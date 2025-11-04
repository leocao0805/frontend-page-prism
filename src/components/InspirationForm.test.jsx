import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import InspirationForm from './InspirationForm'
import * as aiService from '../services/aiService'

// Mock the AI service
jest.mock('../services/aiService')

describe('InspirationForm', () => {
  test('renders form fields correctly', () => {
    render(<InspirationForm onSubmit={jest.fn()} projectId="test-123" />)
    
    expect(screen.getByLabelText(/screenshot url/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/notes/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /add inspiration/i })).toBeInTheDocument()
  })

  test('shows validation error when URL is empty', async () => {
    const mockSubmit = jest.fn()
    render(<InspirationForm onSubmit={mockSubmit} projectId="test-123" />)
    
    const submitButton = screen.getByRole('button', { name: /add inspiration/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/screenshot url is required/i)).toBeInTheDocument()
    })
    expect(mockSubmit).not.toHaveBeenCalled()
  })

  test('shows validation error for invalid URL', async () => {
    const mockSubmit = jest.fn()
    render(<InspirationForm onSubmit={mockSubmit} projectId="test-123" />)
    
    const urlInput = screen.getByLabelText(/screenshot url/i)
    fireEvent.change(urlInput, { target: { value: 'not-a-valid-url' } })
    fireEvent.click(screen.getByRole('button', { name: /add inspiration/i }))
    
    await waitFor(() => {
      expect(screen.getByText(/please enter a valid url/i)).toBeInTheDocument()
    })
    expect(mockSubmit).not.toHaveBeenCalled()
  })

  test('calls onSubmit with form data when valid', async () => {
    const mockSubmit = jest.fn().mockResolvedValue()
    render(<InspirationForm onSubmit={mockSubmit} projectId="test-123" />)
    
    const urlInput = screen.getByLabelText(/screenshot url/i)
    const notesInput = screen.getByLabelText(/notes/i)
    
    fireEvent.change(urlInput, { target: { value: 'https://example.com/image.png' } })
    fireEvent.change(notesInput, { target: { value: 'Great design inspiration' } })
    fireEvent.click(screen.getByRole('button', { name: /add inspiration/i }))
    
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        projectId: 'test-123',
        websiteMetadata: {
          url: 'https://example.com/image.png',
          title: 'https://example.com/image.png',
          favicon: '',
        },
        notes: 'Great design inspiration',
      })
    })
  })

  test('shows loading state while submitting', async () => {
    const mockSubmit = jest.fn(() => new Promise(resolve => setTimeout(resolve, 100)))
    render(<InspirationForm onSubmit={mockSubmit} projectId="test-123" />)
    
    const urlInput = screen.getByLabelText(/screenshot url/i)
    fireEvent.change(urlInput, { target: { value: 'https://example.com' } })
    fireEvent.click(screen.getByRole('button', { name: /add inspiration/i }))
    
    expect(screen.getByText(/adding.../i)).toBeInTheDocument()
    
    await waitFor(() => {
      expect(screen.getByText(/add inspiration/i)).toBeInTheDocument()
    })
  })

  test('resets form after successful submission', async () => {
    const mockSubmit = jest.fn().mockResolvedValue()
    render(<InspirationForm onSubmit={mockSubmit} projectId="test-123" />)
    
    const urlInput = screen.getByLabelText(/screenshot url/i)
    const notesInput = screen.getByLabelText(/notes/i)
    
    fireEvent.change(urlInput, { target: { value: 'https://example.com' } })
    fireEvent.change(notesInput, { target: { value: 'Test notes' } })
    fireEvent.click(screen.getByRole('button', { name: /add inspiration/i }))
    
    await waitFor(() => {
      expect(urlInput.value).toBe('')
      expect(notesInput.value).toBe('')
    })
  })

  test('renders in edit mode with initial data', () => {
    const initialData = {
      websiteMetadata: { url: 'https://example.com/image.png' },
      notes: 'Existing notes',
    }
    render(
      <InspirationForm
        onSubmit={jest.fn()}
        projectId="test-123"
        initialData={initialData}
      />
    )
    
    expect(screen.getByLabelText(/screenshot url/i).value).toBe('https://example.com/image.png')
    expect(screen.getByLabelText(/notes/i).value).toBe('Existing notes')
    expect(screen.getByRole('button', { name: /update inspiration/i })).toBeInTheDocument()
  })

  test('submits update without projectId in edit mode', async () => {
    const mockSubmit = jest.fn().mockResolvedValue()
    const initialData = {
      websiteMetadata: { url: 'https://example.com', favicon: 'favicon.ico' },
      notes: 'Old notes',
    }
    render(
      <InspirationForm
        onSubmit={mockSubmit}
        projectId="test-123"
        initialData={initialData}
      />
    )
    
    const notesInput = screen.getByLabelText(/notes/i)
    fireEvent.change(notesInput, { target: { value: 'Updated notes' } })
    fireEvent.click(screen.getByRole('button', { name: /update inspiration/i }))
    
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        websiteMetadata: {
          url: 'https://example.com',
          title: 'https://example.com',
          favicon: 'favicon.ico',
        },
        notes: 'Updated notes',
      })
    })
    // Should not include projectId in edit mode
    expect(mockSubmit.mock.calls[0][0]).not.toHaveProperty('projectId')
  })

  describe('AI Caption Generation', () => {
    beforeEach(() => {
      jest.clearAllMocks()
    })

    test('renders AI generate button', () => {
      render(<InspirationForm onSubmit={jest.fn()} projectId="test-123" />)
      expect(screen.getByText(/generate caption with ai/i)).toBeInTheDocument()
    })

    test('AI button is disabled when URL is empty', () => {
      render(<InspirationForm onSubmit={jest.fn()} projectId="test-123" />)
      const aiButton = screen.getByText(/generate caption with ai/i)
      expect(aiButton).toBeDisabled()
    })

    test('AI button is enabled when URL is provided', () => {
      render(<InspirationForm onSubmit={jest.fn()} projectId="test-123" />)
      const urlInput = screen.getByLabelText(/screenshot url/i)
      fireEvent.change(urlInput, { target: { value: 'https://example.com' } })
      
      const aiButton = screen.getByText(/generate caption with ai/i)
      expect(aiButton).not.toBeDisabled()
    })

    test('generates caption and populates notes field', async () => {
      const mockGenerateCaption = aiService.generateCaption
      mockGenerateCaption.mockResolvedValue('AI generated caption for this design')

      render(<InspirationForm onSubmit={jest.fn()} projectId="test-123" />)
      
      const urlInput = screen.getByLabelText(/screenshot url/i)
      fireEvent.change(urlInput, { target: { value: 'https://example.com' } })
      
      const aiButton = screen.getByText(/generate caption with ai/i)
      fireEvent.click(aiButton)

      expect(screen.getByText(/generating.../i)).toBeInTheDocument()

      await waitFor(() => {
        expect(mockGenerateCaption).toHaveBeenCalledWith('https://example.com')
      })

      await waitFor(() => {
        expect(screen.getByLabelText(/notes/i).value).toBe('AI generated caption for this design')
      })
    })

    test('shows error when AI generation fails', async () => {
      const mockGenerateCaption = aiService.generateCaption
      mockGenerateCaption.mockRejectedValue(new Error('Ollama service not available'))

      render(<InspirationForm onSubmit={jest.fn()} projectId="test-123" />)
      
      const urlInput = screen.getByLabelText(/screenshot url/i)
      fireEvent.change(urlInput, { target: { value: 'https://example.com' } })
      
      const aiButton = screen.getByText(/generate caption with ai/i)
      fireEvent.click(aiButton)

      await waitFor(() => {
        expect(screen.getByText(/ollama service not available/i)).toBeInTheDocument()
      })
    })

    test('validates URL before generating caption', async () => {
      render(<InspirationForm onSubmit={jest.fn()} projectId="test-123" />)
      
      const urlInput = screen.getByLabelText(/screenshot url/i)
      fireEvent.change(urlInput, { target: { value: 'invalid-url' } })
      
      const aiButton = screen.getByText(/generate caption with ai/i)
      fireEvent.click(aiButton)

      await waitFor(() => {
        expect(screen.getByText(/please enter a valid url first/i)).toBeInTheDocument()
      })

      expect(aiService.generateCaption).not.toHaveBeenCalled()
    })

    test('allows user to edit AI-generated caption', async () => {
      const mockGenerateCaption = aiService.generateCaption
      mockGenerateCaption.mockResolvedValue('AI caption')

      render(<InspirationForm onSubmit={jest.fn()} projectId="test-123" />)
      
      const urlInput = screen.getByLabelText(/screenshot url/i)
      fireEvent.change(urlInput, { target: { value: 'https://example.com' } })
      
      const aiButton = screen.getByText(/generate caption with ai/i)
      fireEvent.click(aiButton)

      await waitFor(() => {
        expect(screen.getByLabelText(/notes/i).value).toBe('AI caption')
      })

      const notesInput = screen.getByLabelText(/notes/i)
      fireEvent.change(notesInput, { target: { value: 'AI caption - edited by user' } })

      expect(notesInput.value).toBe('AI caption - edited by user')
    })
  })
})
