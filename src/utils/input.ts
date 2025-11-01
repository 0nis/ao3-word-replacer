/**
 * Gets the value of a checkbox input in a table row.
 * @param row The table row element.
 * @param name The name of the checkbox input.
 * @returns The checked state of the checkbox.
 */
export function getCheckboxValue(row: HTMLElement, name: string): boolean {
  return (
    row.querySelector<HTMLInputElement>(`input[name="${name}"]`)?.checked ??
    false
  );
}

/**
 * Gets the value of a text input in a table row.
 * @param row The table row element.
 * @param name The name of the text input.
 * @returns The value of the text input.
 */
export function getInputValue(
  row: HTMLElement,
  name: string
): string | undefined {
  return row.querySelector<HTMLInputElement>(`input[name="${name}"]`)?.value;
}
