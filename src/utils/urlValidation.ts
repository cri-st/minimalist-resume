/**
 * Validates if a URL is safe to render as a link
 * Prevents javascript:, data:, and other dangerous protocols
 *
 * @param url - The URL to validate
 * @returns true if the URL is safe, false otherwise
 */
export function isValidUrl(url: string): boolean {
  if (!url || typeof url !== 'string') {
    return false;
  }

  try {
    const parsedUrl = new URL(url);

    // Only allow http: and https: protocols
    // This prevents javascript:, data:, vbscript:, etc.
    const allowedProtocols = ['http:', 'https:'];
    if (!allowedProtocols.includes(parsedUrl.protocol)) {
      return false;
    }

    // Prevent URLs with encoded javascript: in the data
    // e.g., http://example.com?url=javascript%3Aalert(1)
    if (url.toLowerCase().includes('javascript:') ||
        url.toLowerCase().includes('data:') ||
        url.toLowerCase().includes('vbscript:') ||
        url.toLowerCase().includes('file:')) {
      return false;
    }

    return true;
  } catch {
    // Invalid URL format
    return false;
  }
}

/**
 * Returns the URL if valid, or a safe fallback URL
 *
 * @param url - The URL to validate
 * @param fallback - Fallback URL if validation fails (defaults to '#')
 * @returns The valid URL or fallback
 */
export function getSafeUrl(url: string, fallback: string = '#'): string {
  return isValidUrl(url) ? url : fallback;
}

/**
 * Sanitizes a URL string for display purposes
 *
 * @param url - The URL to sanitize
 * @returns A sanitized URL string safe for display
 */
export function sanitizeUrlDisplay(url: string): string {
  try {
    const parsed = new URL(url);
    // Remove credentials from URL
    parsed.password = '';
    parsed.username = '';
    return parsed.toString();
  } catch {
    return url;
  }
}
