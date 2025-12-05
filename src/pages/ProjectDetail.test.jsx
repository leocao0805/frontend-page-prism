import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

// Mock the services before importing the component
jest.mock('../services/project', () => ({
  getProject: jest.fn(),
  updateProject: jest.fn(),
  deleteProject: jest.fn(),
}))

jest.mock('../services/inspiration', () => ({
  createInspiration: jest.fn(),
  updateInspiration: jest.fn(),
  deleteInspiration: jest.fn(),
}))

jest.mock('../services/ai', () => ({
  rewriteDescription: jest.fn(),
}))

import ProjectDetail from './ProjectDetail'
import { getProject, updateProject, deleteProject } from '../services/project'
import { createInspiration, updateInspiration, deleteInspiration } from '../services/inspiration'

const mockProject = {
  id: '1',
  name: 'Test Project',
  description: 'Test Description',
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01',
  inspirations: [],
}

const mockInspiration = {
  id: 'insp-1',
  projectId: '1',
  websiteMetadata: { url: 'https://example.com' },
  screenshot_uri: '',
  notes: '',
}

const renderProjectDetail = () => {
  return render(
    <MemoryRouter initialEntries={['/projects/1']}>
      <Routes>
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/projects" element={<div>Projects List</div>} />
      </Routes>
    </MemoryRouter>
  )
}

describe('ProjectDetail', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    getProject.mockResolvedValue(mockProject)
  })

  describe('Edit Project', () => {
    it('shows edit form when Edit Project button is clicked', async () => {
      renderProjectDetail()

      await waitFor(() => {
        expect(screen.getByText('Test Project')).toBeInTheDocument()
      })

      fireEvent.click(screen.getByText('Edit Project'))

      expect(screen.getByDisplayValue('Test Project')).toBeInTheDocument()
      expect(screen.getByDisplayValue('Test Description')).toBeInTheDocument()
    })

    it('saves project when Save button is clicked', async () => {
      updateProject.mockResolvedValue({
        ...mockProject,
        name: 'Updated Name',
      })

      renderProjectDetail()

      await waitFor(() => {
        expect(screen.getByText('Test Project')).toBeInTheDocument()
      })

      fireEvent.click(screen.getByText('Edit Project'))
      fireEvent.change(screen.getByDisplayValue('Test Project'), {
        target: { value: 'Updated Name' },
      })
      fireEvent.click(screen.getByText('Save'))

      await waitFor(() => {
        expect(updateProject).toHaveBeenCalledWith('1', {
          name: 'Updated Name',
          description: 'Test Description',
        })
      })
    })

    it('cancels edit when Cancel button is clicked', async () => {
      renderProjectDetail()

      await waitFor(() => {
        expect(screen.getByText('Test Project')).toBeInTheDocument()
      })

      fireEvent.click(screen.getByText('Edit Project'))
      fireEvent.click(screen.getByText('Cancel'))

      expect(screen.getByText('Test Project')).toBeInTheDocument()
    })
  })

  describe('Delete Project', () => {
    it('deletes project and navigates away when confirmed', async () => {
      window.confirm = jest.fn(() => true)
      deleteProject.mockResolvedValue()

      renderProjectDetail()

      await waitFor(() => {
        expect(screen.getByText('Test Project')).toBeInTheDocument()
      })

      fireEvent.click(screen.getByText('Delete Project'))

      await waitFor(() => {
        expect(deleteProject).toHaveBeenCalledWith('1')
        expect(screen.getByText('Projects List')).toBeInTheDocument()
      })
    })

    it('does not delete when cancelled', async () => {
      window.confirm = jest.fn(() => false)

      renderProjectDetail()

      await waitFor(() => {
        expect(screen.getByText('Test Project')).toBeInTheDocument()
      })

      fireEvent.click(screen.getByText('Delete Project'))

      expect(deleteProject).not.toHaveBeenCalled()
    })
  })

  describe('Add Inspiration', () => {
    it('adds new inspiration when Add Inspiration is clicked', async () => {
      createInspiration.mockResolvedValue(mockInspiration)

      renderProjectDetail()

      await waitFor(() => {
        expect(screen.getByText('Test Project')).toBeInTheDocument()
      })

      fireEvent.change(screen.getByPlaceholderText('Enter URL'), {
        target: { value: 'https://example.com' },
      })
      fireEvent.click(screen.getByText('Add Inspiration'))

      await waitFor(() => {
        expect(createInspiration).toHaveBeenCalledWith({
          projectId: '1',
          websiteMetadata: { url: 'https://example.com' },
          screenshot_uri: '',
          notes: '',
        })
      })
    })

    it('does not add inspiration if URL is empty', async () => {
      renderProjectDetail()

      await waitFor(() => {
        expect(screen.getByText('Test Project')).toBeInTheDocument()
      })

      fireEvent.click(screen.getByText('Add Inspiration'))

      expect(createInspiration).not.toHaveBeenCalled()
    })
  })

  describe('Delete Inspiration', () => {
    const projectWithInspiration = {
      ...mockProject,
      inspirations: [mockInspiration],
    }

    it('deletes inspiration when Delete is confirmed', async () => {
      getProject.mockResolvedValue(projectWithInspiration)
      window.confirm = jest.fn(() => true)
      deleteInspiration.mockResolvedValue()

      renderProjectDetail()

      await waitFor(() => {
        expect(screen.getByText('https://example.com')).toBeInTheDocument()
      })

      fireEvent.click(screen.getByText('Delete'))

      await waitFor(() => {
        expect(deleteInspiration).toHaveBeenCalledWith('insp-1')
      })
    })
  })

  describe('Edit Inspiration', () => {
    const projectWithInspiration = {
      ...mockProject,
      inspirations: [mockInspiration],
    }

    it('shows edit form when Edit button is clicked', async () => {
      getProject.mockResolvedValue(projectWithInspiration)

      renderProjectDetail()

      await waitFor(() => {
        expect(screen.getByText('https://example.com')).toBeInTheDocument()
      })

      fireEvent.click(screen.getByText('Edit'))

      expect(screen.getByDisplayValue('https://example.com')).toBeInTheDocument()
      expect(screen.getByText('Save')).toBeInTheDocument()
      expect(screen.getByText('Cancel')).toBeInTheDocument()
    })

    it('saves updated URL when Save is clicked', async () => {
      getProject.mockResolvedValue(projectWithInspiration)
      updateInspiration.mockResolvedValue()

      renderProjectDetail()

      await waitFor(() => {
        expect(screen.getByText('https://example.com')).toBeInTheDocument()
      })

      fireEvent.click(screen.getByText('Edit'))
      fireEvent.change(screen.getByDisplayValue('https://example.com'), {
        target: { value: 'https://updated.com' },
      })
      fireEvent.click(screen.getByText('Save'))

      await waitFor(() => {
        expect(updateInspiration).toHaveBeenCalledWith('insp-1', {
          websiteMetadata: { url: 'https://updated.com' },
        })
      })
    })
  })
})
