/**
 * Filters inspirations by search query
 * Searches in URL and notes fields
 * @param {Array} inspirations - Array of inspiration objects
 * @param {string} query - Search query string
 * @returns {Array} Filtered inspirations
 */
export function filterBySearch(inspirations, query) {
  if (!query || query.trim() === '') {
    return inspirations
  }

  const lowerQuery = query.toLowerCase().trim()

  return inspirations.filter((inspiration) => {
    const url = inspiration.websiteMetadata?.url?.toLowerCase() || ''
    const title = inspiration.websiteMetadata?.title?.toLowerCase() || ''
    const notes = inspiration.notes?.toLowerCase() || ''

    return url.includes(lowerQuery) || title.includes(lowerQuery) || notes.includes(lowerQuery)
  })
}

/**
 * Sorts inspirations by date
 * @param {Array} inspirations - Array of inspiration objects
 * @param {string} order - Sort order: 'newest' or 'oldest'
 * @returns {Array} Sorted inspirations
 */
export function sortByDate(inspirations, order = 'newest') {
  const sorted = [...inspirations].sort((a, b) => {
    const dateA = new Date(a.createdAt)
    const dateB = new Date(b.createdAt)

    if (order === 'oldest') {
      return dateA - dateB
    }
    return dateB - dateA
  })

  return sorted
}

/**
 * Applies search and sort filters to inspirations
 * @param {Array} inspirations - Array of inspiration objects
 * @param {string} searchQuery - Search query string
 * @param {string} sortOrder - Sort order: 'newest' or 'oldest'
 * @returns {Array} Filtered and sorted inspirations
 */
export function applyFilters(inspirations, searchQuery = '', sortOrder = 'newest') {
  let result = inspirations

  // Apply search filter
  result = filterBySearch(result, searchQuery)

  // Apply sort
  result = sortByDate(result, sortOrder)

  return result
}
