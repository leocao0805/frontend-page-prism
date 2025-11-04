import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ProjectForm from './ProjectForm'

describe('ProjectForm', () => {
  test('renders form fields correctly', () => {
    render(<ProjectForm onSubmit={jest.fn()} />)
    
    expect(screen.getByLabelText(/project name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /create project/i })).toBeInTheDocument()
  })

  test('shows validation error when name is empty', async () => {
    const mockSubmit = jest.fn()
    render(<ProjectForm onSubmit={mockSubmit} />)
    
    const submitButton = screen.getByRole('button', { name: /create project/i })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/project name is required/i)).toBeInTheDocument()
    })
    expect(mockSubmit).not.toHaveBeenCalled()
  })

  test('calls onSubmit with form data when valid', async () => {
    const mockSubmit = jest.fn().mockResolvedValue()
    render(<ProjectForm onSubmit={mockSubmit} />)
    
    const nameInput = screen.getByLabelText(/project name/i)
    const descriptionInput = screen.getByLabelText(/description/i)
    const submitButton = screen.getByRole('button', { name: /create project/i })
    
    fireEvent.change(nameInput, { target: { value: 'My Project' } })
    fireEvent.change(descriptionInput, { target: { value: 'Project description' } })
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        name: 'My Project',
        description: 'Project description',
      })
    })
  })

  test('trims whitespace from inputs', async () => {
    const mockSubmit = jest.fn().mockResolvedValue()
    render(<ProjectForm onSubmit={mockSubmit} />)
    
    const nameInput = screen.getByLabelText(/project name/i)
    fireEvent.change(nameInput, { target: { value: '  My Project  ' } })
    fireEvent.click(screen.getByRole('button', { name: /create project/i }))
    
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        name: 'My Project',
        description: '',
      })
    })
  })

  test('shows loading state while submitting', async () => {
    const mockSubmit = jest.fn(() => new Promise(resolve => setTimeout(resolve, 100)))
    render(<ProjectForm onSubmit={mockSubmit} />)
    
    const nameInput = screen.getByLabelText(/project name/i)
    fireEvent.change(nameInput, { target: { value: 'Test' } })
    fireEvent.click(screen.getByRole('button', { name: /create project/i }))
    
    expect(screen.getByText(/creating.../i)).toBeInTheDocument()
    
    await waitFor(() => {
      expect(screen.getByText(/create project/i)).toBeInTheDocument()
    })
  })

  test('displays error message when submission fails', async () => {
    const mockSubmit = jest.fn().mockRejectedValue(new Error('Network error'))
    render(<ProjectForm onSubmit={mockSubmit} />)
    
    const nameInput = screen.getByLabelText(/project name/i)
    fireEvent.change(nameInput, { target: { value: 'Test' } })
    fireEvent.click(screen.getByRole('button', { name: /create project/i }))
    
    await waitFor(() => {
      expect(screen.getByText(/network error/i)).toBeInTheDocument()
    })
  })

  test('calls onCancel when cancel button is clicked', () => {
    const mockCancel = jest.fn()
    render(<ProjectForm onSubmit={jest.fn()} onCancel={mockCancel} />)
    
    const cancelButton = screen.getByRole('button', { name: /cancel/i })
    fireEvent.click(cancelButton)
    
    expect(mockCancel).toHaveBeenCalledTimes(1)
  })

  test('resets form after successful submission', async () => {
    const mockSubmit = jest.fn().mockResolvedValue()
    render(<ProjectForm onSubmit={mockSubmit} />)
    
    const nameInput = screen.getByLabelText(/project name/i)
    const descriptionInput = screen.getByLabelText(/description/i)
    
    fireEvent.change(nameInput, { target: { value: 'Test Project' } })
    fireEvent.change(descriptionInput, { target: { value: 'Test Description' } })
    fireEvent.click(screen.getByRole('button', { name: /create project/i }))
    
    await waitFor(() => {
      expect(nameInput.value).toBe('')
      expect(descriptionInput.value).toBe('')
    })
  })

  test('renders in edit mode with initial data', () => {
    const initialData = {
      name: 'Existing Project',
      description: 'Existing description',
    }
    render(<ProjectForm onSubmit={jest.fn()} initialData={initialData} />)
    
    expect(screen.getByLabelText(/project name/i).value).toBe('Existing Project')
    expect(screen.getByLabelText(/description/i).value).toBe('Existing description')
    expect(screen.getByRole('button', { name: /update project/i })).toBeInTheDocument()
  })

  test('submits updated data in edit mode', async () => {
    const mockSubmit = jest.fn().mockResolvedValue()
    const initialData = {
      name: 'Old Name',
      description: 'Old description',
    }
    render(<ProjectForm onSubmit={mockSubmit} initialData={initialData} />)
    
    const nameInput = screen.getByLabelText(/project name/i)
    fireEvent.change(nameInput, { target: { value: 'Updated Name' } })
    fireEvent.click(screen.getByRole('button', { name: /update project/i }))
    
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        name: 'Updated Name',
        description: 'Old description',
      })
    })
  })

  test('does not reset form after successful submission in edit mode', async () => {
    const mockSubmit = jest.fn().mockResolvedValue()
    const initialData = {
      name: 'Project Name',
      description: 'Project Description',
    }
    render(<ProjectForm onSubmit={mockSubmit} initialData={initialData} />)
    
    fireEvent.click(screen.getByRole('button', { name: /update project/i }))
    
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalled()
    })
    
    // Form should still have values in edit mode
    expect(screen.getByLabelText(/project name/i).value).toBe('Project Name')
    expect(screen.getByLabelText(/description/i).value).toBe('Project Description')
  })
})

