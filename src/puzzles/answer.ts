/**
 * Normalizes a typed puzzle answer before hashing: lowercase, no accents,
 * no whitespace, no punctuation ("Kikötő sétány 4." → "kikotosetany4").
 */
export function normalizeAnswer(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[\s.,;:!?'"„”“’()-]+/g, '')
}

/** Lowercase hex SHA-256 of the normalized answer. */
export async function hashAnswer(input: string): Promise<string> {
  const bytes = new TextEncoder().encode(normalizeAnswer(input))
  const digest = await crypto.subtle.digest('SHA-256', bytes)
  return [...new Uint8Array(digest)].map((b) => b.toString(16).padStart(2, '0')).join('')
}

export async function isCorrectAnswer(input: string, answerHash: string): Promise<boolean> {
  return (await hashAnswer(input)) === answerHash
}
