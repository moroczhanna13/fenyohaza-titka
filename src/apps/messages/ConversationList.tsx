import type { Id } from '../../story/types'
import { buildTimeline, unreadCount } from '../../state/conversation'
import { getProgress, type GameState } from '../../state/gameState'
import { availableThreads } from '../../state/selectors'
import styles from './Messages.module.css'

export default function ConversationList({ game, onOpen }: Readonly<{ game: GameState; onOpen: (thread: Id) => void }>) {
  const rows = [...availableThreads(game)].flatMap(([thread, parts]) => {
    const delivered = parts.flatMap((part) => {
      const progress = getProgress(game, part.id)
      return buildTimeline(part, progress.choices).slice(0, progress.cursor)
    })
    const last = delivered.findLast((item) => item.kind === 'message')
    // A chat shows up once its first message has arrived.
    if (last?.kind !== 'message') return []
    const unread = parts.reduce((sum, part) => sum + unreadCount(part, getProgress(game, part.id)), 0)
    return [{ thread, contact: parts[parts.length - 1].contact, last: last.message, unread }]
  })

  if (rows.length === 0) return <p className={styles.empty}>Nincsenek üzenetek.</p>

  return (
    <ul className={styles.list}>
      {rows.map(({ thread, contact, last, unread }) => (
        <li key={thread}>
          <button
            type="button"
            className={styles.row}
            data-unread={unread > 0}
            aria-label={`${contact}${unread > 0 ? `, ${unread} olvasatlan üzenet` : ''}`}
            onClick={() => onOpen(thread)}
          >
            <span className={styles.avatar} aria-hidden="true">
              {contact.charAt(0)}
            </span>
            <span className={styles.rowText}>
              <span className={styles.contact}>{contact}</span>
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
