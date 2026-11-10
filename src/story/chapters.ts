import { chapter1 } from './chapter1'
import { chapter2 } from './chapter2'
import { chapter3 } from './chapter3'
import { chapter4 } from './chapter4'
import { chapter5 } from './chapter5'
import { chapter6 } from './chapter6'
import { auctionCase } from './auction'
import { minibusCase } from './minibus'
import type { Chapter, Character, Conversation, Id, Photo, Puzzle, StoryCase, VoiceMessage } from './types'

export const GAME_TITLE = 'Fenyőháza titka'

/** Main story chapters in order. */
export const CHAPTERS: readonly Chapter[] = [chapter1, chapter2, chapter3, chapter4, chapter5, chapter6]

export const MAIN_CASE_ID = 'main'

/** The main story first, then the side cases. Chapter and content ids are unique across all of them. */
export const CASES: readonly StoryCase[] = [
  {
    id: MAIN_CASE_ID,
    kind: 'main',
    title: GAME_TITLE,
    summary: 'Gedeon nagybácsi hivatalosan balesetben halt meg. A hagyatékában talált cédula szerint nem, és a szál egy 25 éve leégett vitorlásklubhoz vezet.',
    chapters: CHAPTERS,
  },
  minibusCase,
  auctionCase,
]

const ALL_CHAPTERS = CASES.flatMap((c) => c.chapters)

export function findCase(id: Id): StoryCase | undefined {
  return CASES.find((c) => c.id === id)
}

/** The case a chapter belongs to; unknown chapters fall back to the main story. */
export function caseOfChapter(chapterId: Id): StoryCase {
  return CASES.find((c) => c.chapters.some((ch) => ch.id === chapterId)) ?? CASES[0]
}

export function findChapter(id: Id): Chapter | undefined {
  return ALL_CHAPTERS.find((c) => c.id === id)
}

/** Position of a chapter within its own case. */
export function chapterIndex(id: Id): number {
  return Math.max(0, caseOfChapter(id).chapters.findIndex((c) => c.id === id))
}

/** The current chapter and every chapter of the same case before it; their content stays on the phone. */
export function chaptersUpTo(id: Id): readonly Chapter[] {
  return caseOfChapter(id).chapters.slice(0, chapterIndex(id) + 1)
}

/** The chapter after this one in the same case, if any. */
export function chapterAfter(id: Id): Chapter | undefined {
  return caseOfChapter(id).chapters[chapterIndex(id) + 1]
}

const conversationsById = new Map<Id, Conversation>(
  ALL_CHAPTERS.flatMap((c) => c.conversations).map((c) => [c.id, c]),
)

export function findConversation(id: Id): Conversation | undefined {
  return conversationsById.get(id)
}

const photosById = new Map<Id, Photo>(ALL_CHAPTERS.flatMap((c) => c.photos).map((p) => [p.id, p]))

export function findPhoto(id: Id): Photo | undefined {
  return photosById.get(id)
}

const puzzlesById = new Map<Id, Puzzle>(ALL_CHAPTERS.flatMap((c) => c.puzzles).map((p) => [p.id, p]))

export function findPuzzle(id: Id): Puzzle | undefined {
  return puzzlesById.get(id)
}

const voiceById = new Map<Id, VoiceMessage>(ALL_CHAPTERS.flatMap((c) => c.voiceMessages ?? []).map((v) => [v.id, v]))

export function findVoiceMessage(id: Id): VoiceMessage | undefined {
  return voiceById.get(id)
}

const charactersById = new Map<Id, Character>(ALL_CHAPTERS.flatMap((c) => c.characters ?? []).map((ch) => [ch.id, ch]))

export function findCharacter(id: Id): Character | undefined {
  return charactersById.get(id)
}
