import { describe, expect, it } from 'vitest'
import { createInitialState, gameReducer } from './gameState'
import { availablePhotos, isMet, unlockedApps } from './selectors'

describe('selectors', () => {
  it('evaluates nested conditions', () => {
    const state = gameReducer(createInitialState(), { type: 'solvePuzzle', puzzle: 'a' })
    expect(isMet(state, undefined)).toBe(true)
    expect(isMet(state, { type: 'puzzleSolved', puzzle: 'a' })).toBe(true)
    expect(
      isMet(state, {
        type: 'all',
        conditions: [
          { type: 'puzzleSolved', puzzle: 'a' },
          { type: 'photoViewed', photo: 'x' },
        ],
      }),
    ).toBe(false)
  })

  it('unlocks the chapter 1 apps', () => {
    expect(unlockedApps(createInitialState())).toEqual(['messages', 'gallery'])
  })

  it('lists gallery photos newest first', () => {
    const photos = availablePhotos(createInitialState())
    const dates = photos.map((p) => p.info.takenAt)
    expect(dates).toEqual([...dates].sort().reverse())
    expect(photos[0].id).toBe('ch1-photo-lake-evening')
  })
})
