import { describe, expect, it } from 'vitest'
import { createInitialState, gameReducer } from './gameState'
import { availablePhotos, foundEvidence, isMet, isPhoneLocked, unlockedApps } from './selectors'

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

  it('keeps the phone locked until the password is solved', () => {
    expect(isPhoneLocked(createInitialState())).toBe(true)
    expect(isPhoneLocked(gameReducer(createInitialState(), { type: 'solvePuzzle', puzzle: 'ch1-lock' }))).toBe(false)
  })

  it('unlocks the chapter 1 apps with the phone', () => {
    expect(unlockedApps(createInitialState())).toEqual([])
    const unlocked = gameReducer(createInitialState(), { type: 'solvePuzzle', puzzle: 'ch1-lock' })
    expect(unlockedApps(unlocked)).toEqual(['messages', 'gallery', 'notebook'])
  })

  it('lists gallery photos newest first', () => {
    const photos = availablePhotos(createInitialState())
    const dates = photos.map((p) => p.info.takenAt)
    expect(dates).toEqual([...dates].sort().reverse())
    expect(photos[0].id).toBe('ch1-photo-lake-evening')
  })
})

describe('foundEvidence', () => {
  it('adds evidence as its condition is met', () => {
    const start = createInitialState()
    expect(foundEvidence(start)).toEqual([])
    const unlocked = gameReducer(start, { type: 'solvePuzzle', puzzle: 'ch1-lock' })
    expect(foundEvidence(unlocked).map((e) => e.id)).toEqual(['ch1-last-message'])
  })
})
