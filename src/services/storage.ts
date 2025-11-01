import { LocalStorageAdapter } from "../adapters/localStorage.js";
import { ChromeLocalAdapter } from "../adapters/chrome/chromeLocal.js";
import { ChromeSyncAdapter } from "../adapters/chrome/chromeSync.js";
import { FirefoxLocalAdapter } from "../adapters/firefox/firefoxLocal.js";
import { FirefoxSyncAdapter } from "../adapters/firefox/firefoxSync.js";

import { StorageAdapter } from "../types/storage";

import { Dictionary } from "../types/settings";
import { VERSION } from "../constants/settings";

let adapter: StorageAdapter | null = null;

export function getStorageAdapter(): StorageAdapter {
  if (adapter) return adapter;
  if (__STORAGE__ === "localStorage") return new LocalStorageAdapter();
  switch (__BROWSER__.toLowerCase()) {
    case "chrome":
      adapter =
        __STORAGE__.toLowerCase() === "sync"
          ? new ChromeSyncAdapter()
          : new ChromeLocalAdapter();
      break;
    case "firefox":
      adapter =
        __STORAGE__.toLowerCase() === "sync"
          ? new FirefoxSyncAdapter()
          : new FirefoxLocalAdapter();
      break;
    default:
      adapter = new LocalStorageAdapter();
  }
  return adapter;
}

export const Storage = {
  /**
   * Retrieves the dictionary from storage.
   * @returns A promise that resolves with the dictionary, or an empty object if none is found
   */
  async get(): Promise<Dictionary | null> {
    const adapter = getStorageAdapter();
    return await adapter.get();
  },

  /**
   * Saves the given dictionary to storage.
   * @param data Dictionary to save
   */
  async set(data: Dictionary): Promise<void> {
    const adapter = getStorageAdapter();
    await adapter.set(data);
  },

  /**
   * Exports the given dictionary as a JSON file.
   * @param dict Dictionary to export
   */
  async export(dict: Dictionary): Promise<void> {
    const exportData = {
      __ao3WordReplacer: true,
      version: VERSION,
      exportedAt: new Date().toISOString(),
      dictionary: dict,
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    const dateStr = new Date().toISOString().split("T")[0];
    a.href = url;
    a.download = `ao3-word-replacements_export_${dateStr}.json`;
    a.click();

    URL.revokeObjectURL(url);
  },

  /**
   * Imports a dictionary from a JSON file.
   * @param file File object to import
   * @returns A promise that resolves with the imported dictionary
   */
  async import(file: File): Promise<Dictionary> {
    return new Promise<Dictionary>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (ev) => {
        try {
          const imported = JSON.parse(ev.target?.result as string);

          if (
            typeof imported === "object" &&
            imported !== null &&
            imported.__ao3WordReplacer === true &&
            typeof imported.dictionary === "object"
          ) {
            const currentAdapter = await getStorageAdapter();
            await currentAdapter.set(imported.dictionary);
            resolve(imported.dictionary);
          } else {
            reject(
              new Error(
                "[AO3 Word Replacer] Invalid AO3 Word Replacer export file."
              )
            );
          }
        } catch (err) {
          reject(err);
        }
      };
      reader.onerror = reject;
      reader.readAsText(file);
    });
  },
};
