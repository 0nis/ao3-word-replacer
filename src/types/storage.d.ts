import { Dictionary } from "./settings.js";

export interface StorageAdapter {
  get(): Promise<Dictionary | null>;
  set(dict: Dictionary): Promise<void | null>;
}
