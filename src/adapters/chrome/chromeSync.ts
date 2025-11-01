import { safeExecute } from "../../utils/storage.js";
import { StorageAdapter } from "../../types/storage.js";
import { Dictionary } from "../../types/settings.js";
import { STORAGE_KEY } from "../../constants/settings.js";

// TODO: Add chunk saving functionality for large dictionaries
// Max per item size is 8kB

export class ChromeSyncAdapter implements StorageAdapter {
  async get(): Promise<Dictionary | null> {
    return safeExecute(async () => {
      return new Promise((resolve) => {
        chrome.storage.sync.get([STORAGE_KEY], (result) => {
          if (chrome.runtime.lastError) throw chrome.runtime.lastError;
          resolve(result[STORAGE_KEY] || {});
        });
      });
    }, "ChromeSyncAdapter.get");
  }

  async set(dict: Dictionary): Promise<void | null> {
    return safeExecute(async () => {
      return new Promise((resolve) => {
        chrome.storage.sync.set({ [STORAGE_KEY]: dict }, () => {
          if (chrome.runtime.lastError) throw chrome.runtime.lastError;
          resolve();
        });
      });
    }, "ChromeSyncAdapter.set");
  }
}
