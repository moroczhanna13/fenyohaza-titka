import type { AppId } from '../apps/registry'

/*
 * Data format for chapters and side cases. All player-visible story text lives
 * in data files built from these types, never in components.
 *
 * Anything gated by a `Condition` is available from the start of its chapter
 * when the condition is omitted.
 */

export type Id = string

/** Something the player has done that can unlock further content. */
export type Condition =
  | { type: 'puzzleSolved'; puzzle: Id }
  | { type: 'conversationFinished'; conversation: Id }
  | { type: 'photoViewed'; photo: Id }
  | { type: 'all'; conditions: Condition[] }

// ---------- Messages ----------

export interface MessageStep {
  type: 'message'
  from: 'contact' | 'player'
  text: string
  /** Optional photo sent along with the message; it then also appears in the gallery. */
  photo?: Id
}

export interface ChoiceOption {
  /** What the player taps; it is sent as the player's message. */
  text: string
  /** The contact's reaction. Branches only change tone and details, then rejoin the main thread. */
  replies: MessageStep[]
}

export interface ChoiceStep {
  type: 'choice'
  options: ChoiceOption[]
}

/** Pauses the conversation until the condition is met (e.g. a puzzle is solved). */
export interface WaitStep {
  type: 'wait'
  until: Condition
}

export type ConversationStep = MessageStep | ChoiceStep | WaitStep

export interface Conversation {
  id: Id
  /** Contact name as shown in the conversation list. */
  contact: string
  availableAfter?: Condition
  steps: ConversationStep[]
}

// ---------- Gallery ----------

export interface PhotoInfo {
  /** ISO 8601 local date-time, e.g. "1999-07-17T22:45". */
  takenAt: string
  place?: string
  /** Decimal degrees. */
  coordinates?: { lat: number; lon: number }
  device?: string
}

export interface Photo {
  id: Id
  /** Path under public/, e.g. "images/ch1/lake.jpg". */
  src: string
  /** Text alternative describing what the photo shows. */
  alt: string
  caption?: string
  info: PhotoInfo
  availableAfter?: Condition
}

// ---------- Puzzles and hints ----------

/** Exactly three hints, from weakest to strongest. */
export type Hints = readonly [weak: string, medium: string, strong: string]

interface PuzzleBase {
  id: Id
  title: string
  /** The question or task shown to the player. */
  prompt: string
  hints: Hints
  availableAfter?: Condition
}

/**
 * The player types an answer. It is normalized (lowercase, no accents, no
 * whitespace) and compared by SHA-256 hash, so the solution is not in plain text.
 */
export interface TextPuzzle extends PuzzleBase {
  kind: 'text'
  /** Lowercase hex SHA-256 of the normalized answer. */
  answerHash: string
}

export type Puzzle = TextPuzzle

// ---------- Evidence ----------

export type EvidenceSource =
  | { type: 'photo'; photo: Id }
  | { type: 'conversation'; conversation: Id }
  | { type: 'puzzle'; puzzle: Id }

/** A finding that is added to the notebook automatically once found. */
export interface Evidence {
  id: Id
  title: string
  description: string
  source?: EvidenceSource
  foundWhen: Condition
}

// ---------- Chapter ----------

export interface AppUnlock {
  app: AppId
  availableAfter?: Condition
}

export interface Chapter {
  id: Id
  /** 1-based position in the main story; side cases leave it out. */
  number?: number
  title: string
  apps: AppUnlock[]
  conversations: Conversation[]
  photos: Photo[]
  puzzles: Puzzle[]
  evidence: Evidence[]
  /** The chapter is complete when this is met. */
  completedWhen: Condition
}
