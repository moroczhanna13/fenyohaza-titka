import { useEffect, type Dispatch } from 'react'
import type { Conversation, Id, MessageStep } from '../story/types'
import { buildTimeline, typingDelay } from './conversation'
import { getProgress, type GameAction, type GameState } from './gameState'
import { availableConversations, isMet, threadOf } from './selectors'

/**
 * Plays conversations forward: delivers messages after a typing delay and
 * passes wait steps once their condition is met. Stops at choices.
 *
 * While a conversation is open it plays continuously. In the background only
 * the first message of a burst arrives (as a notification); the rest waits
 * until the player opens the chat.
 */
export function useConversationEngine(
  state: GameState,
  dispatch: Dispatch<GameAction>,
  /** Thread id of the open chat, if any. */
  openConversation: Id | null,
  onIncoming: (conversation: Conversation, message: MessageStep) => void,
) {
  useEffect(() => {
    const timers: number[] = []
    for (const conversation of availableConversations(state)) {
      const progress = getProgress(state, conversation.id)
      const item = buildTimeline(conversation, progress.choices)[progress.cursor]
      if (!item || item.kind === 'choice') continue

      const isOpen = openConversation === threadOf(conversation)
      const advance = () =>
        dispatch({ type: 'advanceConversation', conversation: conversation.id, from: progress.cursor, read: isOpen })

      if (item.kind === 'wait') {
        if (isMet(state, item.until)) advance()
        continue
      }
      if (!isOpen && progress.readUpTo < progress.cursor) continue

      const { message } = item
      timers.push(
        window.setTimeout(() => {
          advance()
          if (!isOpen && message.from === 'contact') onIncoming(conversation, message)
        }, typingDelay(message)),
      )
    }
    return () => timers.forEach((t) => window.clearTimeout(t))
  }, [state, dispatch, openConversation, onIncoming])
}
