import { filterBySearch, sortByDate, applyFilters } from './filterUtils'

const mockInspirations = [
  {
    id: '1',
    websiteMetadata: { url: 'https://example.com/design', title: 'Great Design' },
    notes: 'Beautiful color scheme',
    createdAt: '2025-01-15T10:00:00Z',
  },
  {
    id: '2',
    websiteMetadata: { url: 'https://site.com/layout', title: 'Responsive Layout' },
    notes: 'Mobile-first approach',
    createdAt: '2025-01-10T10:00:00Z',
  },
  {
    id: '3',
    websiteMetadata: { url: 'https://demo.com/ui', title: 'Modern UI' },
    notes: 'Clean and minimal design',
    createdAt: '2025-01-20T10:00:00Z',
  },
]

describe('filterBySearch', () => {
  test('returns all inspirations when query is empty', () => {
    expect(filterBySearch(mockInspirations, '')).toEqual(mockInspirations)
    expect(filterBySearch(mockInspirations, '   ')).toEqual(mockInspirations)
  })

  test('filters by URL', () => {
    const result = filterBySearch(mockInspirations, 'example')
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('1')
  })

  test('filters by title', () => {
    const result = filterBySearch(mockInspirations, 'layout')
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('2')
  })

  test('filters by notes', () => {
    const result = filterBySearch(mockInspirations, 'minimal')
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('3')
  })

  test('is case insensitive', () => {
    const result = filterBySearch(mockInspirations, 'DESIGN')
    expect(result.length).toBeGreaterThan(0)
  })

  test('returns multiple matches', () => {
    const result = filterBySearch(mockInspirations, 'design')
    expect(result).toHaveLength(2) // Matches id 1 and 3
  })

  test('returns empty array when no matches', () => {
    const result = filterBySearch(mockInspirations, 'nonexistent')
    expect(result).toEqual([])
  })

  test('handles inspirations without notes', () => {
    const inspirations = [
      {
        id: '1',
        websiteMetadata: { url: 'https://test.com', title: 'Test' },
        createdAt: '2025-01-15T10:00:00Z',
      },
    ]
    const result = filterBySearch(inspirations, 'test')
    expect(result).toHaveLength(1)
  })
})

describe('sortByDate', () => {
  test('sorts by newest first by default', () => {
    const result = sortByDate(mockInspirations)
    expect(result[0].id).toBe('3') // Jan 20
    expect(result[1].id).toBe('1') // Jan 15
    expect(result[2].id).toBe('2') // Jan 10
  })

  test('sorts by newest first when specified', () => {
    const result = sortByDate(mockInspirations, 'newest')
    expect(result[0].id).toBe('3')
    expect(result[2].id).toBe('2')
  })

  test('sorts by oldest first when specified', () => {
    const result = sortByDate(mockInspirations, 'oldest')
    expect(result[0].id).toBe('2') // Jan 10
    expect(result[1].id).toBe('1') // Jan 15
    expect(result[2].id).toBe('3') // Jan 20
  })

  test('does not mutate original array', () => {
    const original = [...mockInspirations]
    sortByDate(mockInspirations, 'oldest')
    expect(mockInspirations).toEqual(original)
  })
})

describe('applyFilters', () => {
  test('applies both search and sort filters', () => {
    const result = applyFilters(mockInspirations, 'design', 'oldest')
    expect(result).toHaveLength(2)
    expect(result[0].id).toBe('1') // Jan 15, older than id 3
    expect(result[1].id).toBe('3') // Jan 20
  })

  test('returns all sorted when no search query', () => {
    const result = applyFilters(mockInspirations, '', 'newest')
    expect(result).toHaveLength(3)
    expect(result[0].id).toBe('3')
  })

  test('applies default sort when not specified', () => {
    const result = applyFilters(mockInspirations, 'design')
    expect(result[0].id).toBe('3') // Newest first
  })

  test('returns empty array when search has no matches', () => {
    const result = applyFilters(mockInspirations, 'nonexistent', 'newest')
    expect(result).toEqual([])
  })
})
