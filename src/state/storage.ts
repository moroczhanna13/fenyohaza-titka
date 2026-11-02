import { APPS } from '../apps/registry'
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

function isGameState(value: unknown): value is GameState {
  if (typeof value !== 'object' || value === null) return false
  const v = value as Partial<GameState>
  const knownApps = APPS.map((a) => a.id) as string[]
  return (
    v.version === SAVE_VERSION &&
    Array.isArray(v.unlockedApps) &&
    v.unlockedApps.every((id) => knownApps.includes(id))
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
