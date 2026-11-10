import { useEffect, useState, type Dispatch } from 'react'
import AppScreen from '../../app/AppScreen'
import type { EmailFolder, Id } from '../../story/types'
import type { GameAction, GameState } from '../../state/gameState'
import { availableEmails } from '../../state/selectors'
import styles from './Email.module.css'

const FOLDERS: { id: EmailFolder; label: string; title: string }[] = [
  { id: 'inbox', label: 'Beérkezett', title: 'Beérkezett levelek' },
  { id: 'sent', label: 'Elküldött', title: 'Elküldött levelek' },
  { id: 'spam', label: 'Spam', title: 'Spam' },
]

interface EmailAppProps {
  game: GameState
  dispatch: Dispatch<GameAction>
  onClose: () => void
}

export default function EmailApp({ game, dispatch, onClose }: Readonly<EmailAppProps>) {
  const all = availableEmails(game)
  const [folder, setFolder] = useState<EmailFolder>('inbox')
  const emails = all.filter((e) => (e.folder ?? 'inbox') === folder)
  const [openEmail, setOpenEmail] = useState<Id | null>(null)
  const email = all.find((e) => e.id === openEmail)
  const current = FOLDERS.find((f) => f.id === folder)!

  useEffect(() => {
    if (openEmail) dispatch({ type: 'readEmail', email: openEmail })
  }, [dispatch, openEmail])

  if (email) {
    const sent = email.folder === 'sent'
    return (
      <AppScreen title="E-mail" onBack={() => setOpenEmail(null)} backLabel={`Vissza: ${current.title}`}>
        <article className={styles.message}>
          <h2 className={styles.subject}>{email.subject}</h2>
          <p className={styles.meta}>
            <span className={styles.from}>
              {sent ? 'Címzett: ' : ''}
              {email.from}
            </span>
            <span>{email.date}</span>
          </p>
          {email.body.map((paragraph) => (
            <p key={paragraph} className={styles.paragraph}>
              {paragraph}
            </p>
          ))}
        </article>
      </AppScreen>
    )
  }

  return (
    <AppScreen title={current.title} onBack={onClose} backLabel="Vissza a kezdőképernyőre">
      <div className={styles.folders} role="group" aria-label="Mappák">
        {FOLDERS.map((f) => (
          <button
            key={f.id}
            type="button"
            className={styles.folder}
            aria-pressed={f.id === folder}
            onClick={() => setFolder(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>
      {emails.length === 0 && <p className={styles.empty}>Nincsenek levelek.</p>}
      <ul className={styles.list}>
        {emails.map((e) => {
          const unread = folder === 'inbox' && !game.readEmails.includes(e.id)
          const sent = folder === 'sent'
          return (
            <li key={e.id}>
              <button
                type="button"
                className={styles.row}
                data-unread={unread}
                aria-label={`${unread ? 'Olvasatlan: ' : ''}${sent ? 'Címzett: ' : ''}${e.from}, ${e.subject}, ${e.date}`}
                onClick={() => setOpenEmail(e.id)}
              >
                <span className={styles.rowTop}>
                  <span className={styles.from}>
                    {sent ? 'Címzett: ' : ''}
                    {e.from}
                  </span>
                  <span className={styles.date}>{e.date}</span>
                </span>
                <span className={styles.rowSubject}>{e.subject}</span>
                <span className={styles.preview}>{e.body.join(' ')}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </AppScreen>
  )
}
