/**
 * Safely execute a function and handle errors.
 * @param fn The function to execute.
 * @param context The context in which the function is executed.
 * @returns The result of the function or null if an error occurred.
 */
export async function safeExecute<T>(
  fn: () => Promise<T>,
  context: string
): Promise<T | null> {
  try {
    return await fn();
  } catch (error) {
    console.error(`[AO3 Word Replacer] Error in ${context}:`, error);
    return null;
  }
}
