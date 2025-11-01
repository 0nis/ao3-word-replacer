import { safeExecute } from "../../utils/storage.js";
import { StorageAdapter } from "../../types/storage.js";
import { Dictionary } from "../../types/settings.js";
import { STORAGE_KEY } from "../../constants/settings.js";

export class FirefoxLocalAdapter implements StorageAdapter {
  async get(): Promise<Dictionary | null> {
    return safeExecute(async () => {
      const result = await browser.storage.local.get(STORAGE_KEY);
      return result[STORAGE_KEY] || {};
    }, "FirefoxLocalAdapter.get");
  }

  async set(dict: Dictionary): Promise<void | null> {
    return safeExecute(async () => {
      await browser.storage.local.set({ [STORAGE_KEY]: dict });
    }, "FirefoxLocalAdapter.set");
  }
}
