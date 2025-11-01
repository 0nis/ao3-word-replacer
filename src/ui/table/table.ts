import { escapeHtml } from "../../utils/string";
import { State } from "../../types/state";
import { DEFAULT_OPTIONS } from "../../constants/settings";

export function renderTable(state: State): void {
  const tbody = state.modal!.querySelector("tbody");
  if (!tbody) return;
  tbody.innerHTML = "";

  for (const key in state.dict) {
    if (!Object.prototype.hasOwnProperty.call(state.dict, key)) continue;

    const entry = { ...DEFAULT_OPTIONS, ...state.dict[key] };
    const row = document.createElement("tr");
    row.dataset.key = key;

    row.innerHTML = `
      <td><input type="text" name="target" value="${escapeHtml(
        entry.target
      )}"></td>
      <td><input type="text" name="replacement" value="${escapeHtml(
        entry.replacement
      )}"></td>
      <td style="text-align:center"><input type="checkbox" name="caseSensitive" ${
        entry.caseSensitive ? "checked" : ""
      }></td>
      <td style="text-align:center"><input type="checkbox" name="wholeWord" ${
        entry.wholeWord ? "checked" : ""
      }></td>
      <td style="text-align:center"><input type="checkbox" name="preserveCase" ${
        entry.preserveCase ? "checked" : ""
      }></td>
      <td style="text-align:center"><button type="button" class="removeBtn word-replacer__btn" aria-label="Remove this row">X</button></td>
    `;
    tbody.appendChild(row);
  }
}
