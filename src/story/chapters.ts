import { chapter1 } from './chapter1'
import type { Chapter, Conversation, Id } from './types'

/** Main story chapters in order. */
export const CHAPTERS: readonly Chapter[] = [chapter1]

export function chapterIndex(id: Id): number {
  return Math.max(0, CHAPTERS.findIndex((c) => c.id === id))
}

/** The current chapter and every chapter before it; their content stays on the phone. */
export function chaptersUpTo(id: Id): readonly Chapter[] {
  return CHAPTERS.slice(0, chapterIndex(id) + 1)
}

const conversationsById = new Map<Id, Conversation>(
  CHAPTERS.flatMap((c) => c.conversations).map((c) => [c.id, c]),
)

export function findConversation(id: Id): Conversation | undefined {
  return conversationsById.get(id)
}
