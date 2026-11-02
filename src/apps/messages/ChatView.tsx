import { useEffect, useRef, type Dispatch, type ReactNode } from 'react'
import AppScreen from '../../app/AppScreen'
import { findPhoto } from '../../story/chapters'
import type { Condition, Conversation } from '../../story/types'
import { photoUrl } from '../gallery/format'
import { buildTimeline } from '../../state/conversation'
import { getProgress, type GameAction, type GameState } from '../../state/gameState'
import styles from './Messages.module.css'

interface ChatViewProps {
  game: GameState
  dispatch: Dispatch<GameAction>
  conversation: Conversation
  onBack: () => void
  renderWait?: (until: Condition) => ReactNode
}

export default function ChatView({ game, dispatch, conversation, onBack, renderWait }: Readonly<ChatViewProps>) {
  const progress = getProgress(game, conversation.id)
  const timeline = buildTimeline(conversation, progress.choices)
  const delivered = timeline.slice(0, progress.cursor)
  const next = timeline[progress.cursor]
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    dispatch({ type: 'markConversationRead', conversation: conversation.id })
    endRef.current?.scrollIntoView({ block: 'end' })
  }, [dispatch, conversation.id, progress.cursor])

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
            onClick={() => dispatch({ type: 'chooseOption', conversation: conversation.id, option: index })}
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
    <AppScreen title={conversation.contact} onBack={onBack} backLabel="Vissza az üzenetekhez" footer={footer}>
      <ol className={styles.messages} role="log" aria-label={`Beszélgetés: ${conversation.contact}`}>
        {delivered.map((item, index) => {
          if (item.kind !== 'message') return null
          const { message } = item
          const mine = message.from === 'player'
          const photo = message.photo ? findPhoto(message.photo) : undefined
          return (
            // Delivered items never reorder, so the index is a stable key.
            <li key={index} className={styles.item}>
              {message.time && <p className={styles.time}>{message.time}</p>}
              <p className={mine ? styles.mine : styles.theirs}>
                <span className={styles.srOnly}>{mine ? 'Én: ' : `${conversation.contact}: `}</span>
                {message.text}
              </p>
              {photo && (
                <img
                  className={mine ? `${styles.attachment} ${styles.attachmentMine}` : styles.attachment}
                  src={photoUrl(photo.src)}
                  alt={photo.alt}
                />
              )}
            </li>
          )
        })}
      </ol>
      {typing && (
        <p className={styles.typing}>
          <span className={styles.srOnly}>{conversation.contact} ír…</span>
          <span className={styles.dot} aria-hidden="true" />
          <span className={styles.dot} aria-hidden="true" />
          <span className={styles.dot} aria-hidden="true" />
        </p>
      )}
      <div ref={endRef} />
    </AppScreen>
  )
}
