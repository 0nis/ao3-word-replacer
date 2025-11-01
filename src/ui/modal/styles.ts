export function addModalStyles(): void {
  const style = document.createElement("style");
  style.textContent = `
    .word-replacer__overlay {
      position: fixed;
      top: 0; left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 98;
    }
    .word-replacer {
      position: fixed;
      top: 50%; left: 50%;
      transform: translate(-50%, -50%);
      background: inherit;
      color: inherit;
      padding: 20px;
      box-shadow: 0 0 30px;
      box-sizing: border-box;
      max-height: 100%;
      max-width: 100%;
      overflow: auto;
      z-index: 99;
    }
    .word-replacer__header {
      display: flex;
      justify-content: space-between;
    }
    .word-replacer__settings {
      display: flex;
      justify-content: flex-end;
      flex-wrap: wrap;
      gap: 3px;
      margin-bottom: 3px;
    }
    .word-replacer__table-wrapper {
      overflow-x: auto;
      margin-top: 5px;
    }
    .word-replacer__table {
      width: 100%;
      border-collapse: collapse;
    }
    .word-replacer__actions {
      display: flex;
      align-items: center;
      margin-top: 10px;
    }
    .word-replacer__btn:hover {
      cursor: pointer;
      opacity: 0.8;
    }
    .word-replacer__table th:nth-child(1),
    .word-replacer__table td:nth-child(1),
    .word-replacer__table th:nth-child(2),
    .word-replacer__table td:nth-child(2) {
      min-width: 120px;
    }
    .hidden {
      display: none !important;
    }
  `;
  document.head.appendChild(style);
}
