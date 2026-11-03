import { useState } from 'react'
import { findChapter } from '../story/chapters'
import type { AccusationPuzzle, Id } from '../story/types'
import type { GameState } from '../state/gameState'
import { foundEvidence } from '../state/selectors'
import { accusationAllAnswers, accusationAnswer, isCorrectAnswer } from './answer'
import styles from './Deduction.module.css'

interface AccusationFormProps {
  puzzle: AccusationPuzzle
  game: GameState
  onSolved: () => void
}

/**
 * The final accusation. A wrong answer sends the player back to the chapter it
 * belongs to: its evidence is shown, then the accusation can be tried again.
 */
export default function AccusationForm({ puzzle, game, onSolved }: Readonly<AccusationFormProps>) {
  const [answers, setAnswers] = useState<Record<Id, number>>({})
  const [failedChapter, setFailedChapter] = useState<Id | null>(null)
  const [checking, setChecking] = useState(false)
  const complete = puzzle.questions.every((q) => answers[q.id] !== undefined)

  const submit = async () => {
    if (!complete || checking) return
    setChecking(true)
    for (const q of puzzle.questions) {
      if (!(await isCorrectAnswer(accusationAnswer(q.id, answers[q.id]), q.answerHash))) {
        setChecking(false)
        setFailedChapter(q.chapter)
        return
      }
    }
    const all = accusationAllAnswers(puzzle.questions.map((q) => [q.id, answers[q.id]]))
    const correct = await isCorrectAnswer(all, puzzle.answerHash)
    setChecking(false)
    if (correct) onSolved()
  }

  if (failedChapter) {
    const chapter = findChapter(failedChapter)
    const evidence = foundEvidence(game).filter((e) => chapter?.evidence.some((ce) => ce.id === e.id))
    return (
      <div className={styles.form} role="alert">
        <p className={styles.failTitle}>Ez a pont nem áll meg. Ilona ügyvédje szétszedné.</p>
        <p className={styles.prompt}>
          Nézd át újra: {chapter?.number}. fejezet – {chapter?.title}
        </p>
        <ul className={styles.recap}>
          {evidence.map((e) => (
            <li key={e.id}>
              <strong>{e.title}:</strong> {e.description}
            </li>
          ))}
        </ul>
        <button
          type="button"
          className={styles.primary}
          onClick={() => {
            setFailedChapter(null)
            setAnswers({})
          }}
        >
          Újra a vádhoz
        </button>
      </div>
    )
  }

  return (
    <div className={styles.form}>
      <p className={styles.prompt}>{puzzle.prompt}</p>
      {puzzle.questions.map((q, qi) => (
        <fieldset key={q.id} className={styles.question}>
          <legend className={styles.questionText}>
            {qi + 1}. {q.text}
          </legend>
          {q.options.map((option, oi) => (
            <label key={option} className={styles.option} data-checked={answers[q.id] === oi}>
              <input
                type="radio"
                name={q.id}
                checked={answers[q.id] === oi}
                onChange={() => setAnswers((a) => ({ ...a, [q.id]: oi }))}
              />
              {option}
            </label>
          ))}
        </fieldset>
      ))}
      <button type="button" className={styles.primary} disabled={!complete || checking} onClick={submit}>
        Vád benyújtása
      </button>
    </div>
  )
}
