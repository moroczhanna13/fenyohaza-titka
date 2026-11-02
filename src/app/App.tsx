import { useCallback, useState } from 'react'
import PhoneFrame from './PhoneFrame'
import HomeScreen from './HomeScreen'
import AppPlaceholder from './AppPlaceholder'
import BoxView from './BoxView'
import IntroScreen from './IntroScreen'
import LockScreen from './LockScreen'
import NotificationBanner, { type PhoneNotification } from './NotificationBanner'
import { playMessageSound } from './sound'
import { APPS, type AppId } from '../apps/registry'
import GalleryApp from '../apps/gallery/GalleryApp'
import MessagesApp from '../apps/messages/MessagesApp'
import PuzzlePanel from '../puzzles/PuzzlePanel'
import type { Conversation, Id, MessageStep } from '../story/types'
import { unreadCount } from '../state/conversation'
import { getProgress } from '../state/gameState'
import { availableConversations, currentChapter, isPhoneLocked, unlockedApps } from '../state/selectors'
import { useConversationEngine } from '../state/useConversationEngine'
import { useGameState } from '../state/useGameState'

export default function App() {
  const [game, dispatch] = useGameState()
  const [openApp, setOpenApp] = useState<AppId | null>(null)
  const [openConversation, setOpenConversation] = useState<Id | null>(null)
  const [boxOpen, setBoxOpen] = useState(false)
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

  const chapter = currentChapter(game)
  const unreadMessages = availableConversations(game).reduce(
    (sum, c) => sum + unreadCount(c, getProgress(game, c.id)),
    0,
  )

  const goHome = () => {
    setOpenApp(null)
    setOpenConversation(null)
  }

  let screen
  if (chapter.intro && !game.introSeen.includes(chapter.id)) {
    screen = (
      <IntroScreen
        title={chapter.title}
        number={chapter.number}
        paragraphs={chapter.intro}
        onStart={() => dispatch({ type: 'dismissIntro', chapter: chapter.id })}
      />
    )
  } else if (boxOpen && chapter.box) {
    screen = <BoxView items={chapter.box} onBack={() => setBoxOpen(false)} />
  } else if (chapter.lock && isPhoneLocked(game)) {
    screen = (
      <LockScreen
        lock={chapter.lock}
        game={game}
        dispatch={dispatch}
        onOpenBox={chapter.box ? () => setBoxOpen(true) : undefined}
      />
    )
  } else if (openApp === 'messages') {
    screen = (
      <MessagesApp
        game={game}
        dispatch={dispatch}
        openConversation={openConversation}
        onOpenConversation={setOpenConversation}
        onClose={goHome}
        renderWait={(until) =>
          until.type === 'puzzleSolved' && (
            <PuzzlePanel puzzleId={until.puzzle} game={game} dispatch={dispatch} submitLabel="Küldés" />
          )
        }
      />
    )
  } else if (openApp === 'gallery') {
    screen = <GalleryApp game={game} dispatch={dispatch} onClose={goHome} />
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
          setBoxOpen(false)
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
