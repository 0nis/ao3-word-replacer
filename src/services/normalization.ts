import { escapeRegExp } from "../utils/string.js";
import { NORMALIZATION_MAP } from "../constants/normalization.js";

const REVERSE_NORMALIZATION_MAP: Record<string, string> = {};
let reverseInitialized = false;

function buildReverseMap() {
  for (const base in NORMALIZATION_MAP) {
    for (const variant of NORMALIZATION_MAP[base])
      REVERSE_NORMALIZATION_MAP[variant] = base;
    if (!REVERSE_NORMALIZATION_MAP[base])
      REVERSE_NORMALIZATION_MAP[base] = base;
  }
  reverseInitialized = true;
}

export function buildVariantPattern(input: string): string {
  if (!reverseInitialized) buildReverseMap();

  return [...input]
    .map((char) => {
      const base = REVERSE_NORMALIZATION_MAP[char];
      if (!base) return escapeRegExp(char);

      const variants = NORMALIZATION_MAP[base];
      return `[${variants.map(escapeRegExp).join("")}]`;
    })
    .join("");
}
