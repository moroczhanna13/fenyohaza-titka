import type { Dispatch } from 'react'
import PuzzlePanel from '../puzzles/PuzzlePanel'
import type { PhoneLock } from '../story/types'
import type { GameAction, GameState } from '../state/gameState'
import styles from './LockScreen.module.css'

interface LockScreenProps {
  lock: PhoneLock
  game: GameState
  dispatch: Dispatch<GameAction>
  /** Present when the chapter has items outside the phone. */
  onOpenBox?: () => void
}

export default function LockScreen({ lock, game, dispatch, onOpenBox }: Readonly<LockScreenProps>) {
  return (
    <section className={styles.lock} aria-labelledby="lock-title">
      <div className={styles.top}>
        <svg className={styles.padlock} width="40" height="40" viewBox="0 0 24 24" aria-hidden="true">
          <rect x="5" y="10" width="14" height="10" rx="2" fill="currentColor" />
          <path d="M8 10V7a4 4 0 0 1 8 0v3" fill="none" stroke="currentColor" strokeWidth="2" />
        </svg>
        <h1 id="lock-title" className={styles.title}>
          {lock.title}
        </h1>
      </div>
      <div className={styles.card}>
        <PuzzlePanel puzzleId={lock.puzzle} game={game} dispatch={dispatch} submitLabel="Feloldás" />
      </div>
      {onOpenBox && (
        <button type="button" className={styles.box} onClick={onOpenBox}>
          <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M3 8l9-4 9 4v10l-9 4-9-4z" />
            <path d="M3 8l9 4 9-4M12 12v10" />
          </svg>
          A doboz tartalma
        </button>
      )}
    </section>
  )
}
