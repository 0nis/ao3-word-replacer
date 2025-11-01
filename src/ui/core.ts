import { createFocusTrap } from "focus-trap";

import { createModal, createOverlay } from "./modal/modal.js";
import { renderTable } from "./table/table.js";
import { addModalStyles } from "./modal/styles.js";

import type { Dictionary } from "../types/settings";
import type { State } from "../types/state";

import { setupModalEvents } from "./modal/events.js";
import { addNavButton } from "./modal/navButton.js";

const state: State = {
  dict: {},
};

export const UI = {
  init(dict: Dictionary): void {
    state.dict = { ...dict };

    addModalStyles();

    state.modal = createModal();
    state.overlay = createOverlay();
    document.body.append(state.modal, state.overlay);

    state.focusTrap = createFocusTrap(state.modal, {
      escapeDeactivates: true,
      clickOutsideDeactivates: true,
      onDeactivate: () => close(),
    });

    addNavButton(open);
    renderTable(state);
    setupModalEvents(state, close);
  },
};

function open(): void {
  state.modal!.classList.remove("hidden");
  state.overlay!.classList.remove("hidden");
  state.focusTrap?.activate();
}

function close(): void {
  state.modal!.classList.add("hidden");
  state.overlay!.classList.add("hidden");
  state.focusTrap?.deactivate();
}
