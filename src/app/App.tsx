import { useCallback, useEffect, useRef, useState } from 'react'
import PhoneFrame from './PhoneFrame'
import HomeScreen from './HomeScreen'
import AppPlaceholder from './AppPlaceholder'
import BoxView from './BoxView'
import ChapterEnd from './ChapterEnd'
import EndingScreen from './EndingScreen'
import IntroScreen from './IntroScreen'
import LockScreen from './LockScreen'
import NotificationBanner, { type PhoneNotification } from './NotificationBanner'
import SoundToggle from './SoundToggle'
import { isMuted, playMessageSound, playSuccessSound, setMuted, startAmbience } from './sound'
import { APPS, type AppId } from '../apps/registry'
import BrowserApp from '../apps/browser/BrowserApp'
import DeductionsApp from '../apps/deductions/DeductionsApp'
import EmailApp from '../apps/email/EmailApp'
import GalleryApp from '../apps/gallery/GalleryApp'
import MessagesApp from '../apps/messages/MessagesApp'
import NotebookApp from '../apps/notebook/NotebookApp'
import PuzzlePanel from '../puzzles/PuzzlePanel'
import { findPuzzle, GAME_TITLE } from '../story/chapters'
import type { Conversation, Id, MessageStep } from '../story/types'
import { unreadCount } from '../state/conversation'
import { getProgress } from '../state/gameState'
import {
  availableConversations,
  availableEmails,
  currentChapter,
  foundEvidence,
  isChapterComplete,
  isPhoneLocked,
  nextChapter,
  threadOf,
  unlockedApps,
} from '../state/selectors'
import { useConversationEngine } from '../state/useConversationEngine'
import { useGameState } from '../state/useGameState'

const END_DELAY_MS = 4000

export default function App() {
  const [game, dispatch] = useGameState()
  const [openApp, setOpenApp] = useState<AppId | null>(null)
  const [openConversation, setOpenConversation] = useState<Id | null>(null)
  const [boxOpen, setBoxOpen] = useState(false)
  // Puzzle to show when the Deductions app is opened from a chat.
  const [deductionToOpen, setDeductionToOpen] = useState<Id | null>(null)
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
        onOpen: () => showConversation(threadOf(conversation)),
      })
    },
    [showConversation],
  )
  const dismissNotification = useCallback(() => setNotification(null), [])
  // A banner from the previous screen would cover the header of the new one.
  useEffect(dismissNotification, [openApp, openConversation, dismissNotification])

  useConversationEngine(game, dispatch, openApp === 'messages' ? openConversation : null, onIncoming)

  // Announce evidence found during play (not what was already found when the game loaded).
  const evidence = foundEvidence(game)
  const evidenceKey = evidence.map((e) => e.id).join()
  const knownEvidence = useRef<string | null>(null)
  useEffect(() => {
    const known = knownEvidence.current
    knownEvidence.current = evidenceKey
    if (known === null) return
    const fresh = evidence.filter((e) => !known.split(',').includes(e.id))
    const latest = fresh.at(-1)
    if (!latest) return
    setNotification({
      key: Date.now(),
      title: 'Jegyzetfüzet',
      text: `Új bizonyíték: ${latest.title}`,
      onOpen: () => {
        setOpenConversation(null)
        setOpenApp('notebook')
      },
    })
    // Only the set of found ids matters; `evidence` is rebuilt every render.
  }, [evidenceKey])

  // Success sound, with a screen-reader announcement as its text equivalent.
  const [announcement, setAnnouncement] = useState('')
  const solvedCount = game.solvedPuzzles.length
  const knownSolved = useRef(solvedCount)
  useEffect(() => {
    if (solvedCount > knownSolved.current) {
      playSuccessSound()
      const puzzle = findPuzzle(game.solvedPuzzles[solvedCount - 1])
      setAnnouncement(`Helyes válasz: ${puzzle?.title ?? ''}`)
    }
    knownSolved.current = solvedCount
    // Only a change in the number of solved puzzles matters.
  }, [solvedCount])

  // Background radio static starts with the first interaction (browsers block autoplay).
  useEffect(() => {
    const start = () => startAmbience()
    document.addEventListener('pointerdown', start, { once: true })
    document.addEventListener('keydown', start, { once: true })
    return () => {
      document.removeEventListener('pointerdown', start)
      document.removeEventListener('keydown', start)
    }
  }, [])
  const [muted, setMutedState] = useState(isMuted)
  const toggleMuted = () => {
    setMuted(!muted)
    setMutedState(!muted)
  }

  const chapter = currentChapter(game)

  // The closing screen waits a moment, so the last message can still be read.
  const complete = isChapterComplete(game)
  const [endShown, setEndShown] = useState(complete)
  useEffect(() => {
    if (!complete) {
      setEndShown(false)
      return
    }
    const timer = window.setTimeout(() => setEndShown(true), END_DELAY_MS)
    return () => window.clearTimeout(timer)
  }, [complete])
  const unseenEvidence = evidence.filter((e) => !game.seenEvidence.includes(e.id)).length
  const unreadEmails = availableEmails(game).filter((e) => !game.readEmails.includes(e.id)).length
  const unreadMessages = availableConversations(game).reduce(
    (sum, c) => sum + unreadCount(c, getProgress(game, c.id)),
    0,
  )

  const goHome = () => {
    setOpenApp(null)
    setOpenConversation(null)
    setDeductionToOpen(null)
  }

  let screen
  const next = nextChapter(game)
  if (complete && endShown && !next) {
    const solution = chapter.puzzles.find((p) => p.kind === 'accusation')?.conclusion
    screen = (
      <EndingScreen
        gameTitle={GAME_TITLE}
        chapter={chapter}
        solution={solution}
        onNewGame={() => {
          goHome()
          setNotification(null)
          setBoxOpen(false)
          dispatch({ type: 'newGame' })
        }}
      />
    )
  } else if (complete && endShown) {
    screen = (
      <ChapterEnd
        chapter={chapter}
        next={next}
        onContinue={() => {
          goHome()
          dispatch({ type: 'advanceChapter' })
        }}
      />
    )
  } else if (chapter.intro && !game.introSeen.includes(chapter.id)) {
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
            <PuzzlePanel
              puzzleId={until.puzzle}
              game={game}
              dispatch={dispatch}
              submitLabel="Küldés"
              onOpenDeduction={(id) => {
                setDeductionToOpen(id)
                setOpenConversation(null)
                setOpenApp('deductions')
              }}
            />
          )
        }
      />
    )
  } else if (openApp === 'gallery') {
    screen = <GalleryApp game={game} dispatch={dispatch} onClose={goHome} />
  } else if (openApp === 'deductions') {
    screen = <DeductionsApp game={game} dispatch={dispatch} onClose={goHome} initialPuzzle={deductionToOpen} />
  } else if (openApp === 'browser') {
    screen = <BrowserApp game={game} dispatch={dispatch} onClose={goHome} />
  } else if (openApp === 'email') {
    screen = <EmailApp game={game} dispatch={dispatch} onClose={goHome} />
  } else if (openApp === 'notebook') {
    screen = <NotebookApp game={game} dispatch={dispatch} onClose={goHome} />
  } else if (openApp) {
    const app = APPS.find((a) => a.id === openApp)
    screen = <AppPlaceholder title={app?.label ?? ''} onBack={goHome} />
  } else {
    screen = (
      <HomeScreen
        unlockedApps={unlockedApps(game)}
        badges={{ messages: unreadMessages, notebook: unseenEvidence, email: unreadEmails }}
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
    <PhoneFrame
      statusExtra={<SoundToggle muted={muted} onToggle={toggleMuted} />}
      overlay={
        <>
          <NotificationBanner notification={notification} onDismiss={dismissNotification} />
          <p className="visually-hidden" role="status">
            {announcement}
          </p>
        </>
      }
    >
      {screen}
    </PhoneFrame>
  )
}
