/**
 * Escape HTML special characters in a string.
 * @param str The input string.
 * @returns The escaped string.
 */
export function escapeHtml(str: string | null | undefined): string {
  if (str === undefined || str === null) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Escape special characters in a string for use in a regular expression.
 * @param s The input string.
 * @returns The escaped string.
 */
export function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Check if a string is all uppercase.
 * @param s The input string.
 * @returns True if the string is all uppercase, false otherwise.
 */
export const isAllUpper = (s: string) => s === s.toUpperCase();

/**
 * Check if a string is all lowercase.
 * @param s The input string.
 * @returns True if the string is all lowercase, false otherwise.
 */
export const isAllLower = (s: string) => s === s.toLowerCase();

/**
 * Check if a string is capitalized.
 * @param s The input string.
 * @returns True if the string is capitalized, false otherwise.
 */
export const isCapitalized = (s: string) =>
  s[0] === s[0].toUpperCase() && s.slice(1) === s.slice(1).toLowerCase();
