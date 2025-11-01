import { expect, test } from "./_utils/test.ts";
import { transferCase } from "../src/services/replacer.ts";

// --- Basic cases ---
test("empty original returns replacement", () => {
  expect(transferCase("", "abc")).toBe("abc");
});

test("all uppercase original", () => {
  expect(transferCase("HELLO", "world")).toBe("WORLD");
});

test("all lowercase original", () => {
  expect(transferCase("hello", "WORLD")).toBe("world");
});

test("capitalized original", () => {
  expect(transferCase("Hello", "world")).toBe("World");
});

// --- Mixed case ---
test("mixed case shorter replacement", () => {
  expect(transferCase("HeLLo", "wo")).toBe("Wo");
});

test("mixed case longer replacement", () => {
  expect(transferCase("HeLLo", "wonderful")).toBe("WoNDerful");
});

test("replacement longer than original", () => {
  expect(transferCase("Hi", "WORLD")).toBe("World");
});

// --- Edge cases ---
test("single char uppercase original", () => {
  expect(transferCase("A", "b")).toBe("B");
});

test("single char lowercase original", () => {
  expect(transferCase("a", "B")).toBe("b");
});

test("single char capitalized original", () => {
  expect(transferCase("A", "b")).toBe("B");
});

test("replacement shorter than original", () => {
  expect(transferCase("Hello", "x")).toBe("X");
});

test("non-alphabetic characters in original", () => {
  expect(transferCase("h3-ll/o!", "world")).toBe("world");
});

test("non-alphabetic characters in replacement", () => {
  expect(transferCase("Hello", "W0-RLD/!")).toBe("W0-rld/!");
});

test("original with spaces", () => {
  expect(transferCase("he llo", "world")).toBe("world");
});

test("replacement with spaces", () => {
  expect(transferCase("Hello", "wo rld")).toBe("Wo rld");
});
