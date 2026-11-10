import { describe, expect, it } from 'vitest'
import {
  accusationAllAnswers,
  accusationAnswer,
  connectAnswer,
  isCorrectAnswer,
  matchAnswer,
  routeAnswer,
  timelineAnswer,
} from '../puzzles/answer'
import { buildTimeline } from '../state/conversation'
import { createInitialState, gameReducer, getProgress, type GameAction, type GameState } from '../state/gameState'
import {
  availableConversations,
  availablePages,
  availablePhotos,
  currentChapter,
  foundEvidence,
  isChapterComplete,
  isMet,
  isPhoneLocked,
} from '../state/selectors'
import { CASES, findPuzzle } from './chapters'
import type { Condition, Id } from './types'

/** The right option index for each accusation question. */
const ACCUSATION: [string, number][] = [
  ['ch6-q-arsonist', 3],
  ['ch6-q-not-accident', 1],
  ['ch6-q-motive', 2],
  ['ch6-q-witness', 0],
  ['ch6-q-gedeon', 3],
]

/** Plain-text solutions, kept only in tests. Every puzzle in the story needs an entry. */
const SOLUTIONS: Record<Id, string> = {
  'ch1-lock': 'Kerekes',
  'ch1-photo-place': 'Kikötő sétány 4.',
  'ch2-article-time': '23:40',
  'ch2-who-lied': connectAnswer('ch2-s-toth', 'ch2-s-log'),
  'ch3-numbers': matchAnswer([
    ['ch3-n-412', 'ch3-p-toth'],
    ['ch3-n-518', 'ch3-p-pasztor'],
    ['ch3-n-266', 'ch3-p-meszaros'],
  ]),
  'ch3-car-owner': 'Mészáros Béla',
  'ch3-timeline': timelineAnswer(['ch3-t-ilona', 'ch3-t-pasztor', 'ch3-t-toth'], 'ch3-t-meszaros'),
  'ch4-ledger': 'ch4-r-advance',
  'ch4-pharmacy-password': 'Bodri2004',
  'ch5-reka-lie': connectAnswer('ch5-s-camp', 'ch5-s-dinner'),
  'ch5-morse': 'patika',
  'ch6-accusation': accusationAllAnswers(ACCUSATION),
  'mb-route': routeAnswer(['mb-school', 'mb-nadas', 'mb-inn', 'mb-nadas', 'mb-kovago']),
  'mb-location': 'Ködös-major',
  'au-source': 'Vértes Aukciósház',
  'au-lie': connectAnswer('au-s-local', 'au-s-abroad'),
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
    case 'pageVisited':
      return gameReducer(state, { type: 'visitPage', page: condition.page })
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
    // A curious player also looks at every photo and web page on the phone,
    for (const photo of availablePhotos(state)) act({ type: 'viewPhoto', photo: photo.id })
    for (const page of availablePages(state)) {
      act({ type: 'visitPage', page: page.id })
      // ...and runs a reverse image search with every photo it has.
      if (page.kind !== 'imageSearch') continue
      const photos = availablePhotos(state).map((p) => p.id)
      for (const search of page.searches) if (photos.includes(search.photo)) act({ type: 'visitPage', page: search.id })
    }
    if (!progressed) break
  }
  return state
}

const ALL_PUZZLES = CASES.flatMap((c) => c.chapters).flatMap((c) => c.puzzles)

describe('automatic playthrough', () => {
  it.each(
    CASES.flatMap((c) => [
      [c.id, 'first', firstOption],
      [c.id, 'last', lastOption],
    ] as const),
  )('completes %s choosing the %s option each time', async (caseId, _name, pick) => {
    const storyCase = CASES.find((c) => c.id === caseId)!
    let state = createInitialState(caseId)
    for (const chapter of storyCase.chapters.filter((c) => c.completedWhen)) {
      expect(state.chapter).toBe(chapter.id)
      state = await playChapter(state, pick)
      expect(isChapterComplete(state), `${chapter.id} did not complete`).toBe(true)

      // Key information arrives whatever the player chooses: all evidence is found.
      const found = foundEvidence(state).map((e) => e.id)
      for (const evidence of chapter.evidence) expect(found).toContain(evidence.id)

      state = gameReducer(state, { type: 'advanceChapter' })
    }
  })

  it('accepts exactly the right option for each accusation question', async () => {
    const accusation = ALL_PUZZLES.find((p) => p.kind === 'accusation')
    expect(accusation).toBeDefined()
    if (accusation?.kind !== 'accusation') return
    for (const [id, right] of ACCUSATION) {
      const question = accusation.questions.find((q) => q.id === id)!
      for (let i = 0; i < question.options.length; i++) {
        expect(await isCorrectAnswer(accusationAnswer(id, i), question.answerHash), `${id} option ${i}`).toBe(i === right)
      }
    }
  })

  it('has a solution and exactly three distinct hints for every puzzle', async () => {
    for (const puzzle of ALL_PUZZLES) {
      expect(await isCorrectAnswer(SOLUTIONS[puzzle.id] ?? '', puzzle.answerHash), puzzle.id).toBe(true)
      expect(new Set(puzzle.hints).size, puzzle.id).toBe(3)
    }
  })
})
