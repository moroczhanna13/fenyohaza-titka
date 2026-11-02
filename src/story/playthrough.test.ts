import { describe, expect, it } from 'vitest'
import { isCorrectAnswer } from '../puzzles/answer'
import { buildTimeline } from '../state/conversation'
import { createInitialState, gameReducer, getProgress, type GameAction, type GameState } from '../state/gameState'
import {
  availableConversations,
  currentChapter,
  foundEvidence,
  isChapterComplete,
  isMet,
  isPhoneLocked,
} from '../state/selectors'
import { CHAPTERS, findPuzzle } from './chapters'
import type { Condition, Id } from './types'

/** Plain-text solutions, kept only in tests. Every puzzle in the story needs an entry. */
const SOLUTIONS: Record<Id, string> = {
  'ch1-lock': 'Kerekes',
  'ch1-photo-place': 'Kikötő sétány 4.',
}

type PickOption = (optionCount: number) => number

const firstOption: PickOption = () => 0
const lastOption: PickOption = (count) => count - 1

async function solve(state: GameState, puzzleId: Id): Promise<GameState> {
  const puzzle = findPuzzle(puzzleId)
  expect(puzzle, `unknown puzzle ${puzzleId}`).toBeDefined()
  expect(SOLUTIONS[puzzleId], `no test solution for ${puzzleId}`).toBeDefined()
  expect(await isCorrectAnswer(SOLUTIONS[puzzleId], puzzle!.answerHash)).toBe(true)
  return gameReducer(state, { type: 'solvePuzzle', puzzle: puzzleId })
}

/** What a player does to get past a wait step. */
async function satisfy(state: GameState, condition: Condition): Promise<GameState> {
  switch (condition.type) {
    case 'puzzleSolved':
      return solve(state, condition.puzzle)
    case 'photoViewed':
      return gameReducer(state, { type: 'viewPhoto', photo: condition.photo })
    case 'all':
      for (const c of condition.conditions) if (!isMet(state, c)) state = await satisfy(state, c)
      return state
    case 'conversationFinished':
      // Other conversations are played by the main loop.
      return state
  }
}

/**
 * Plays the current chapter like a player who never gets stuck: reads the intro,
 * unlocks the phone, plays every conversation forward and solves what it waits for.
 */
async function playChapter(start: GameState, pick: PickOption): Promise<GameState> {
  let state = start
  const chapter = currentChapter(state)
  const act = (action: GameAction) => (state = gameReducer(state, action))

  if (chapter.intro) act({ type: 'dismissIntro', chapter: chapter.id })
  if (chapter.lock && isPhoneLocked(state)) state = await solve(state, chapter.lock.puzzle)

  for (let guard = 0; guard < 1000 && !isChapterComplete(state); guard++) {
    let progressed = false
    for (const conversation of availableConversations(state)) {
      const progress = getProgress(state, conversation.id)
      const item = buildTimeline(conversation, progress.choices)[progress.cursor]
      if (!item) continue
      progressed = true
      if (item.kind === 'message') {
        act({ type: 'advanceConversation', conversation: conversation.id, from: progress.cursor, read: true })
      } else if (item.kind === 'choice') {
        act({ type: 'chooseOption', conversation: conversation.id, option: pick(item.options.length) })
      } else if (isMet(state, item.until)) {
        act({ type: 'advanceConversation', conversation: conversation.id, from: progress.cursor, read: true })
      } else {
        state = await satisfy(state, item.until)
      }
    }
    if (!progressed) break
  }
  return state
}

const playable = CHAPTERS.filter((c) => c.completedWhen)

describe('automatic playthrough', () => {
  it.each([
    ['first', firstOption],
    ['last', lastOption],
  ])('completes every finished chapter choosing the %s option each time', async (_name, pick) => {
    let state = createInitialState()
    for (const chapter of playable) {
      expect(state.chapter).toBe(chapter.id)
      state = await playChapter(state, pick)
      expect(isChapterComplete(state), `${chapter.id} did not complete`).toBe(true)

      // Key information arrives whatever the player chooses: all evidence is found.
      const found = foundEvidence(state).map((e) => e.id)
      for (const evidence of chapter.evidence) expect(found).toContain(evidence.id)

      state = gameReducer(state, { type: 'advanceChapter' })
    }
  })

  it('has a solution and exactly three distinct hints for every puzzle', async () => {
    for (const puzzle of CHAPTERS.flatMap((c) => c.puzzles)) {
      expect(await isCorrectAnswer(SOLUTIONS[puzzle.id] ?? '', puzzle.answerHash), puzzle.id).toBe(true)
      expect(new Set(puzzle.hints).size, puzzle.id).toBe(3)
    }
  })
})
