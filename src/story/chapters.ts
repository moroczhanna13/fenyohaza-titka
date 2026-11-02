import { chapter1 } from './chapter1'
import { chapter2 } from './chapter2'
import { chapter3 } from './chapter3'
import type { Chapter, Conversation, Id, Photo, Puzzle } from './types'

/** Main story chapters in order. */
export const CHAPTERS: readonly Chapter[] = [chapter1, chapter2, chapter3]

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

const photosById = new Map<Id, Photo>(CHAPTERS.flatMap((c) => c.photos).map((p) => [p.id, p]))

export function findPhoto(id: Id): Photo | undefined {
  return photosById.get(id)
}

const puzzlesById = new Map<Id, Puzzle>(CHAPTERS.flatMap((c) => c.puzzles).map((p) => [p.id, p]))

export function findPuzzle(id: Id): Puzzle | undefined {
  return puzzlesById.get(id)
}
