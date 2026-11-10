import { useId, useState } from 'react'
import type { Id, MatchPuzzle } from '../story/types'
import { isCorrectAnswer, matchAnswer } from './answer'
import styles from './Deduction.module.css'

interface MatchPuzzleFormProps {
  puzzle: MatchPuzzle
  onSolved: () => void
}

/** Pair every left item with one of the right items, then check all pairs at once. */
export default function MatchPuzzleForm({ puzzle, onSolved }: Readonly<MatchPuzzleFormProps>) {
  const baseId = useId()
  const [pairs, setPairs] = useState<Record<Id, Id>>({})
  const [checking, setChecking] = useState(false)
  const [wrong, setWrong] = useState(false)
  const complete = puzzle.left.every((item) => pairs[item.id])

  const pick = (left: Id, right: Id) => {
    setWrong(false)
    setPairs((current) => ({ ...current, [left]: right }))
  }

  const check = async () => {
    if (!complete || checking) return
    setChecking(true)
    const answer = matchAnswer(puzzle.left.map((item) => [item.id, pairs[item.id]]))
    const correct = await isCorrectAnswer(answer, puzzle.answerHash)
    setChecking(false)
    if (correct) {
      onSolved()
    } else {
      // Off for one frame, then on: re-announces the message.
      setWrong(false)
      requestAnimationFrame(() => setWrong(true))
    }
  }

  return (
    <div className={styles.form}>
      <p className={styles.prompt}>{puzzle.prompt}</p>
      <ul className={styles.statements}>
        {puzzle.left.map((item) => {
          const selectId = `${baseId}-${item.id}`
          return (
            <li key={item.id} className={styles.matchRow}>
              <label htmlFor={selectId} className={styles.matchLabel}>
                {item.text}
              </label>
              <select
                id={selectId}
                className={styles.matchSelect}
                value={pairs[item.id] ?? ''}
                onChange={(e) => pick(item.id, e.target.value)}
              >
                <option value="" disabled>
                  Válassz…
                </option>
                {puzzle.right.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.text}
                  </option>
                ))}
              </select>
            </li>
          )
        })}
      </ul>
      <button type="button" className={styles.primary} disabled={!complete || checking} onClick={check}>
        Ellenőrzés
      </button>
      <output className={styles.feedback}>{wrong ? 'Valamelyik párosítás nem stimmel.' : ''}</output>
    </div>
  )
}
