import {
  escapeRegExp,
  isAllLower,
  isAllUpper,
  isCapitalized,
} from "../utils/string.js";
import type { Dictionary, DictionaryEntry } from "../types/settings.js";
import { DEFAULT_OPTIONS } from "../constants/settings.js";

/**
 * Transfers capitalization patterns from the original string to the replacement.
 * @param original The original string.
 * @param replacement The replacement string.
 * @returns The replacement string with the original string's capitalization.
 */
export function transferCase(original: string, replacement: string): string {
  if (!original) return replacement;

  if (isAllUpper(original)) return replacement.toUpperCase();
  if (isAllLower(original)) return replacement.toLowerCase();
  if (isCapitalized(original))
    return replacement[0].toUpperCase() + replacement.slice(1).toLowerCase();

  // Mixed case
  let out = "";
  const minLen = Math.min(original.length, replacement.length);
  for (let i = 0; i < minLen; i++) {
    const origChar = original[i];
    const repChar = replacement[i];
    out +=
      origChar && origChar === origChar.toUpperCase()
        ? repChar.toUpperCase()
        : repChar.toLowerCase();
  }

  if (replacement.length > original.length) {
    out += replacement.slice(original.length).toLowerCase();
  }

  return out;
}

/**
 * Process a text node and replace its content based on the dictionary.
 * @param node The text node to process.
 * @param dict The dictionary of replacement patterns.
 */
export function processTextNode(node: Text, dict: Dictionary): void {
  const origKey = "_originalText" as keyof Text;
  if (!(node as any)[origKey]) {
    (node as any)[origKey] = node.nodeValue;
  }

  let text = (node as any)[origKey] as string;
  if (!text) return;

  for (const id in dict) {
    if (!Object.prototype.hasOwnProperty.call(dict, id)) continue;

    const entry: DictionaryEntry = { ...DEFAULT_OPTIONS, ...dict[id] };
    const { target, replacement, caseSensitive, wholeWord, preserveCase } =
      entry;

    if (typeof target !== "string" || typeof replacement !== "string") continue;

    const escaped = escapeRegExp(target);
    let flags = "g";
    if (!caseSensitive) flags += "i";

    if (wholeWord) {
      const pattern = `(^|[^A-Za-z0-9_])(${escaped})(?=$|[^A-Za-z0-9_])`;
      const regex = new RegExp(pattern, flags);

      text = text.replace(
        regex,
        (full, p1: string, p2: string) =>
          p1 + (preserveCase ? transferCase(p2, replacement) : replacement)
      );
    } else {
      const regex = new RegExp(escaped, flags);

      text = text.replace(regex, (match: string) =>
        preserveCase ? transferCase(match, replacement) : replacement
      );
    }
  }

  if (text !== node.nodeValue) {
    node.nodeValue = text;
  }
}

/**
 * Walk through a container element and replace text nodes based on the dictionary.
 * @param container The container element to process.
 * @param dict The dictionary of replacement patterns.
 */
export function walkAndReplace(container: Element, dict: Dictionary): void {
  const walker = document.createTreeWalker(
    container,
    NodeFilter.SHOW_TEXT,
    null
  );

  let node: Text | null;
  while ((node = walker.nextNode() as Text | null)) {
    processTextNode(node, dict);
  }
}
