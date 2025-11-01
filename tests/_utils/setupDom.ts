import { Window } from "happy-dom";

const window = new Window();

(globalThis as any).window = window;
(globalThis as any).document = window.document;
(globalThis as any).NodeFilter = window.NodeFilter;
(globalThis as any).HTMLElement = window.HTMLElement;
