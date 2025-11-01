import { handleSave, handleExport, handleImport } from "../handlers/storage";
import { showNotification } from "../handlers/ui";

import { addWordHandler, removeWordHandler } from "../table/handlers";
import { renderTable } from "../table/table";

import { State } from "../../types/state";

export function setupModalEvents(state: State, close: () => void): void {
  const modal = state.modal!;
  const tbody = modal.querySelector("tbody")!;

  modal.querySelector("#closeWordsBtn")?.addEventListener("click", () => {
    close();
  });

  modal.querySelector("#addWordBtn")?.addEventListener("click", () => {
    addWordHandler(state);
  });

  modal.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains("removeBtn"))
      removeWordHandler(state, target);
  });

  modal.querySelector("#saveWordsBtn")?.addEventListener("click", async () => {
    state.dict = await handleSave(tbody);
    renderTable(state);
    showNotification("AO3 Word Replacer: Changes saved successfully!");
  });

  modal.querySelector("#exportWordsBtn")?.addEventListener("click", () => {
    handleExport(state.dict);
  });

  modal.querySelector("#importWordsBtn")?.addEventListener("click", () => {
    (modal.querySelector("#importFileInput") as HTMLInputElement)?.click();
  });

  modal
    .querySelector("#importFileInput")
    ?.addEventListener("change", async (e) => {
      const input = e.target as HTMLInputElement;
      const file = input.files?.[0];
      if (!file) return;

      state.dict = await handleImport(file);
      renderTable(state);
      showNotification("AO3 Word Replacer: Import successful!");
    });
}
