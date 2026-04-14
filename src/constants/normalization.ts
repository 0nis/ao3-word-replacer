export const NORMALIZATION_MAP: Record<string, string[]> = {
  // Apostrophes
  "'": [
    "\u0027", // '
    "\u2018", // ‘
    "\u2019", // ’
    "\u02BC", // ʼ
    "\u2032", // ′
  ],

  // Quotes
  '"': [
    "\u0022", // "
    "\u201C", // “
    "\u201D", // ”
  ],

  // Hyphens/dashes
  "-": [
    "\u002D", // -
    "\u2010", // ‐
    "\u2011", // -
    "\u2012", // ‒
    "\u2013", // –
    "\u2014", // —
    "\u2212", // −
  ],

  // Spaces
  " ": [
    "\u0020", // space
    "\u00A0", // non-breaking space
    "\u2009", // thin space
    "\u200A", // hair space
    "\u200B", // zero-width space
  ],
};
