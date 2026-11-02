import { useState } from 'react'
import type { ConnectPuzzle, Id } from '../story/types'
import { connectAnswer, isCorrectAnswer } from './answer'
import styles from './Deduction.module.css'

interface ConnectPuzzleFormProps {
  puzzle: ConnectPuzzle
  onSolved: () => void
}

/** Pick two statements that contradict each other, then connect them. */
export default function ConnectPuzzleForm({ puzzle, onSolved }: Readonly<ConnectPuzzleFormProps>) {
  const [selected, setSelected] = useState<Id[]>([])
  const [checking, setChecking] = useState(false)
  const [wrong, setWrong] = useState(false)

  const toggle = (id: Id) => {
    setWrong(false)
    setSelected((current) => {
      if (current.includes(id)) return current.filter((s) => s !== id)
      // A third pick replaces the older of the two.
      return [...current, id].slice(-2)
    })
  }

  const connect = async () => {
    if (selected.length !== 2 || checking) return
    setChecking(true)
    const correct = await isCorrectAnswer(connectAnswer(selected[0], selected[1]), puzzle.answerHash)
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
        {puzzle.statements.map((statement) => {
          const index = selected.indexOf(statement.id)
          return (
            <li key={statement.id}>
              <button
                type="button"
                className={styles.statement}
                aria-pressed={index >= 0}
                onClick={() => toggle(statement.id)}
              >
                <span className={styles.marker} aria-hidden="true">
                  {index >= 0 ? index + 1 : ''}
                </span>
                {statement.text}
              </button>
            </li>
          )
        })}
      </ul>
      <button
        type="button"
        className={styles.primary}
        disabled={selected.length !== 2 || checking}
        onClick={connect}
      >
        Összekötés ({selected.length}/2)
      </button>
      <output className={styles.feedback}>{wrong ? 'Ez a kettő nem mond ellent egymásnak.' : ''}</output>
    </div>
  )
}
