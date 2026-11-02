import type { AppId } from '../apps/registry'
import { START_UNLOCKED_APPS } from '../story/start'

/** Bump when the shape of GameState changes; older saves are then discarded. */
export const SAVE_VERSION = 1

export interface GameState {
  version: typeof SAVE_VERSION
  unlockedApps: AppId[]
}

export type GameAction = { type: 'newGame' } | { type: 'unlockApp'; app: AppId }

export function createInitialState(): GameState {
  return {
    version: SAVE_VERSION,
    unlockedApps: [...START_UNLOCKED_APPS],
  }
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'newGame':
      return createInitialState()
    case 'unlockApp':
      if (state.unlockedApps.includes(action.app)) return state
      return { ...state, unlockedApps: [...state.unlockedApps, action.app] }
  }
}
