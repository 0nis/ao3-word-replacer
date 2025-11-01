import { safeExecute } from "../utils/storage.js";

import { StorageAdapter } from "../types/storage";
import { Dictionary } from "../types/settings.js";

import { STORAGE_KEY } from "../constants/settings.js";

export class LocalStorageAdapter implements StorageAdapter {
  async get(): Promise<Dictionary | null> {
    return safeExecute(async () => {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : {};
    }, "LocalStorageAdapter.get");
  }

  async set(dict: Dictionary): Promise<void | null> {
    return safeExecute(async () => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(dict));
    }, "LocalStorageAdapter.set");
  }
}
