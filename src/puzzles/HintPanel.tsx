import type { Hints } from '../story/types'
import styles from './Puzzle.module.css'

interface HintPanelProps {
  hints: Hints
  opened: number
  onOpenNext: () => void
}

/** Up to three hints, weakest first. Opening one costs nothing. */
export default function HintPanel({ hints, opened, onOpenNext }: Readonly<HintPanelProps>) {
  const shown = hints.slice(0, opened)
  return (
    <div className={styles.hints}>
      {/* Live region, so a newly opened hint is read out. */}
      <ol className={styles.hintList} aria-live="polite" aria-label="Tippek">
        {shown.map((hint, i) => (
          <li key={hint} className={styles.hint}>
            <span className={styles.hintLevel}>{i + 1}. tipp:</span> {hint}
          </li>
        ))}
      </ol>
      {opened < hints.length && (
        <button type="button" className={styles.hintButton} onClick={onOpenNext}>
          {opened === 0 ? 'Tipp kérése' : 'Következő tipp'} ({opened}/{hints.length})
        </button>
      )}
    </div>
  )
}
