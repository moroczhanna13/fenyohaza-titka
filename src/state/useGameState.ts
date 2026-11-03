import { useEffect, useReducer } from 'react'
import type { Id } from '../story/types'
import { createInitialState, gameReducer } from './gameState'
import { browserStorage, loadGame, saveGame } from './storage'

/** Game state of one case, restored from and auto-saved to localStorage. */
export function useGameState(caseId: Id) {
  const [state, dispatch] = useReducer(
    gameReducer,
    undefined,
    () => loadGame(browserStorage(), caseId) ?? createInitialState(caseId),
  )

  useEffect(() => {
    saveGame(browserStorage(), state)
  }, [state])

  return [state, dispatch] as const
}
