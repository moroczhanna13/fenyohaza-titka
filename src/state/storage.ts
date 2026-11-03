import { caseOfChapter, findCase, MAIN_CASE_ID } from '../story/chapters'
import type { Id } from '../story/types'
import { SAVE_VERSION, type GameState } from './gameState'

export const SAVE_KEY = 'fenyohaza-titka:save'
/** The case the player had open last. */
export const ACTIVE_CASE_KEY = 'fenyohaza-titka:case'

/** The main story keeps the original key, so older saves still load; side cases get their own. */
export function saveKey(caseId: Id): string {
  return caseId === MAIN_CASE_ID ? SAVE_KEY : `${SAVE_KEY}:${caseId}`
}

type KeyValueStorage = Pick<Storage, 'getItem' | 'setItem'>

/** Browser storage, or null where it is unavailable (private mode, blocked cookies). */
export function browserStorage(): KeyValueStorage | null {
  try {
    return window.localStorage
  } catch {
    return null
  }
}

const isStringArray = (value: unknown) => Array.isArray(value) && value.every((v) => typeof v === 'string')

function isGameState(value: unknown, caseId: Id): value is GameState {
  if (typeof value !== 'object' || value === null) return false
  const v = value as Partial<GameState>
  return (
    v.version === SAVE_VERSION &&
    typeof v.chapter === 'string' &&
    !!findCase(caseId)?.chapters.some((c) => c.id === v.chapter) &&
    typeof v.conversations === 'object' &&
    v.conversations !== null &&
    isStringArray(v.solvedPuzzles) &&
    isStringArray(v.viewedPhotos) &&
    isStringArray(v.introSeen) &&
    isStringArray(v.seenEvidence) &&
    isStringArray(v.readEmails) &&
    isStringArray(v.visitedPages) &&
    typeof v.notes === 'string' &&
    typeof v.openedHints === 'object' &&
    v.openedHints !== null &&
    Object.values(v.openedHints).every((n) => typeof n === 'number')
  )
}

/** Returns the case's saved game, or null if there is none or it is unreadable/outdated. */
export function loadGame(storage: KeyValueStorage | null, caseId: Id = MAIN_CASE_ID): GameState | null {
  try {
    const raw = storage?.getItem(saveKey(caseId))
    if (!raw) return null
    const parsed: unknown = JSON.parse(raw)
    return isGameState(parsed, caseId) ? parsed : null
  } catch {
    return null
  }
}

export function saveGame(storage: KeyValueStorage | null, state: GameState): void {
  try {
    storage?.setItem(saveKey(caseOfChapter(state.chapter).id), JSON.stringify(state))
  } catch {
    // Quota exceeded or storage blocked: the game keeps running, just unsaved.
  }
}

export function loadActiveCase(storage: KeyValueStorage | null): Id {
  try {
    const id = storage?.getItem(ACTIVE_CASE_KEY)
    return id && findCase(id) ? id : MAIN_CASE_ID
  } catch {
    return MAIN_CASE_ID
  }
}

export function saveActiveCase(storage: KeyValueStorage | null, caseId: Id): void {
  try {
    storage?.setItem(ACTIVE_CASE_KEY, caseId)
  } catch {
    // Not saved: the main story opens next time.
  }
}
