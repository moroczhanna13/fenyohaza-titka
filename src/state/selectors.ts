import type { AppId } from '../apps/registry'
import { chaptersUpTo, findConversation } from '../story/chapters'
import type { Condition, Conversation } from '../story/types'
import { isFinished } from './conversation'
import { getProgress, type GameState } from './gameState'

export function isMet(state: GameState, condition: Condition | undefined): boolean {
  if (!condition) return true
  switch (condition.type) {
    case 'puzzleSolved':
      return state.solvedPuzzles.includes(condition.puzzle)
    case 'photoViewed':
      return state.viewedPhotos.includes(condition.photo)
    case 'conversationFinished': {
      const conversation = findConversation(condition.conversation)
      return !!conversation && isFinished(conversation, getProgress(state, conversation.id))
    }
    case 'all':
      return condition.conditions.every((c) => isMet(state, c))
  }
}

export function unlockedApps(state: GameState): AppId[] {
  return chaptersUpTo(state.chapter)
    .flatMap((chapter) => chapter.apps)
    .filter((unlock) => isMet(state, unlock.availableAfter))
    .map((unlock) => unlock.app)
}

export function availableConversations(state: GameState): Conversation[] {
  return chaptersUpTo(state.chapter)
    .flatMap((chapter) => chapter.conversations)
    .filter((conversation) => isMet(state, conversation.availableAfter))
}
