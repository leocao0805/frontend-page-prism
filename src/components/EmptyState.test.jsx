import { render, screen, fireEvent } from '@testing-library/react'
import EmptyState from './EmptyState'

describe('EmptyState', () => {
  test('renders with default props', () => {
    render(<EmptyState />)
    expect(screen.getByText('No items found')).toBeInTheDocument()
    expect(screen.getByText('Get started by creating your first item')).toBeInTheDocument()
  })

  test('renders with custom title and message', () => {
    render(
      <EmptyState
        title="No Projects Yet"
        message="Create your first project to get started"
      />
    )
    expect(screen.getByText('No Projects Yet')).toBeInTheDocument()
    expect(screen.getByText('Create your first project to get started')).toBeInTheDocument()
  })

  test('renders action button when actionLabel and onAction are provided', () => {
    const mockAction = jest.fn()
    render(
      <EmptyState
        actionLabel="Create Project"
        onAction={mockAction}
      />
    )
    const button = screen.getByText('Create Project')
    expect(button).toBeInTheDocument()
    fireEvent.click(button)
    expect(mockAction).toHaveBeenCalledTimes(1)
  })

  test('does not render action button when actionLabel is not provided', () => {
    render(<EmptyState />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
})
