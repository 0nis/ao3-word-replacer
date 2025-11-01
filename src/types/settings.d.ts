export interface Options {
  caseSensitive: boolean;
  wholeWord: boolean;
  preserveCase: boolean;
}

export interface DictionaryEntry extends Options {
  target: string;
  replacement: string;
}

export type Dictionary = Record<string, DictionaryEntry>;
