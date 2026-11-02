import { CHAPTERS } from '../story/chapters'
import { SAVE_VERSION, type GameState } from './gameState'

export const SAVE_KEY = 'fenyohaza-titka:save'

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

function isGameState(value: unknown): value is GameState {
  if (typeof value !== 'object' || value === null) return false
  const v = value as Partial<GameState>
  return (
    v.version === SAVE_VERSION &&
    typeof v.chapter === 'string' &&
    CHAPTERS.some((c) => c.id === v.chapter) &&
    typeof v.conversations === 'object' &&
    v.conversations !== null &&
    isStringArray(v.solvedPuzzles) &&
    isStringArray(v.viewedPhotos) &&
    isStringArray(v.introSeen) &&
    typeof v.openedHints === 'object' &&
    v.openedHints !== null &&
    Object.values(v.openedHints).every((n) => typeof n === 'number')
  )
}

/** Returns the saved game, or null if there is none or it is unreadable/outdated. */
export function loadGame(storage: KeyValueStorage | null): GameState | null {
  try {
    const raw = storage?.getItem(SAVE_KEY)
    if (!raw) return null
    const parsed: unknown = JSON.parse(raw)
    return isGameState(parsed) ? parsed : null
  } catch {
    return null
  }
}

export function saveGame(storage: KeyValueStorage | null, state: GameState): void {
  try {
    storage?.setItem(SAVE_KEY, JSON.stringify(state))
  } catch {
    // Quota exceeded or storage blocked: the game keeps running, just unsaved.
  }
}
