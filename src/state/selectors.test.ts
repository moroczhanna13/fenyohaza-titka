import { describe, expect, it } from 'vitest'
import { createInitialState, gameReducer } from './gameState'
import {
  availableEmails,
  availableNotes,
  availablePhotos,
  foundEvidence,
  knownCharacters,
  isChapterComplete,
  isMet,
  isPhoneLocked,
  nextChapter,
  unlockedApps,
  unreadInboxCount,
} from './selectors'

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
    expect(unlockedApps(unlocked)).toEqual(['messages', 'gallery', 'notebook', 'email', 'contacts'])
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

describe('availableEmails', () => {
  it('fills the inbox once the phone is unlocked', () => {
    expect(availableEmails(createInitialState())).toEqual([])
    const unlocked = gameReducer(createInitialState(), { type: 'solvePuzzle', puzzle: 'ch1-lock' })
    expect(availableEmails(unlocked).length).toBeGreaterThan(0)
  })

  it('counts only unread inbox mail, not sent mail or spam', () => {
    const unlocked = gameReducer(createInitialState(), { type: 'solvePuzzle', puzzle: 'ch1-lock' })
    const emails = availableEmails(unlocked)
    const inbox = emails.filter((e) => (e.folder ?? 'inbox') === 'inbox')
    expect(inbox.length).toBeLessThan(emails.length)
    expect(unreadInboxCount(unlocked)).toBe(inbox.length)
    const read = gameReducer(unlocked, { type: 'readEmail', email: inbox[0].id })
    expect(unreadInboxCount(read)).toBe(inbox.length - 1)
  })
})

describe('notes and characters', () => {
  it("shows Gedeon's notes and the known people once the phone is unlocked", () => {
    expect(availableNotes(createInitialState())).toEqual([])
    const unlocked = gameReducer(createInitialState(), { type: 'solvePuzzle', puzzle: 'ch1-lock' })
    expect(availableNotes(unlocked).length).toBeGreaterThan(0)
    const people = knownCharacters(unlocked)
    expect(people.map((p) => p.character.id)).toContain('gedeon')
    const pal = people.find((p) => p.character.id === 'pal')!
    const before = pal.facts.length
    const placed = gameReducer(unlocked, { type: 'solvePuzzle', puzzle: 'ch1-photo-place' })
    expect(knownCharacters(placed).find((p) => p.character.id === 'pal')!.facts.length).toBe(before + 1)
  })
})

describe('chapter progress', () => {
  it('moves on from chapter 1 to chapter 2', () => {
    let state = createInitialState()
    expect(isChapterComplete(state)).toBe(false)
    expect(nextChapter(state)?.id).toBe('ch2')
    state = gameReducer(state, { type: 'advanceChapter' })
    expect(state.chapter).toBe('ch2')
    expect(isChapterComplete(state)).toBe(false)
  })

  it('stays in the last chapter', () => {
    let state = createInitialState()
    while (nextChapter(state)) state = gameReducer(state, { type: 'advanceChapter' })
    expect(gameReducer(state, { type: 'advanceChapter' })).toBe(state)
  })
})
