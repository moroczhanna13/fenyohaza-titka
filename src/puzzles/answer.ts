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

/** Answer string of a connect puzzle: the two statement ids, order-independent. */
export function connectAnswer(a: string, b: string): string {
  return [a, b].sort().join('+')
}

/** Answer string of one accusation question. */
export function accusationAnswer(questionId: string, optionIndex: number): string {
  return `${questionId}=${optionIndex}`
}

/** Answer string of the whole accusation: every question's answer in order. */
export function accusationAllAnswers(answers: [questionId: string, optionIndex: number][]): string {
  return answers.map(([q, i]) => accusationAnswer(q, i)).join('&')
}

/** Answer string of a timeline puzzle: the fitting statements in order, then the one that does not fit. */
export function timelineAnswer(order: string[], misfit: string): string {
  return `${order.filter((id) => id !== misfit).join('>')}|${misfit}`
}

/** Answer string of a route puzzle: the place ids in travel order, start included. */
export function routeAnswer(places: string[]): string {
  return places.join('>')
}

/** Answer string of a match puzzle: each left id paired with its right id, in the puzzle's left order. */
export function matchAnswer(pairs: [left: string, right: string][]): string {
  return pairs.map(([l, r]) => `${l}=${r}`).join('&')
}
