import { Options, Dictionary } from "../types/settings.js";

export const VERSION: number = 1;

export const DEFAULT_OPTIONS: Options = {
  caseSensitive: false,
  wholeWord: true,
  preserveCase: true,
};

export const DEFAULT_DICTIONARY: Dictionary = {};

export const STORAGE_KEY: string = "ao3WordReplacerSettings";
