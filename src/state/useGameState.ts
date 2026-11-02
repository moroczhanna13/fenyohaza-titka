import { useEffect, useReducer } from 'react'
import { createInitialState, gameReducer } from './gameState'
import { browserStorage, loadGame, saveGame } from './storage'

/** Game state that is restored from and auto-saved to localStorage. */
export function useGameState() {
  const [state, dispatch] = useReducer(
    gameReducer,
    undefined,
    () => loadGame(browserStorage()) ?? createInitialState(),
  )

  useEffect(() => {
    saveGame(browserStorage(), state)
  }, [state])

  return [state, dispatch] as const
}
