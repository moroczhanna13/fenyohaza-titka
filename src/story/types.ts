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
  /** A web page or a news article was opened in the browser. */
  | { type: 'pageVisited'; page: Id }
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
  /** Optional voice message (see Chapter.voiceMessages) sent along with the message. */
  audio?: Id
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
  /**
   * Id of an earlier conversation this one continues (e.g. the same contact in a
   * later chapter). Both are shown as one chat thread on the phone.
   */
  thread?: Id
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
  /** Lowercase hex SHA-256 of the normalized answer (see src/puzzles/answer.ts for each kind's answer string). */
  answerHash: string
  /** What the player concludes once it is solved, shown in the Deductions app. */
  conclusion?: string
  /**
   * Set when the puzzle is solved somewhere else than where it is asked, e.g. on a web page.
   * The chat then shows this text and the hints instead of an answer field.
   */
  whereToSolve?: string
}

/**
 * The player types an answer. It is normalized (lowercase, no accents, no
 * whitespace, no punctuation) and compared by hash, so the solution is not in plain text.
 */
export interface TextPuzzle extends PuzzleBase {
  kind: 'text'
}

export interface Statement {
  id: Id
  text: string
}

/** Pick the two statements that contradict each other. Solved in the Deductions app. */
export interface ConnectPuzzle extends PuzzleBase {
  kind: 'connect'
  statements: Statement[]
}

/**
 * Put statements in chronological order and mark the one that does not fit.
 * Solved in the Deductions app.
 */
export interface TimelinePuzzle extends PuzzleBase {
  kind: 'timeline'
  statements: Statement[]
}

/**
 * Pair each item on the left with one on the right (e.g. phone numbers with names).
 * Right items may outnumber the left ones. Solved in the Deductions app (see matchAnswer).
 */
export interface MatchPuzzle extends PuzzleBase {
  kind: 'match'
  left: Statement[]
  right: Statement[]
}

export interface LedgerRow {
  id: Id
  date: string
  text: string
  income?: number
  expense?: number
  /** Balance as written in the book; in the falsified row it does not add up. */
  balance: number
  /** Initials of whoever entered the row. */
  signed: string
}

/** Mark the row of a cash book whose balance does not add up. Answer: the row id. */
export interface LedgerPuzzle extends PuzzleBase {
  kind: 'ledger'
  /** Heading above the table, e.g. what the document is. */
  caption: string
  /** Handwritten margin note shown under the table. */
  note?: string
  rows: LedgerRow[]
}

export interface AccusationQuestion {
  id: Id
  text: string
  options: string[]
  /** Hash of accusationAnswer(question id, chosen option index). */
  answerHash: string
  /** Chapter whose evidence the player is sent back to after a wrong answer. */
  chapter: Id
}

/**
 * The final accusation: every question must be answered right in one go.
 * Its own answerHash covers all answers (see accusationAnswer).
 */
export interface AccusationPuzzle extends PuzzleBase {
  kind: 'accusation'
  questions: AccusationQuestion[]
}

export interface MapPlace {
  id: Id
  label: string
  /** Position on the map, x 0–100 from the left, y 0–80 from the top. */
  x: number
  y: number
  /** Where the label goes; below the dot by default. */
  labelSide?: 'below' | 'left' | 'right'
}

export interface MapRoad {
  from: Id
  to: Id
  km: number
}

/**
 * Build a route on a map, place by place along the roads (places may be visited
 * again). Solved in the Deductions app; the answer is the places in order (see routeAnswer).
 */
export interface RoutePuzzle extends PuzzleBase {
  kind: 'route'
  places: MapPlace[]
  roads: MapRoad[]
  /** Where the route begins. */
  start: Id
}

export type Puzzle =
  | TextPuzzle
  | ConnectPuzzle
  | TimelinePuzzle
  | MatchPuzzle
  | LedgerPuzzle
  | AccusationPuzzle
  | RoutePuzzle

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

export type EmailFolder = 'inbox' | 'sent' | 'spam'

export interface Email {
  id: Id
  /** Inbox by default. Only the inbox counts towards the unread badge. */
  folder?: EmailFolder
  /** Sender as shown in the inbox; for sent mail, the recipient. */
  from: string
  subject: string
  /** Display date, e.g. "szept. 30.". The inbox lists emails in data order. */
  date: string
  /** Paragraphs of the message body. */
  body: string[]
  availableAfter?: Condition
}

// ---------- Web pages (Browser app) ----------

export interface NewsArticle {
  id: Id
  /** Publication date, "YYYY-MM-DD". */
  date: string
  title: string
  author?: string
  body: string[]
}

interface WebPageBase {
  id: Id
  /** Address without protocol, e.g. "fenyohazihirek.hu/archivum". */
  url: string
  title: string
  /** Short text under the page heading. */
  intro?: string
  /** Listed on the browser's start page. */
  bookmarked?: boolean
  availableAfter?: Condition
}

/** Newspaper archive, searchable by date. */
export interface NewsArchivePage extends WebPageBase {
  kind: 'newsArchive'
  /** A search for a day lists articles from that day and this many days after. */
  searchDays: number
  articles: NewsArticle[]
}

export interface VehicleRecord {
  /** As printed on the plate, e.g. "GBM-418". */
  plate: string
  vehicle: string
  color: string
  holder: string
  /** When the holder had the vehicle, e.g. "1997–2005". */
  period: string
}

/** Vehicle history lookup by (old) number plate. */
export interface VehicleRegistryPage extends WebPageBase {
  kind: 'vehicleRegistry'
  records: VehicleRecord[]
}

/** A plain page made of document blocks, e.g. a social profile or a reference sheet. */
export interface StaticPage extends WebPageBase {
  kind: 'static'
  blocks: DocumentBlock[]
}

export interface LoginUser {
  name: string
  /** Shown after "Elfelejtett jelszó?". */
  passwordHint: string
}

/**
 * A page behind a login. The player first picks a user. The password of `user`
 * is the text puzzle `puzzle`; every other user is a dead end. The blocks show once it is solved.
 */
export interface LoginPage extends WebPageBase {
  kind: 'login'
  users: LoginUser[]
  /** Name of the user whose password is the puzzle. */
  user: string
  puzzle: Id
  blocks: DocumentBlock[]
}

export interface ImageSearchMatch {
  title: string
  url: string
  /** Display date of the page, e.g. "2019. március 14.". */
  date?: string
  snippet: string
}

export interface ImageSearchEntry {
  /** Marked as a visited page once the player searches with the photo. */
  id: Id
  photo: Id
  matches: ImageSearchMatch[]
}

/** Reverse image search: the player picks a gallery photo and sees where else it appears. */
export interface ImageSearchPage extends WebPageBase {
  kind: 'imageSearch'
  /** Photos without an entry find nothing. */
  searches: ImageSearchEntry[]
}

export interface SocialComment {
  author: string
  text: string
}

export interface SocialPost {
  author: string
  /** Display time, e.g. "2024. március 1." */
  time: string
  text: string
  /** Optional picture; path under public/. */
  image?: { src: string; alt: string }
  likes?: number
  comments?: SocialComment[]
}

/**
 * A profile on a social network: a person, a group or a business.
 * Groups and businesses are listed on the network's home page; people are only found by searching.
 */
export interface SocialPage extends WebPageBase {
  kind: 'social'
  profileType: 'person' | 'group' | 'business'
  /** Shown in the profile header and matched by the home page search. */
  name: string
  about?: string
  /** Short facts under the name, e.g. place, opening hours, phone number. */
  details?: string[]
  posts: SocialPost[]
}

/**
 * Home page of a social network with a search box. It lists the available
 * social pages whose url starts with its own url.
 */
export interface SocialHomePage extends WebPageBase {
  kind: 'socialHome'
}

export type WebPage =
  | NewsArchivePage
  | VehicleRegistryPage
  | StaticPage
  | LoginPage
  | ImageSearchPage
  | SocialPage
  | SocialHomePage

// ---------- Voice messages ----------

/** A recorded voice message, generated in the browser (Web Audio API). */
export interface VoiceMessage {
  id: Id
  /**
   * Knocking in the background, in Morse code: "." short, "-" long,
   * " " between letters, " / " between words.
   */
  knocks: string
  /** Text equivalent of the recording, shown on request. */
  transcript: string[]
}

// ---------- Physical items (the box) ----------

export type DocumentBlock =
  /** `script: 'rovas'` renders the text in the Old Hungarian font (Unicode U+10C80 block). */
  | { type: 'text'; text: string; script?: 'rovas' }
  /** A key table, e.g. an alphabet: each entry pairs a Latin letter with its glyph. */
  | { type: 'glyphTable'; entries: [latin: string, glyph: string][] }
  | { type: 'heading'; text: string }
  | { type: 'table'; headers: string[]; rows: string[][] }
  /** A link to another in-game web page (only clickable inside the Browser). */
  | { type: 'link'; text: string; url: string }

/** Something the player holds in hand, outside the phone. */
export interface BoxItem {
  id: Id
  title: string
  blocks: DocumentBlock[]
}

// ---------- Gedeon's notes and the people of the story ----------

/**
 * A page of Gedeon's own notes, shown in the Notebook. Short and fragmentary:
 * it raises questions and points somewhere, it does not give answers.
 */
export interface Note {
  id: Id
  /** Display date, e.g. "szept. 5." */
  date?: string
  text: string
  availableAfter?: Condition
}

/** Someone in the story, listed in the notebook's people tab once known. */
export interface Character {
  id: Id
  name: string
  /** Role in 2001, e.g. "a klub könyvelője". */
  roleThen?: string
  /** Role today, e.g. "patikus, Fenyő Patika". */
  roleNow?: string
  knownWhen?: Condition
}

/** Something the player has found out about a character; it appears in the notebook's people tab. */
export interface CharacterFact {
  id: Id
  /** A character of this chapter or an earlier one. */
  character: Id
  text: string
  knownWhen?: Condition
  /** Once this fact is known, the character is shown with this name (e.g. when an unknown number gets a name). */
  rename?: string
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
  /** Pages reachable in the Browser app. */
  pages?: WebPage[]
  voiceMessages?: VoiceMessage[]
  photos: Photo[]
  puzzles: Puzzle[]
  evidence: Evidence[]
  /** Pages of Gedeon's notes, shown in the Notebook. */
  notes?: Note[]
  /** People introduced in this chapter (notebook, people tab). */
  characters?: Character[]
  /** What can be found out about the people, in this chapter. */
  characterFacts?: CharacterFact[]
  /** The chapter is complete when this is met. Omitted while the chapter's content is unfinished. */
  completedWhen?: Condition
  /** Paragraphs shown on the chapter's closing screen. */
  outro?: string[]
}

/** A playable story: the main story or a short side case. Each has its own save. */
export interface StoryCase {
  id: Id
  kind: 'main' | 'side'
  title: string
  /** One or two sentences shown in the case picker. */
  summary: string
  chapters: readonly Chapter[]
}
