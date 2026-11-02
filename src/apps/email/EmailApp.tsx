import { useEffect, useState, type Dispatch } from 'react'
import AppScreen from '../../app/AppScreen'
import type { Id } from '../../story/types'
import type { GameAction, GameState } from '../../state/gameState'
import { availableEmails } from '../../state/selectors'
import styles from './Email.module.css'

interface EmailAppProps {
  game: GameState
  dispatch: Dispatch<GameAction>
  onClose: () => void
}

export default function EmailApp({ game, dispatch, onClose }: Readonly<EmailAppProps>) {
  const emails = availableEmails(game)
  const [openEmail, setOpenEmail] = useState<Id | null>(null)
  const email = emails.find((e) => e.id === openEmail)

  useEffect(() => {
    if (openEmail) dispatch({ type: 'readEmail', email: openEmail })
  }, [dispatch, openEmail])

  if (email) {
    return (
      <AppScreen title="E-mail" onBack={() => setOpenEmail(null)} backLabel="Vissza a beérkezett levelekhez">
        <article className={styles.message}>
          <h2 className={styles.subject}>{email.subject}</h2>
          <p className={styles.meta}>
            <span className={styles.from}>{email.from}</span>
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
    <AppScreen title="Beérkezett levelek" onBack={onClose} backLabel="Vissza a kezdőképernyőre">
      {emails.length === 0 && <p className={styles.empty}>Nincsenek levelek.</p>}
      <ul className={styles.list}>
        {emails.map((e) => {
          const unread = !game.readEmails.includes(e.id)
          return (
            <li key={e.id}>
              <button
                type="button"
                className={styles.row}
                data-unread={unread}
                aria-label={`${unread ? 'Olvasatlan: ' : ''}${e.from}, ${e.subject}, ${e.date}`}
                onClick={() => setOpenEmail(e.id)}
              >
                <span className={styles.rowTop}>
                  <span className={styles.from}>{e.from}</span>
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
