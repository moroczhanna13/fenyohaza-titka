/**
 * Normalizes a typed puzzle answer before hashing:
 * lowercase, no accents, no whitespace.
 */
export function normalizeAnswer(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/\s+/g, '')
}
