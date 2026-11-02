import type { Dispatch } from 'react'
import { findPuzzle } from '../story/chapters'
import type { Id } from '../story/types'
import type { GameAction, GameState } from '../state/gameState'
import TextPuzzleForm from './TextPuzzleForm'
import styles from './Puzzle.module.css'

interface PuzzlePanelProps {
  puzzleId: Id
  game: GameState
  dispatch: Dispatch<GameAction>
  submitLabel?: string
}

/** A puzzle by id, with its title; renders nothing once solved. */
export default function PuzzlePanel({ puzzleId, game, dispatch, submitLabel }: Readonly<PuzzlePanelProps>) {
  const puzzle = findPuzzle(puzzleId)
  if (!puzzle || game.solvedPuzzles.includes(puzzle.id)) return null

  return (
    <section className={styles.panel} aria-label={puzzle.title}>
      <h2 className={styles.title}>{puzzle.title}</h2>
      <TextPuzzleForm
        puzzle={puzzle}
        submitLabel={submitLabel}
        onSolved={() => dispatch({ type: 'solvePuzzle', puzzle: puzzle.id })}
      />
    </section>
  )
}
