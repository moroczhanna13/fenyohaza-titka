import { describe, expect, it } from 'vitest'
import { createInitialState, gameReducer, getProgress } from './gameState'

describe('gameReducer', () => {
  it('starts in the first chapter with no progress', () => {
    const state = createInitialState()
    expect(state.chapter).toBe('ch1')
    expect(state.solvedPuzzles).toEqual([])
  })

  it('records solved puzzles and viewed photos once', () => {
    let state = gameReducer(createInitialState(), { type: 'solvePuzzle', puzzle: 'p' })
    state = gameReducer(state, { type: 'solvePuzzle', puzzle: 'p' })
    state = gameReducer(state, { type: 'viewPhoto', photo: 'x' })
    expect(state.solvedPuzzles).toEqual(['p'])
    expect(state.viewedPhotos).toEqual(['x'])
  })

  it('advances a conversation only from the expected cursor', () => {
    const start = createInitialState()
    const from = getProgress(start, 'ch1-unknown').cursor
    const once = gameReducer(start, { type: 'advanceConversation', conversation: 'ch1-unknown', from, read: false })
    expect(getProgress(once, 'ch1-unknown').cursor).toBe(from + 1)
    expect(getProgress(once, 'ch1-unknown').readUpTo).toBe(from)
    // A stale timer firing again must not skip a message.
    expect(gameReducer(once, { type: 'advanceConversation', conversation: 'ch1-unknown', from, read: false })).toBe(once)
  })

  it('resets everything on new game', () => {
    const played = gameReducer(createInitialState(), { type: 'solvePuzzle', puzzle: 'p' })
    expect(gameReducer(played, { type: 'newGame' })).toEqual(createInitialState())
  })
})
