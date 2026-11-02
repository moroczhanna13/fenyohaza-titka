import type { Id } from '../../story/types'
import { buildTimeline, unreadCount } from '../../state/conversation'
import { getProgress, type GameState } from '../../state/gameState'
import { availableConversations } from '../../state/selectors'
import styles from './Messages.module.css'

export default function ConversationList({ game, onOpen }: Readonly<{ game: GameState; onOpen: (id: Id) => void }>) {
  const rows = availableConversations(game).flatMap((conversation) => {
    const progress = getProgress(game, conversation.id)
    const delivered = buildTimeline(conversation, progress.choices).slice(0, progress.cursor)
    const last = delivered.findLast((item) => item.kind === 'message')
    // A conversation shows up once its first message has arrived.
    if (last?.kind !== 'message') return []
    return [{ conversation, last: last.message, unread: unreadCount(conversation, progress) }]
  })

  if (rows.length === 0) return <p className={styles.empty}>Nincsenek üzenetek.</p>

  return (
    <ul className={styles.list}>
      {rows.map(({ conversation, last, unread }) => (
        <li key={conversation.id}>
          <button
            type="button"
            className={styles.row}
            data-unread={unread > 0}
            aria-label={`${conversation.contact}${unread > 0 ? `, ${unread} olvasatlan üzenet` : ''}`}
            onClick={() => onOpen(conversation.id)}
          >
            <span className={styles.avatar} aria-hidden="true">
              {conversation.contact.charAt(0)}
            </span>
            <span className={styles.rowText}>
              <span className={styles.contact}>{conversation.contact}</span>
              <span className={styles.preview}>
                {last.from === 'player' ? 'Én: ' : ''}
                {last.text}
              </span>
            </span>
            {unread > 0 && (
              <span className={styles.badge} aria-hidden="true">
                {unread}
              </span>
            )}
          </button>
        </li>
      ))}
    </ul>
  )
}
