import { useCallback, useState } from 'react'
import PhoneFrame from './PhoneFrame'
import HomeScreen from './HomeScreen'
import AppPlaceholder from './AppPlaceholder'
import NotificationBanner, { type PhoneNotification } from './NotificationBanner'
import { playMessageSound } from './sound'
import { APPS, type AppId } from '../apps/registry'
import MessagesApp from '../apps/messages/MessagesApp'
import type { Conversation, Id, MessageStep } from '../story/types'
import { unreadCount } from '../state/conversation'
import { getProgress } from '../state/gameState'
import { availableConversations, unlockedApps } from '../state/selectors'
import { useConversationEngine } from '../state/useConversationEngine'
import { useGameState } from '../state/useGameState'

export default function App() {
  const [game, dispatch] = useGameState()
  const [openApp, setOpenApp] = useState<AppId | null>(null)
  const [openConversation, setOpenConversation] = useState<Id | null>(null)
  const [notification, setNotification] = useState<PhoneNotification | null>(null)

  const showConversation = useCallback((id: Id) => {
    setOpenApp('messages')
    setOpenConversation(id)
  }, [])

  const onIncoming = useCallback(
    (conversation: Conversation, message: MessageStep) => {
      playMessageSound()
      setNotification({
        key: Date.now(),
        title: conversation.contact,
        text: message.text,
        onOpen: () => showConversation(conversation.id),
      })
    },
    [showConversation],
  )
  const dismissNotification = useCallback(() => setNotification(null), [])

  useConversationEngine(game, dispatch, openApp === 'messages' ? openConversation : null, onIncoming)

  const unreadMessages = availableConversations(game).reduce(
    (sum, c) => sum + unreadCount(c, getProgress(game, c.id)),
    0,
  )

  const goHome = () => {
    setOpenApp(null)
    setOpenConversation(null)
  }

  let screen
  if (openApp === 'messages') {
    screen = (
      <MessagesApp
        game={game}
        dispatch={dispatch}
        openConversation={openConversation}
        onOpenConversation={setOpenConversation}
        onClose={goHome}
      />
    )
  } else if (openApp) {
    const app = APPS.find((a) => a.id === openApp)
    screen = <AppPlaceholder title={app?.label ?? ''} onBack={goHome} />
  } else {
    screen = (
      <HomeScreen
        unlockedApps={unlockedApps(game)}
        badges={{ messages: unreadMessages }}
        onOpenApp={setOpenApp}
        onNewGame={() => {
          setNotification(null)
          dispatch({ type: 'newGame' })
        }}
      />
    )
  }

  return (
    <PhoneFrame overlay={<NotificationBanner notification={notification} onDismiss={dismissNotification} />}>
      {screen}
    </PhoneFrame>
  )
}
