import type { Dispatch } from 'react'
import { findPuzzle } from '../story/chapters'
import type { Id } from '../story/types'
import type { GameAction, GameState } from '../state/gameState'
import HintPanel from './HintPanel'
import TextPuzzleForm from './TextPuzzleForm'
import styles from './Puzzle.module.css'

interface PuzzlePanelProps {
  puzzleId: Id
  game: GameState
  dispatch: Dispatch<GameAction>
  submitLabel?: string
  /** Connect and timeline puzzles are solved in the Deductions app; this opens it. */
  onOpenDeduction?: (puzzleId: Id) => void
}

/** A puzzle by id, with its title; renders nothing once solved. */
export default function PuzzlePanel({
  puzzleId,
  game,
  dispatch,
  submitLabel,
  onOpenDeduction,
}: Readonly<PuzzlePanelProps>) {
  const puzzle = findPuzzle(puzzleId)
  if (!puzzle || game.solvedPuzzles.includes(puzzle.id)) return null
  const hints = (
    <HintPanel
      hints={puzzle.hints}
      opened={game.openedHints[puzzle.id] ?? 0}
      onOpenNext={() => dispatch({ type: 'openHint', puzzle: puzzle.id })}
    />
  )

  // Solved somewhere else (e.g. on a web page): say where, and offer the hints here.
  if (puzzle.whereToSolve) {
    return (
      <section className={styles.panel} aria-label={puzzle.title}>
        <h2 className={styles.title}>{puzzle.title}</h2>
        <p className={styles.prompt}>{puzzle.whereToSolve}</p>
        {hints}
      </section>
    )
  }

  // Connect and timeline puzzles need more room; they live in the Deductions app.
  if (puzzle.kind !== 'text') {
    return (
      <section className={styles.panel} aria-label={puzzle.title}>
        <h2 className={styles.title}>{puzzle.title}</h2>
        <p className={styles.prompt}>Ezt a Következtetések appban tudod kibogozni.</p>
        {onOpenDeduction && (
          <button type="button" className={styles.submit} onClick={() => onOpenDeduction(puzzle.id)}>
            Megnyitás a Következtetésekben
          </button>
        )}
      </section>
    )
  }

  return (
    <section className={styles.panel} aria-label={puzzle.title}>
      <h2 className={styles.title}>{puzzle.title}</h2>
      <TextPuzzleForm
        puzzle={puzzle}
        submitLabel={submitLabel}
        onSolved={() => dispatch({ type: 'solvePuzzle', puzzle: puzzle.id })}
      />
      <HintPanel
        hints={puzzle.hints}
        opened={game.openedHints[puzzle.id] ?? 0}
        onOpenNext={() => dispatch({ type: 'openHint', puzzle: puzzle.id })}
      />
    </section>
  )
}
