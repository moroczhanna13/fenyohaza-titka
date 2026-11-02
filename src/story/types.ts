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
  /** 'player' is the phone's side of the conversation (Gedeon in old messages). */
  from: 'contact' | 'player'
  text: string
  /** Optional date/time label shown above the message, e.g. "szept. 14. 21:30". */
  time?: string
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
  /** Messages already on the phone when the conversation becomes available. */
  history?: MessageStep[]
  /** Played live, one by one, after the history. */
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

// ---------- E-mail ----------

export interface Email {
  id: Id
  /** Sender as shown in the inbox. */
  from: string
  subject: string
  /** Display date, e.g. "szept. 30.". The inbox lists emails in data order. */
  date: string
  /** Paragraphs of the message body. */
  body: string[]
  availableAfter?: Condition
}

// ---------- Physical items (the box) ----------

export type DocumentBlock =
  /** `script: 'rovas'` renders the text in the Old Hungarian font (Unicode U+10C80 block). */
  | { type: 'text'; text: string; script?: 'rovas' }
  /** A key table, e.g. an alphabet: each entry pairs a Latin letter with its glyph. */
  | { type: 'glyphTable'; entries: [latin: string, glyph: string][] }

/** Something the player holds in hand, outside the phone. */
export interface BoxItem {
  id: Id
  title: string
  blocks: DocumentBlock[]
}

// ---------- Chapter ----------

export interface PhoneLock {
  /** The phone stays locked until this puzzle is solved. */
  puzzle: Id
  /** Shown on the lock screen, e.g. whose phone it is. */
  title: string
}

export interface AppUnlock {
  app: AppId
  availableAfter?: Condition
}

export interface Chapter {
  id: Id
  /** 1-based position in the main story; side cases leave it out. */
  number?: number
  title: string
  /** Paragraphs shown once when the chapter starts. */
  intro?: string[]
  lock?: PhoneLock
  /** Items available outside the phone (shown from the lock screen). */
  box?: BoxItem[]
  apps: AppUnlock[]
  conversations: Conversation[]
  /** Inbox, newest first. */
  emails?: Email[]
  photos: Photo[]
  puzzles: Puzzle[]
  evidence: Evidence[]
  /** The chapter is complete when this is met. Omitted while the chapter's content is unfinished. */
  completedWhen?: Condition
  /** Paragraphs shown on the chapter's closing screen. */
  outro?: string[]
}
