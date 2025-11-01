import { expect, test } from "./_utils/test.ts";

import { processTextNode } from "../src/services/replacer.ts";
import type { Dictionary } from "../src/types/settings.d.ts";

function createTextNode(value: string): Text {
  return { nodeValue: value } as unknown as Text;
}

const baseEntry = { target: "foo", replacement: "bar" };

test("default replacement (all options false)", () => {
  const node = createTextNode("foo foofoo");
  const dict: Dictionary = {
    test: {
      ...baseEntry,
      caseSensitive: false,
      wholeWord: false,
      preserveCase: false,
    },
  };
  processTextNode(node, dict);
  expect(node.nodeValue).toBe("bar barbar");
});

test("caseSensitive true should only match exact case", () => {
  const node = createTextNode("Foo foo FOO");
  const dict: Dictionary = {
    test: {
      ...baseEntry,
      caseSensitive: true,
      wholeWord: false,
      preserveCase: false,
    },
  };
  processTextNode(node, dict);
  expect(node.nodeValue).toBe("Foo bar FOO");
});

test("wholeWord true should only match standalone words", () => {
  const node = createTextNode("foo foofoo");
  const dict: Dictionary = {
    test: {
      ...baseEntry,
      caseSensitive: false,
      wholeWord: true,
      preserveCase: false,
    },
  };
  processTextNode(node, dict);
  expect(node.nodeValue).toBe("bar foofoo");
});

test("preserveCase true should match case of original text", () => {
  const node = createTextNode("foo FOO Foo fOo");
  const dict: Dictionary = {
    test: {
      ...baseEntry,
      caseSensitive: false,
      wholeWord: false,
      preserveCase: true,
    },
  };
  processTextNode(node, dict);
  expect(node.nodeValue).toBe("bar BAR Bar bAr");
});

test("combined options: caseSensitive + wholeWord + preserveCase", () => {
  const node = createTextNode("foo Foo foofoo FOO");
  const dict: Dictionary = {
    test: {
      ...baseEntry,
      caseSensitive: true,
      wholeWord: true,
      preserveCase: true,
    },
  };
  processTextNode(node, dict);
  expect(node.nodeValue).toBe("bar Foo foofoo FOO");
});

test("empty text node should remain unchanged", () => {
  const node = createTextNode("");
  const dict: Dictionary = {
    test: {
      ...baseEntry,
      caseSensitive: false,
      wholeWord: false,
      preserveCase: false,
    },
  };
  processTextNode(node, dict);
  if (node.nodeValue !== "") throw new Error(`got: ${node.nodeValue}`);
});

test("non-string target/replacement ignored", () => {
  const node = createTextNode("foo");
  const dict: any = { test: { target: 123, replacement: null } };
  processTextNode(node, dict);
  expect(node.nodeValue).toBe("foo");
});

test("space in target with wholeWord option", () => {
  const node = createTextNode("foo bar foo");
  const dict: Dictionary = {
    test: {
      target: "foo bar",
      replacement: "bar",
      caseSensitive: false,
      wholeWord: true,
      preserveCase: false,
    },
  };
  processTextNode(node, dict);
  expect(node.nodeValue).toBe("bar foo");
});

test("special characters in target", () => {
  const node = createTextNode("foo foo-foo/bar bar foo");
  const dict: Dictionary = {
    test: {
      target: "foo-foo/bar",
      replacement: "bar",
      caseSensitive: false,
      wholeWord: false,
      preserveCase: false,
    },
  };
  processTextNode(node, dict);
  expect(node.nodeValue).toBe("foo bar bar foo");
});
