# 🧩 Component Templates for Practice

Use these as **starting points** during your 75-minute practice. Copy/paste and modify as needed.

---

## 📝 Story 6: Reusable State Components (Build these FIRST!)

### `src/components/LoadingSpinner.jsx`

```jsx
import React from 'react'
import styles from './LoadingSpinner.module.css'

const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <div className={styles.container} role="status" aria-live="polite">
      <div className={styles.spinner}></div>
      <p className={styles.message}>{message}</p>
    </div>
  )
}

export default LoadingSpinner
```

### `src/components/LoadingSpinner.module.css`

```css
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.message {
  margin-top: 1rem;
  color: #666;
  font-size: 0.9rem;
}
```

---

### `src/components/ErrorState.jsx`

```jsx
import React from 'react'
import Button from './Button'
import styles from './ErrorState.module.css'

const ErrorState = ({ 
  title = 'Something went wrong',
  message = 'We encountered an error. Please try again.',
  onRetry 
}) => {
  return (
    <div className={styles.container} role="alert">
      <div className={styles.icon}>⚠️</div>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.message}>{message}</p>
      {onRetry && (
        <Button onClick={onRetry} className={styles.retryButton}>
          Try Again
        </Button>
      )}
    </div>
  )
}

export default ErrorState
```

### `src/components/ErrorState.module.css`

```css
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  text-align: center;
}

.icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #e74c3c;
  margin-bottom: 0.5rem;
}

.message {
  color: #666;
  margin-bottom: 1.5rem;
  max-width: 400px;
}

.retryButton {
  margin-top: 0.5rem;
}
```

---

### `src/components/EmptyState.jsx`

```jsx
import React from 'react'
import Button from './Button'
import styles from './EmptyState.module.css'

const EmptyState = ({ 
  icon = '📭',
  title = 'Nothing here yet',
  message = 'Get started by creating your first item.',
  actionLabel,
  onAction 
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.icon}>{icon}</div>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.message}>{message}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} className={styles.actionButton}>
          {actionLabel}
        </Button>
      )}
    </div>
  )
}

export default EmptyState
```

### `src/components/EmptyState.module.css`

```css
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
}

.icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.6;
}

.title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
}

.message {
  color: #666;
  margin-bottom: 2rem;
  max-width: 400px;
  line-height: 1.5;
}

.actionButton {
  margin-top: 0.5rem;
}
```

### `src/components/EmptyState.test.jsx`

```jsx
import { render, screen, fireEvent } from '@testing-library/react'
import EmptyState from './EmptyState'

describe('EmptyState', () => {
  test('renders with default props', () => {
    render(<EmptyState />)
    expect(screen.getByText('Nothing here yet')).toBeInTheDocument()
  })

  test('renders custom title and message', () => {
    render(
      <EmptyState 
        title="No projects" 
        message="Create your first project to get started" 
      />
    )
    expect(screen.getByText('No projects')).toBeInTheDocument()
    expect(screen.getByText(/Create your first project/)).toBeInTheDocument()
  })

  test('calls onAction when button is clicked', () => {
    const mockAction = jest.fn()
    render(
      <EmptyState 
        actionLabel="Create Project" 
        onAction={mockAction} 
      />
    )
    
    const button = screen.getByText('Create Project')
    fireEvent.click(button)
    expect(mockAction).toHaveBeenCalledTimes(1)
  })

  test('does not render button when actionLabel or onAction is missing', () => {
    const { container } = render(<EmptyState actionLabel="Create" />)
    expect(container.querySelector('button')).not.toBeInTheDocument()
  })
})
```

---

## 📋 Story 1: Create Project

### `src/components/ProjectForm.jsx`

```jsx
import React, { useState } from 'react'
import Button from './Button'
import styles from './ProjectForm.module.css'

const ProjectForm = ({ onSubmit, onCancel, initialData = {} }) => {
  const [formData, setFormData] = useState({
    name: initialData.name || '',
    description: initialData.description || '',
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validate = () => {
    const newErrors = {}
    if (!formData.name.trim()) {
      newErrors.name = 'Project name is required'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    try {
      await onSubmit(formData)
      // Reset form on success
      setFormData({ name: '', description: '' })
      setErrors({})
    } catch (error) {
      setErrors({ submit: error.message })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="name" className={styles.label}>
          Project Name *
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          className={styles.input}
          disabled={isSubmitting}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <span id="name-error" className={styles.error} role="alert">
            {errors.name}
          </span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description" className={styles.label}>
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className={styles.textarea}
          rows="4"
          disabled={isSubmitting}
        />
      </div>

      {errors.submit && (
        <div className={styles.error} role="alert">
          {errors.submit}
        </div>
      )}

      <div className={styles.actions}>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating...' : 'Create Project'}
        </Button>
        {onCancel && (
          <Button type="button" onClick={onCancel} disabled={isSubmitting}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  )
}

export default ProjectForm
```

### `src/components/ProjectForm.module.css`

```css
.form {
  max-width: 600px;
  margin: 0 auto;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.formGroup {
  margin-bottom: 1.5rem;
}

.label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #333;
}

.input,
.textarea {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
}

.input:focus,
.textarea:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.input:disabled,
.textarea:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

.error {
  display: block;
  margin-top: 0.5rem;
  color: #e74c3c;
  font-size: 0.875rem;
}

.actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}
```

### `src/components/ProjectForm.test.jsx`

```jsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ProjectForm from './ProjectForm'

describe('ProjectForm', () => {
  test('shows validation error when name is empty', async () => {
    const mockSubmit = jest.fn()
    render(<ProjectForm onSubmit={mockSubmit} />)
    
    const submitButton = screen.getByText('Create Project')
    fireEvent.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument()
    })
    expect(mockSubmit).not.toHaveBeenCalled()
  })

  test('submits form with valid data', async () => {
    const mockSubmit = jest.fn().mockResolvedValue({})
    render(<ProjectForm onSubmit={mockSubmit} />)
    
    fireEvent.change(screen.getByLabelText(/project name/i), {
      target: { value: 'My Project' }
    })
    fireEvent.change(screen.getByLabelText(/description/i), {
      target: { value: 'A test project' }
    })
    
    fireEvent.click(screen.getByText('Create Project'))
    
    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        name: 'My Project',
        description: 'A test project'
      })
    })
  })

  test('clears error when user starts typing', async () => {
    const mockSubmit = jest.fn()
    render(<ProjectForm onSubmit={mockSubmit} />)
    
    // Trigger validation error
    fireEvent.click(screen.getByText('Create Project'))
    await waitFor(() => {
      expect(screen.getByText(/name is required/i)).toBeInTheDocument()
    })
    
    // Start typing
    fireEvent.change(screen.getByLabelText(/project name/i), {
      target: { value: 'M' }
    })
    
    expect(screen.queryByText(/name is required/i)).not.toBeInTheDocument()
  })

  test('calls onCancel when cancel button is clicked', () => {
    const mockCancel = jest.fn()
    render(<ProjectForm onSubmit={jest.fn()} onCancel={mockCancel} />)
    
    fireEvent.click(screen.getByText('Cancel'))
    expect(mockCancel).toHaveBeenCalledTimes(1)
  })
})
```

---

## 🎨 Story 2: Project Card Component

### `src/components/ProjectCard.jsx`

```jsx
import React from 'react'
import { Link } from 'react-router-dom'
import styles from './ProjectCard.module.css'

const ProjectCard = ({ project }) => {
  const { id, name, description, createdAt } = project
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })

  return (
    <Link to={`/projects/${id}`} className={styles.card}>
      <div className={styles.content}>
        <h3 className={styles.title}>{name}</h3>
        <p className={styles.description}>{description || 'No description'}</p>
        <div className={styles.meta}>
          <span className={styles.date}>Created: {formattedDate}</span>
        </div>
      </div>
    </Link>
  )
}

export default ProjectCard
```

### `src/components/ProjectCard.module.css`

```css
.card {
  display: block;
  padding: 1.5rem;
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
  transition: all 0.2s ease;
  cursor: pointer;
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  border-color: #3498db;
  transform: translateY(-2px);
}

.content {
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
}

.description {
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.meta {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  color: #999;
}

.date {
  display: flex;
  align-items: center;
}
```

---

## 🖼️ Story 3: Inspiration Components

### `src/components/InspirationForm.jsx`

```jsx
import React, { useState } from 'react'
import Button from './Button'
import styles from './InspirationForm.module.css'

const InspirationForm = ({ projectId, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    url: '',
    notes: '',
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isGenerating, setIsGenerating] = useState(false)

  const validate = () => {
    const newErrors = {}
    if (!formData.url.trim()) {
      newErrors.url = 'URL is required'
    } else {
      try {
        new URL(formData.url)
      } catch {
        newErrors.url = 'Please enter a valid URL'
      }
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setIsSubmitting(true)
    try {
      // TODO: Implement actual API call to save inspiration
      await onSubmit({
        projectId,
        websiteMetadata: { url: formData.url },
        screenshot_uri: formData.url, // Placeholder
        notes: formData.notes,
      })
      setFormData({ url: '', notes: '' })
    } catch (error) {
      setErrors({ submit: error.message })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleGenerateCaption = async () => {
    if (!formData.url) {
      setErrors({ url: 'Enter a URL first' })
      return
    }

    setIsGenerating(true)
    try {
      // TODO: Call AI service (Story 7)
      const caption = `AI-generated caption for: ${formData.url}`
      setFormData(prev => ({ ...prev, notes: caption }))
    } catch (error) {
      setErrors({ ai: 'Failed to generate caption. Please try again.' })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label htmlFor="url" className={styles.label}>
          Website URL *
        </label>
        <input
          id="url"
          name="url"
          type="text"
          value={formData.url}
          onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
          className={styles.input}
          placeholder="https://example.com"
          disabled={isSubmitting}
        />
        {errors.url && <span className={styles.error}>{errors.url}</span>}
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="notes" className={styles.label}>
          Notes
        </label>
        <div className={styles.textareaWrapper}>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
            className={styles.textarea}
            rows="4"
            placeholder="Add your notes here..."
            disabled={isSubmitting}
          />
          <Button
            type="button"
            onClick={handleGenerateCaption}
            disabled={isSubmitting || isGenerating || !formData.url}
            className={styles.aiButton}
          >
            {isGenerating ? '🤖 Generating...' : '🤖 Generate Caption'}
          </Button>
        </div>
        {errors.ai && <span className={styles.error}>{errors.ai}</span>}
      </div>

      {errors.submit && <div className={styles.error}>{errors.submit}</div>}

      <div className={styles.actions}>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Add Inspiration'}
        </Button>
        {onCancel && (
          <Button type="button" onClick={onCancel}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  )
}

export default InspirationForm
```

---

## 🤖 Story 7: AI Service

### `src/services/aiService.ts`

```typescript
/**
 * Calls the local Ollama LLM API to generate a caption for an inspiration.
 * @param url - The website URL to generate a caption for.
 * @param prompt - Optional custom prompt. Default generates a short caption.
 * @returns Promise resolving to the generated text.
 */
export async function generateCaption(
  url: string,
  prompt?: string
): Promise<string> {
  const defaultPrompt = `Generate a short, descriptive caption (max 100 words) for a design inspiration from this website: ${url}. Focus on design elements, colors, and layout.`

  try {
    const response = await fetch('http://localhost:11434/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'tinyllama',
        prompt: prompt || defaultPrompt,
        stream: false,
      }),
    })

    if (!response.ok) {
      throw new Error(`AI API error: ${response.status}`)
    }

    const data = await response.json()
    return data.response || 'No caption generated'
  } catch (error) {
    console.error('AI service error:', error)
    throw new Error('Failed to generate caption. Make sure Ollama is running.')
  }
}
```

### `src/services/aiService.test.ts`

```typescript
import { generateCaption } from './aiService'

// Mock fetch
global.fetch = jest.fn()

describe('aiService', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('generateCaption returns AI response', async () => {
    const mockResponse = {
      response: 'A beautiful minimal design with blue accents.',
    }

    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    })

    const result = await generateCaption('https://example.com')

    expect(global.fetch).toHaveBeenCalledWith(
      'http://localhost:11434/api/generate',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
    )
    expect(result).toBe('A beautiful minimal design with blue accents.')
  })

  test('throws error when API fails', async () => {
    ;(global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
    })

    await expect(generateCaption('https://example.com')).rejects.toThrow(
      /Failed to generate caption/
    )
  })

  test('throws error when network fails', async () => {
    ;(global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error('Network error')
    )

    await expect(generateCaption('https://example.com')).rejects.toThrow(
      /Failed to generate caption/
    )
  })
})
```

---

## 🔄 Modified Pages

### `src/pages/Projects.jsx` (Updated with all states)

```jsx
import React, { useState, useEffect } from 'react'
import { getAllProjects, createProject } from '../services/project'
import ProjectCard from '../components/ProjectCard'
import ProjectForm from '../components/ProjectForm'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorState from '../components/ErrorState'
import EmptyState from '../components/EmptyState'
import styles from './Projects.module.css'

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)

  const fetchProjects = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const allProjects = await getAllProjects(500) // Simulate latency
      setProjects(allProjects)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProjects()
  }, [])

  const handleCreateProject = async (formData) => {
    const newProject = await createProject(formData, 300)
    setProjects(prev => [newProject, ...prev])
    setShowForm(false)
  }

  if (isLoading) {
    return <LoadingSpinner message="Loading your projects..." />
  }

  if (error) {
    return (
      <ErrorState
        title="Failed to load projects"
        message={error}
        onRetry={fetchProjects}
      />
    )
  }

  if (projects.length === 0 && !showForm) {
    return (
      <EmptyState
        icon="🎨"
        title="No projects yet"
        message="Create your first project to start collecting design inspirations."
        actionLabel="Create Your First Project"
        onAction={() => setShowForm(true)}
      />
    )
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>My Projects</h1>
        {!showForm && (
          <button onClick={() => setShowForm(true)}>+ New Project</button>
        )}
      </div>

      {showForm && (
        <div className={styles.formSection}>
          <ProjectForm
            onSubmit={handleCreateProject}
            onCancel={() => setShowForm(false)}
          />
        </div>
      )}

      <div className={styles.grid}>
        {projects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}

export default Projects
```

---

## ⏱️ Quick Reference: 75-Minute Timeline

| Time | Activity | Deliverable |
|------|----------|-------------|
| 0-5 min | Read stories, state plan | Verbal outline |
| 5-15 min | Create LoadingSpinner, ErrorState, EmptyState | 3 components + 1 test |
| 15-25 min | Build ProjectForm with validation | Component + test |
| 25-35 min | Update Projects.jsx with all states | Working create flow |
| 35-50 min | Build InspirationForm and Card | 2 components |
| 50-65 min | Implement AI service + integrate | Story 7 complete |
| 65-72 min | Run tests, fix bugs | Green tests |
| 72-75 min | Demo & explain what you'd improve | Summary |

---

**Pro tip:** Copy this entire file into your IDE during practice so you can quickly reference patterns! 🚀
