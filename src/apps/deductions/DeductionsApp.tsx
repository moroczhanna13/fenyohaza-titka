import { useState, type Dispatch } from 'react'
import AppScreen from '../../app/AppScreen'
import AccusationForm from '../../puzzles/AccusationForm'
import ConnectPuzzleForm from '../../puzzles/ConnectPuzzleForm'
import HintPanel from '../../puzzles/HintPanel'
import LedgerPuzzleForm from '../../puzzles/LedgerPuzzleForm'
import MatchPuzzleForm from '../../puzzles/MatchPuzzleForm'
import RoutePuzzleForm from '../../puzzles/RoutePuzzleForm'
import TimelinePuzzleForm from '../../puzzles/TimelinePuzzleForm'
import type { Id } from '../../story/types'
import type { GameAction, GameState } from '../../state/gameState'
import { availableDeductions } from '../../state/selectors'
import styles from './Deductions.module.css'

interface DeductionsAppProps {
  game: GameState
  dispatch: Dispatch<GameAction>
  onClose: () => void
  /** Opens a puzzle right away, e.g. when coming from a chat that waits on it. */
  initialPuzzle?: Id | null
}

export default function DeductionsApp({ game, dispatch, onClose, initialPuzzle = null }: Readonly<DeductionsAppProps>) {
  const deductions = availableDeductions(game)
  const [openId, setOpenId] = useState<Id | null>(initialPuzzle)
  const puzzle = deductions.find((d) => d.id === openId)

  if (puzzle) {
    const solved = game.solvedPuzzles.includes(puzzle.id)
    const onSolved = () => dispatch({ type: 'solvePuzzle', puzzle: puzzle.id })
    return (
      <AppScreen title={puzzle.title} onBack={() => setOpenId(null)} backLabel="Vissza a következtetésekhez">
        <div className={styles.detail}>
          {solved ? (
            <div className={styles.solved}>
              <p className={styles.solvedLabel}>Megoldva</p>
              {puzzle.conclusion && <p className={styles.conclusion}>{puzzle.conclusion}</p>}
            </div>
          ) : (
            <>
              {puzzle.kind === 'connect' && <ConnectPuzzleForm puzzle={puzzle} onSolved={onSolved} />}
              {puzzle.kind === 'timeline' && <TimelinePuzzleForm puzzle={puzzle} onSolved={onSolved} />}
              {puzzle.kind === 'match' && <MatchPuzzleForm puzzle={puzzle} onSolved={onSolved} />}
              {puzzle.kind === 'ledger' && <LedgerPuzzleForm puzzle={puzzle} onSolved={onSolved} />}
              {puzzle.kind === 'route' && <RoutePuzzleForm puzzle={puzzle} onSolved={onSolved} />}
              {puzzle.kind === 'accusation' && <AccusationForm puzzle={puzzle} game={game} onSolved={onSolved} />}
              <HintPanel
                hints={puzzle.hints}
                opened={game.openedHints[puzzle.id] ?? 0}
                onOpenNext={() => dispatch({ type: 'openHint', puzzle: puzzle.id })}
              />
            </>
          )}
        </div>
      </AppScreen>
    )
  }

  return (
    <AppScreen title="Következtetések" onBack={onClose} backLabel="Vissza a kezdőképernyőre">
      {deductions.length === 0 ? (
        <p className={styles.empty}>Még nincs mit összekötni. Gyűjts nyomokat.</p>
      ) : (
        <ul className={styles.list}>
          {deductions.map((d) => {
            const solved = game.solvedPuzzles.includes(d.id)
            return (
              <li key={d.id}>
                <button type="button" className={styles.row} data-solved={solved} onClick={() => setOpenId(d.id)}>
                  <span className={styles.rowTitle}>{d.title}</span>
                  <span className={styles.rowStatus}>{solved ? 'Megoldva' : 'Nyitott kérdés'}</span>
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </AppScreen>
  )
}
