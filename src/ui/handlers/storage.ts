import { Storage } from "../../services/storage";
import { walkAndReplace } from "../../services/replacer";

import { extractRowData } from "../table/handlers";

import type { Dictionary } from "../../types/settings";

export async function handleSave(
  table: HTMLTableSectionElement
): Promise<Dictionary> {
  const newDict: Dictionary = {};

  table.querySelectorAll("tr").forEach((row) => {
    const rowData = extractRowData(row as HTMLTableRowElement);
    if (rowData) {
      const [key, entry] = rowData;
      newDict[key] = entry;
    }
  });

  await Storage.set(newDict);
  const container = document.querySelector("#chapters");
  if (container) walkAndReplace(container, newDict);
  return newDict;
}

export function handleExport(dict: Dictionary): void {
  Storage.export(dict);
}

export async function handleImport(file: File): Promise<Dictionary> {
  return Storage.import(file);
}
