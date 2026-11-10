import { useEffect, useId, useState, type Dispatch, type SubmitEvent } from 'react'
import DocumentBlocks from '../../app/DocumentBlocks'
import TextPuzzleForm from '../../puzzles/TextPuzzleForm'
import { findPuzzle } from '../../story/chapters'
import type { LoginPage, LoginUser } from '../../story/types'
import type { GameAction, GameState } from '../../state/gameState'
import { initials } from './SocialPageView'
import styles from './Pages.module.css'

const WRONG_PASSWORD = 'Hibás jelszó.'

/** Password field for a user whose password is not part of the story: it never lets anyone in. */
function DeadEndPasswordForm() {
  const inputId = useId()
  const [value, setValue] = useState('')
  const [wrong, setWrong] = useState(false)
  const submit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!value.trim()) return
    setWrong(false)
    requestAnimationFrame(() => setWrong(true))
  }
  return (
    <form className={styles.passwordForm} onSubmit={submit}>
      <label htmlFor={inputId} className={styles.label}>
        Jelszó
      </label>
      <div className={styles.searchRow}>
        <input
          id={inputId}
          className={styles.input}
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            setWrong(false)
          }}
          autoComplete="off"
          aria-invalid={wrong}
        />
        <button type="submit" className={styles.loginButton} disabled={!value.trim()}>
          Belépés
        </button>
      </div>
      <output className={styles.loginError}>{wrong ? WRONG_PASSWORD : ''}</output>
    </form>
  )
}

interface LoginPageViewProps {
  page: LoginPage
  game: GameState
  dispatch: Dispatch<GameAction>
}

/** A page behind a login: pick a user, then type the password (or ask for its hint). */
export default function LoginPageView({ page, game, dispatch }: Readonly<LoginPageViewProps>) {
  const puzzle = findPuzzle(page.puzzle)
  const loggedIn = game.solvedPuzzles.includes(page.puzzle)
  const [user, setUser] = useState<LoginUser | null>(null)
  const [hintShown, setHintShown] = useState(false)

  useEffect(() => dispatch({ type: 'visitPage', page: page.id }), [dispatch, page.id])

  const pickUser = (picked: LoginUser | null) => {
    setUser(picked)
    setHintShown(false)
  }

  let body
  if (loggedIn) {
    body = (
      <>
        <p className={styles.loggedIn}>Bejelentkezve: {page.user}</p>
        <DocumentBlocks blocks={page.blocks} />
      </>
    )
  } else if (!user) {
    body = (
      <div className={styles.loginBox}>
        {page.intro && <p className={styles.intro}>{page.intro}</p>}
        <p className={styles.label}>Válassz felhasználót</p>
        <ul className={styles.userList}>
          {page.users.map((u) => (
            <li key={u.name}>
              <button type="button" className={styles.userRow} onClick={() => pickUser(u)}>
                <span className={styles.userAvatar} aria-hidden="true">
                  {initials(u.name)}
                </span>
                {u.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    )
  } else {
    body = (
      <div className={styles.loginBox}>
        <button type="button" className={styles.backLink} onClick={() => pickUser(null)}>
          ‹ Másik felhasználó
        </button>
        <p className={styles.userPicked}>
          <span className={styles.userAvatar} aria-hidden="true">
            {initials(user.name)}
          </span>
          {user.name}
        </p>
        {user.name === page.user && puzzle?.kind === 'text' ? (
          <TextPuzzleForm
            puzzle={puzzle}
            submitLabel="Belépés"
            wrongText={WRONG_PASSWORD}
            onSolved={() => dispatch({ type: 'solvePuzzle', puzzle: puzzle.id })}
          />
        ) : (
          <DeadEndPasswordForm key={user.name} />
        )}
        {hintShown ? (
          <p className={styles.passwordHint} role="status">
            {user.passwordHint}
          </p>
        ) : (
          <button type="button" className={styles.forgot} onClick={() => setHintShown(true)}>
            Elfelejtett jelszó?
          </button>
        )}
      </div>
    )
  }

  return (
    <div className={styles.portal}>
      <h2 className={styles.portalTitle}>{page.title}</h2>
      {body}
    </div>
  )
}
