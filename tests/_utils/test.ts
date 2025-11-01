export function test(name: string, fn: () => void) {
  try {
    fn();
    console.log(`✅ ${name}`);
  } catch (err) {
    console.error(`❌ ${name}`);
    if (err instanceof AssertionError) {
      console.error(`     expected: ${err.expected}`);
      console.error(`     got     : ${err.actual}`);
    } else {
      console.error(err);
    }
  }
}

class AssertionError extends Error {
  expected: unknown;
  actual: unknown;

  constructor(expected: unknown, actual: unknown, message?: string) {
    super(message ?? `Expected ${expected} but got ${actual}`);
    this.name = "AssertionError";
    this.expected = expected;
    this.actual = actual;
  }
}

export function expect(actual: unknown) {
  return {
    toBe(expected: unknown) {
      if (actual !== expected) {
        throw new AssertionError(expected, actual);
      }
    },
  };
}
