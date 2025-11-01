import { generateUniqueKey } from "../../utils/dictionary";
import { getCheckboxValue, getInputValue } from "../../utils/input";
import { renderTable } from "./table";

import { DictionaryEntry } from "../../types/settings";
import { State } from "../../types/state";

import { DEFAULT_OPTIONS } from "../../constants/settings";

export function addWordHandler(state: State): void {
  const key = generateUniqueKey(state.dict);
  state.dict[key] = { ...DEFAULT_OPTIONS, target: "", replacement: "" };
  renderTable(state);
}

export function removeWordHandler(state: State, target: HTMLElement): void {
  const row = target.closest("tr");
  if (!row) return;
  const key = row.dataset.key;
  if (key && key in state.dict) delete state.dict[key];
  renderTable(state);
}

export function extractRowData(
  row: HTMLTableRowElement
): [string, DictionaryEntry] | null {
  const key = row.getAttribute("data-key");
  if (!key) return null;

  const targetInput = getInputValue(row, "target");
  const replacementInput = getInputValue(row, "replacement");

  const target = targetInput?.trim() ?? "";
  if (!target) return null;

  const entry: DictionaryEntry = {
    target,
    replacement: replacementInput ?? "",
    caseSensitive: getCheckboxValue(row, "caseSensitive"),
    wholeWord: getCheckboxValue(row, "wholeWord"),
    preserveCase: getCheckboxValue(row, "preserveCase"),
  };

  return [key, entry];
}
