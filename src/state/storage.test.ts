import { describe, expect, it } from 'vitest'
import { createInitialState, gameReducer } from './gameState'
import { loadGame, SAVE_KEY, saveGame } from './storage'

function memoryStorage(initial: Record<string, string> = {}) {
  const data = new Map(Object.entries(initial))
  return {
    getItem: (key: string) => data.get(key) ?? null,
    setItem: (key: string, value: string) => void data.set(key, value),
  }
}

describe('storage', () => {
  it('round-trips a saved game', () => {
    const storage = memoryStorage()
    const state = gameReducer(createInitialState(), { type: 'solvePuzzle', puzzle: 'ch1-lock' })
    saveGame(storage, state)
    expect(loadGame(storage)).toEqual(state)
  })

  it('returns null when nothing is saved or storage is unavailable', () => {
    expect(loadGame(memoryStorage())).toBeNull()
    expect(loadGame(null)).toBeNull()
  })

  it('ignores corrupt, outdated or unknown data', () => {
    const valid = createInitialState()
    expect(loadGame(memoryStorage({ [SAVE_KEY]: '{nem json' }))).toBeNull()
    expect(loadGame(memoryStorage({ [SAVE_KEY]: JSON.stringify({ ...valid, version: 1 }) }))).toBeNull()
    expect(loadGame(memoryStorage({ [SAVE_KEY]: JSON.stringify({ ...valid, chapter: 'ch99' }) }))).toBeNull()
    expect(loadGame(memoryStorage({ [SAVE_KEY]: JSON.stringify({ ...valid, solvedPuzzles: 'x' }) }))).toBeNull()
  })

  it('does not throw when saving fails', () => {
    const full = {
      getItem: () => null,
      setItem: () => {
        throw new Error('QuotaExceededError')
      },
    }
    expect(() => saveGame(full, createInitialState())).not.toThrow()
  })
})
