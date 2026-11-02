import type { Dispatch, ReactNode } from 'react'
import AppScreen from '../../app/AppScreen'
import { findConversation } from '../../story/chapters'
import type { Condition, Id } from '../../story/types'
import type { GameAction, GameState } from '../../state/gameState'
import ChatView from './ChatView'
import ConversationList from './ConversationList'

interface MessagesAppProps {
  game: GameState
  dispatch: Dispatch<GameAction>
  openConversation: Id | null
  onOpenConversation: (id: Id | null) => void
  onClose: () => void
  /** Renders what the player can do while a conversation waits on a condition (e.g. a puzzle). */
  renderWait?: (until: Condition) => ReactNode
}

export default function MessagesApp({
  game,
  dispatch,
  openConversation,
  onOpenConversation,
  onClose,
  renderWait,
}: Readonly<MessagesAppProps>) {
  const conversation = openConversation ? findConversation(openConversation) : undefined

  if (conversation) {
    return (
      <ChatView
        game={game}
        dispatch={dispatch}
        conversation={conversation}
        onBack={() => onOpenConversation(null)}
        renderWait={renderWait}
      />
    )
  }

  return (
    <AppScreen title="Üzenetek" onBack={onClose} backLabel="Vissza a kezdőképernyőre">
      <ConversationList game={game} onOpen={onOpenConversation} />
    </AppScreen>
  )
}
