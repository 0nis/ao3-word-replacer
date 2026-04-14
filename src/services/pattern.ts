import { escapeRegExp } from "../utils/string.js";
import { CHARACTER_VARIANTS } from "../constants/variants.js";

const REVERSE_CHARACTER_VARIANTS: Record<string, string> = {};
let reverseInitialized = false;

function buildReverseMap() {
  for (const base in CHARACTER_VARIANTS) {
    for (const variant of CHARACTER_VARIANTS[base])
      REVERSE_CHARACTER_VARIANTS[variant] = base;
    if (!REVERSE_CHARACTER_VARIANTS[base])
      REVERSE_CHARACTER_VARIANTS[base] = base;
  }
  reverseInitialized = true;
}

export function buildVariantPattern(input: string): string {
  if (!reverseInitialized) buildReverseMap();

  return [...input]
    .map((char) => {
      const base = REVERSE_CHARACTER_VARIANTS[char];
      if (!base) return escapeRegExp(char);

      const variants = CHARACTER_VARIANTS[base];
      return `[${variants.map(escapeRegExp).join("")}]`;
    })
    .join("");
}
