import type { Id } from '../story/types'
import { CHAPTERS, findConversation } from '../story/chapters'
import { buildTimeline, initialProgress, type ConversationProgress } from './conversation'

/** Bump when the shape of GameState changes; older saves are then discarded. */
export const SAVE_VERSION = 2

export interface GameState {
  version: typeof SAVE_VERSION
  /** Current main-story chapter. */
  chapter: Id
  /** Only conversations the player has progressed in; the rest use initialProgress(). */
  conversations: Record<Id, ConversationProgress>
  solvedPuzzles: Id[]
  viewedPhotos: Id[]
}

export type GameAction =
  | { type: 'newGame' }
  /** Delivers the next timeline item, if the cursor is still at `from` (guards against double timers). */
  | { type: 'advanceConversation'; conversation: Id; from: number; read: boolean }
  | { type: 'chooseOption'; conversation: Id; option: number }
  | { type: 'markConversationRead'; conversation: Id }
  | { type: 'solvePuzzle'; puzzle: Id }
  | { type: 'viewPhoto'; photo: Id }

export function createInitialState(): GameState {
  return {
    version: SAVE_VERSION,
    chapter: CHAPTERS[0].id,
    conversations: {},
    solvedPuzzles: [],
    viewedPhotos: [],
  }
}

export function getProgress(state: GameState, conversationId: Id): ConversationProgress {
  const saved = state.conversations[conversationId]
  if (saved) return saved
  const conversation = findConversation(conversationId)
  return conversation ? initialProgress(conversation) : { cursor: 0, readUpTo: 0, choices: {} }
}

function withProgress(state: GameState, conversationId: Id, progress: ConversationProgress): GameState {
  return { ...state, conversations: { ...state.conversations, [conversationId]: progress } }
}

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'newGame':
      return createInitialState()

    case 'advanceConversation': {
      const progress = getProgress(state, action.conversation)
      if (progress.cursor !== action.from) return state
      const cursor = progress.cursor + 1
      return withProgress(state, action.conversation, {
        ...progress,
        cursor,
        readUpTo: action.read ? cursor : progress.readUpTo,
      })
    }

    case 'chooseOption': {
      const conversation = findConversation(action.conversation)
      if (!conversation) return state
      const progress = getProgress(state, action.conversation)
      const item = buildTimeline(conversation, progress.choices)[progress.cursor]
      if (item?.kind !== 'choice' || !item.options[action.option]) return state
      // Skip past the choice and the player's own message, which is sent immediately.
      const cursor = progress.cursor + 2
      return withProgress(state, action.conversation, {
        cursor,
        readUpTo: cursor,
        choices: { ...progress.choices, [item.step]: action.option },
      })
    }

    case 'markConversationRead': {
      const progress = getProgress(state, action.conversation)
      if (progress.readUpTo === progress.cursor) return state
      return withProgress(state, action.conversation, { ...progress, readUpTo: progress.cursor })
    }

    // Unchanged state is returned as-is so repeated actions do not re-render.
    case 'solvePuzzle':
      if (state.solvedPuzzles.includes(action.puzzle)) return state
      return { ...state, solvedPuzzles: [...state.solvedPuzzles, action.puzzle] }

    case 'viewPhoto':
      if (state.viewedPhotos.includes(action.photo)) return state
      return { ...state, viewedPhotos: [...state.viewedPhotos, action.photo] }
  }
}
