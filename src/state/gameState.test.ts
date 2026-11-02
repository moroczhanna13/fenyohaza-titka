import { describe, expect, it } from 'vitest'
import { createInitialState, gameReducer } from './gameState'
import { START_UNLOCKED_APPS } from '../story/start'

describe('gameReducer', () => {
  it('starts with the chapter 1 apps unlocked', () => {
    expect(createInitialState().unlockedApps).toEqual(START_UNLOCKED_APPS)
  })

  it('unlocks an app once', () => {
    const once = gameReducer(createInitialState(), { type: 'unlockApp', app: 'email' })
    expect(once.unlockedApps).toContain('email')
    expect(gameReducer(once, { type: 'unlockApp', app: 'email' })).toBe(once)
  })

  it('resets everything on new game', () => {
    const played = gameReducer(createInitialState(), { type: 'unlockApp', app: 'browser' })
    expect(gameReducer(played, { type: 'newGame' })).toEqual(createInitialState())
  })
})
