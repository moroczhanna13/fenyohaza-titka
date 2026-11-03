import { useEffect, useId, type Dispatch } from 'react'
import DocumentBlocks from '../../app/DocumentBlocks'
import TextPuzzleForm from '../../puzzles/TextPuzzleForm'
import { findPuzzle } from '../../story/chapters'
import type { LoginPage } from '../../story/types'
import type { GameAction, GameState } from '../../state/gameState'
import styles from './Pages.module.css'

interface LoginPageViewProps {
  page: LoginPage
  game: GameState
  dispatch: Dispatch<GameAction>
}

/** A page behind a password; the password is a text puzzle. */
export default function LoginPageView({ page, game, dispatch }: Readonly<LoginPageViewProps>) {
  const userId = useId()
  const puzzle = findPuzzle(page.puzzle)
  const loggedIn = game.solvedPuzzles.includes(page.puzzle)

  useEffect(() => dispatch({ type: 'visitPage', page: page.id }), [dispatch, page.id])

  return (
    <div className={styles.portal}>
      <h2 className={styles.portalTitle}>{page.title}</h2>
      {loggedIn ? (
        <>
          <p className={styles.loggedIn}>Bejelentkezve: {page.username}</p>
          <DocumentBlocks blocks={page.blocks} />
        </>
      ) : (
        <div className={styles.loginBox}>
          {page.intro && <p className={styles.intro}>{page.intro}</p>}
          <label htmlFor={userId} className={styles.label}>
            Felhasználónév
          </label>
          <input id={userId} className={styles.input} value={page.username} readOnly />
          {puzzle?.kind === 'text' && (
            <TextPuzzleForm
              puzzle={puzzle}
              submitLabel="Belépés"
              onSolved={() => dispatch({ type: 'solvePuzzle', puzzle: puzzle.id })}
            />
          )}
        </div>
      )}
    </div>
  )
}
