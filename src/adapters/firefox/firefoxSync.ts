import { safeExecute } from "../../utils/storage.js";
import { StorageAdapter } from "../../types/storage.js";
import { Dictionary } from "../../types/settings.js";
import { STORAGE_KEY } from "../../constants/settings.js";

// TODO: Add chunk saving functionality for large dictionaries
// Max per item size is 8kB

export class FirefoxSyncAdapter implements StorageAdapter {
  async get(): Promise<Dictionary | null> {
    return safeExecute(async () => {
      const result = await browser.storage.sync.get(STORAGE_KEY);
      return result[STORAGE_KEY] || {};
    }, "FirefoxSyncAdapter.get");
  }

  async set(dict: Dictionary): Promise<void | null> {
    return safeExecute(async () => {
      await browser.storage.sync.set({ [STORAGE_KEY]: dict });
    }, "FirefoxSyncAdapter.set");
  }
}
