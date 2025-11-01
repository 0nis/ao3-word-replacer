import "./_utils/setupDom.ts";

import { expect, test } from "./_utils/test.ts";
import { walkAndReplace } from "../src/services/replacer.ts";
import type { Dictionary } from "../src/types/settings.d.ts";

const defaultDict: Dictionary = {
  hello: {
    target: "Hello",
    replacement: "Hi",
    preserveCase: false,
    caseSensitive: false,
    wholeWord: false,
  },
  world: {
    target: "world",
    replacement: "Earth",
    preserveCase: false,
    caseSensitive: false,
    wholeWord: false,
  },
};

function createContainer(html: string): HTMLElement {
  const container = document.createElement("div");
  container.innerHTML = html;
  return container;
}

test("replaces all text nodes in a simple container", () => {
  const container = createContainer("<p>Hello</p><p>world</p>");
  walkAndReplace(container, defaultDict);
  expect(container.innerHTML).toBe("<p>Hi</p><p>Earth</p>");
});

test("replaces text nodes inside nested elements", () => {
  const container = createContainer(
    "<div><p>Hello</p><span>world</span></div>"
  );
  walkAndReplace(container, defaultDict);
  expect(container.innerHTML).toBe("<div><p>Hi</p><span>Earth</span></div>");
});

test("handles empty text nodes gracefully", () => {
  const container = createContainer("<p></p><p> </p>");
  walkAndReplace(container, defaultDict);
  expect(container.innerHTML).toBe("<p></p><p> </p>");
});
