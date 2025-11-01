import { Dictionary } from "../types/settings";

/**
 * Generate a unique key for a new dictionary entry.
 * @param dict The current dictionary.
 * @returns A unique key string.
 */
export function generateUniqueKey(dict: Dictionary): string {
  let k =
    Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 6);
  while (k in dict) {
    k = Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 6);
  }
  return k;
}
