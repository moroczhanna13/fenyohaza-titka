import { useEffect, useRef, type Dispatch, type ReactNode } from 'react'
import AppScreen from '../../app/AppScreen'
import { findPhoto, findVoiceMessage } from '../../story/chapters'
import type { Condition, Conversation } from '../../story/types'
import { photoUrl } from '../gallery/format'
import { buildTimeline } from '../../state/conversation'
import { getProgress, type GameAction, type GameState } from '../../state/gameState'
import styles from './Messages.module.css'
import VoicePlayer from './VoicePlayer'

interface ChatViewProps {
  game: GameState
  dispatch: Dispatch<GameAction>
  /** The conversations of one chat thread, in story order. */
  parts: Conversation[]
  onBack: () => void
  renderWait?: (until: Condition) => ReactNode
}

export default function ChatView({ game, dispatch, parts, onBack, renderWait }: Readonly<ChatViewProps>) {
  // A later part may reveal who the contact is, so the newest name wins.
  const contact = parts[parts.length - 1].contact
  const states = parts.map((part) => {
    const progress = getProgress(game, part.id)
    const timeline = buildTimeline(part, progress.choices)
    return { part, delivered: timeline.slice(0, progress.cursor), next: timeline[progress.cursor] }
  })
  const delivered = states.flatMap(({ part, delivered }) => delivered.map((item, index) => ({ key: `${part.id}-${index}`, item })))
  // The thread continues where its first unfinished part is.
  const current = states.find((s) => s.next)
  const next = current?.next
  const progressKey = states.map((s) => s.delivered.length).join()
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    for (const { part } of states) dispatch({ type: 'markConversationRead', conversation: part.id })
    endRef.current?.scrollIntoView({ block: 'end' })
    // progressKey changes whenever a message is delivered in any part.
  }, [dispatch, progressKey])

  const typing = next?.kind === 'message' && next.message.from === 'contact'

  let footer: ReactNode = null
  if (next?.kind === 'choice') {
    footer = (
      <fieldset className={styles.choices}>
        <legend className={styles.srOnly}>Válaszlehetőségek</legend>
        {next.options.map((option, index) => (
          <button
            key={option.text}
            type="button"
            className={styles.choice}
            onClick={() => dispatch({ type: 'chooseOption', conversation: current!.part.id, option: index })}
          >
            {option.text}
          </button>
        ))}
      </fieldset>
    )
  } else if (next?.kind === 'wait') {
    footer = renderWait?.(next.until) ?? null
  }

  return (
    <AppScreen title={contact} onBack={onBack} backLabel="Vissza az üzenetekhez" footer={footer}>
      <ol className={styles.messages} role="log" aria-label={`Beszélgetés: ${contact}`}>
        {delivered.map(({ key, item }) => {
          if (item.kind !== 'message') return null
          const { message } = item
          const mine = message.from === 'player'
          const photo = message.photo ? findPhoto(message.photo) : undefined
          const voice = message.audio ? findVoiceMessage(message.audio) : undefined
          return (
            // Delivered items never reorder, so part id + index is a stable key.
            <li key={key} className={styles.item}>
              {message.time && <p className={styles.time}>{message.time}</p>}
              <p className={mine ? styles.mine : styles.theirs}>
                <span className={styles.srOnly}>{mine ? 'Én: ' : `${contact}: `}</span>
                {message.text}
              </p>
              {photo && (
                <img
                  className={mine ? `${styles.attachment} ${styles.attachmentMine}` : styles.attachment}
                  src={photoUrl(photo.src)}
                  alt={photo.alt}
                />
              )}
              {voice && <VoicePlayer voice={voice} />}
            </li>
          )
        })}
      </ol>
      {typing && (
        <p className={styles.typing}>
          <span className={styles.srOnly}>{contact} ír…</span>
          <span className={styles.dot} aria-hidden="true" />
          <span className={styles.dot} aria-hidden="true" />
          <span className={styles.dot} aria-hidden="true" />
        </p>
      )}
      <div ref={endRef} />
    </AppScreen>
  )
}
