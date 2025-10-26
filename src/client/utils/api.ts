/**
 * Get the base path from the <base> tag if it exists
 * This is used to handle API Gateway stage names (e.g., /prod)
 */
export function getBasePath(): string {
  const baseElement = document.querySelector('base')
  if (!baseElement) {
    return ''
  }

  try {
    const pathname = new URL(baseElement.href).pathname
    // Remove trailing slash: /prod/ -> /prod
    return pathname.replace(/\/$/, '')
  } catch (error) {
    // If URL parsing fails, return empty string
    console.warn('Failed to parse base URL:', error)
    return ''
  }
}

/**
 * Build API URL with base path support
 * @param path - API path (e.g., '/api/hello')
 * @returns Full API URL with base path (e.g., '/prod/api/hello')
 */
export function getApiUrl(path: string): string {
  const basePath = getBasePath()
  return `${basePath}${path}`
}
