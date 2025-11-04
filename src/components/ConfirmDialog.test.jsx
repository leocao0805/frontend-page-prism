import { render, screen, fireEvent } from '@testing-library/react'
import ConfirmDialog from './ConfirmDialog'

describe('ConfirmDialog', () => {
  test('does not render when isOpen is false', () => {
    render(
      <ConfirmDialog
        isOpen={false}
        message="Are you sure?"
        onConfirm={jest.fn()}
        onCancel={jest.fn()}
      />
    )
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  test('renders when isOpen is true', () => {
    render(
      <ConfirmDialog
        isOpen={true}
        message="Are you sure?"
        onConfirm={jest.fn()}
        onCancel={jest.fn()}
      />
    )
    expect(screen.getByRole('dialog')).toBeInTheDocument()
    expect(screen.getByText('Are you sure?')).toBeInTheDocument()
  })

  test('renders custom title and labels', () => {
    render(
      <ConfirmDialog
        isOpen={true}
        title="Delete Item"
        message="This action cannot be undone"
        confirmLabel="Delete"
        cancelLabel="Keep"
        onConfirm={jest.fn()}
        onCancel={jest.fn()}
      />
    )
    expect(screen.getByText('Delete Item')).toBeInTheDocument()
    expect(screen.getByText('Delete')).toBeInTheDocument()
    expect(screen.getByText('Keep')).toBeInTheDocument()
  })

  test('calls onConfirm when confirm button is clicked', () => {
    const mockConfirm = jest.fn()
    render(
      <ConfirmDialog
        isOpen={true}
        message="Are you sure?"
        onConfirm={mockConfirm}
        onCancel={jest.fn()}
      />
    )
    fireEvent.click(screen.getByText('Confirm'))
    expect(mockConfirm).toHaveBeenCalledTimes(1)
  })

  test('calls onCancel when cancel button is clicked', () => {
    const mockCancel = jest.fn()
    render(
      <ConfirmDialog
        isOpen={true}
        message="Are you sure?"
        onConfirm={jest.fn()}
        onCancel={mockCancel}
      />
    )
    fireEvent.click(screen.getByText('Cancel'))
    expect(mockCancel).toHaveBeenCalledTimes(1)
  })

  test('calls onCancel when backdrop is clicked', () => {
    const mockCancel = jest.fn()
    render(
      <ConfirmDialog
        isOpen={true}
        message="Are you sure?"
        onConfirm={jest.fn()}
        onCancel={mockCancel}
      />
    )
    const backdrop = screen.getByRole('dialog').parentElement
    fireEvent.click(backdrop)
    expect(mockCancel).toHaveBeenCalledTimes(1)
  })
})
