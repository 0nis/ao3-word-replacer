export function createOverlay(): HTMLDivElement {
  const overlay = document.createElement("div");
  overlay.id = "wordReplacerOverlay";
  overlay.className = "word-replacer__overlay";
  overlay.classList.add("word-replacer__hidden");
  return overlay;
}

export function createModal(): HTMLDivElement {
  const modal = document.createElement("div");
  modal.id = "wordReplacerModal";
  modal.className = "word-replacer";
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("aria-labelledby", "wordReplacerHeading");
  modal.classList.add("word-replacer__hidden");

  modal.innerHTML = `
    <div class="word-replacer__header">
      <h3 id="wordReplacerHeading" class="word-replacer__title">AO3 Word Replacer Settings</h3>
      <div class="word-replacer__settings">
        <button id="importWordsBtn" class="word-replacer__btn">Import</button>
        <button id="exportWordsBtn" class="word-replacer__btn">Export</button>
      </div>
    </div>
    <div class="word-replacer__table-wrapper">
      <table class="word-replacer__table">
        <thead>
          <tr>
            <th>Original</th>
            <th>Replacement</th>
            <th>Match Case</th>
            <th>Whole Word</th>
            <th>Preserve Case</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </div>
    <div class="word-replacer__actions">
      <button id="addWordBtn" class="word-replacer__btn" title="Add new word">＋</button>
      <div style="margin-left:auto;">
        <button id="saveWordsBtn" class="word-replacer__btn">Save</button>
        <button id="closeWordsBtn" class="word-replacer__btn">Close</button>
      </div>
    </div>
    <input type="file" id="importFileInput" accept=".json" style="display:none">
  `;
  return modal;
}
