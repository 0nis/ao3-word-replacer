import { safeExecute } from "../../utils/storage.js";
import { StorageAdapter } from "../../types/storage.js";
import { Dictionary } from "../../types/settings.js";
import { STORAGE_KEY } from "../../constants/settings.js";

export class ChromeLocalAdapter implements StorageAdapter {
  async get(): Promise<Dictionary | null> {
    return safeExecute(async () => {
      return new Promise((resolve) => {
        chrome.storage.local.get([STORAGE_KEY], (result) => {
          if (chrome.runtime.lastError) throw chrome.runtime.lastError;
          resolve(result[STORAGE_KEY] || {});
        });
      });
    }, "ChromeLocalAdapter.get");
  }

  async set(dict: Dictionary): Promise<void | null> {
    return safeExecute(async () => {
      return new Promise((resolve) => {
        chrome.storage.local.set({ [STORAGE_KEY]: dict }, () => {
          if (chrome.runtime.lastError) throw chrome.runtime.lastError;
          resolve();
        });
      });
    }, "ChromeLocalAdapter.set");
  }
}
