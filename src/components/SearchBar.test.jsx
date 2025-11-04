import { render, screen, fireEvent } from '@testing-library/react'
import SearchBar from './SearchBar'

describe('SearchBar', () => {
  test('renders with default placeholder', () => {
    render(<SearchBar value="" onChange={jest.fn()} />)
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
  })

  test('renders with custom placeholder', () => {
    render(<SearchBar value="" onChange={jest.fn()} placeholder="Search inspirations..." />)
    expect(screen.getByPlaceholderText('Search inspirations...')).toBeInTheDocument()
  })

  test('displays the current value', () => {
    render(<SearchBar value="test query" onChange={jest.fn()} />)
    expect(screen.getByDisplayValue('test query')).toBeInTheDocument()
  })

  test('calls onChange when typing', () => {
    const mockOnChange = jest.fn()
    render(<SearchBar value="" onChange={mockOnChange} />)
    
    const input = screen.getByPlaceholderText('Search...')
    fireEvent.change(input, { target: { value: 'new search' } })
    
    expect(mockOnChange).toHaveBeenCalledWith('new search')
  })

  test('shows clear button when value is not empty', () => {
    render(<SearchBar value="test" onChange={jest.fn()} onClear={jest.fn()} />)
    expect(screen.getByLabelText('Clear search')).toBeInTheDocument()
  })

  test('does not show clear button when value is empty', () => {
    render(<SearchBar value="" onChange={jest.fn()} onClear={jest.fn()} />)
    expect(screen.queryByLabelText('Clear search')).not.toBeInTheDocument()
  })

  test('calls onClear when clear button is clicked', () => {
    const mockOnClear = jest.fn()
    render(<SearchBar value="test" onChange={jest.fn()} onClear={mockOnClear} />)
    
    const clearButton = screen.getByLabelText('Clear search')
    fireEvent.click(clearButton)
    
    expect(mockOnClear).toHaveBeenCalledTimes(1)
  })
})
