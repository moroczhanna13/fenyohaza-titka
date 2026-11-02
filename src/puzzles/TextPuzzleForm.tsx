import { useId, useState, type SubmitEvent } from 'react'
import type { TextPuzzle } from '../story/types'
import { isCorrectAnswer } from './answer'
import styles from './Puzzle.module.css'

interface TextPuzzleFormProps {
  puzzle: TextPuzzle
  onSolved: () => void
  submitLabel?: string
}

/** Typed answer, checked against the stored hash after normalization. */
export default function TextPuzzleForm({ puzzle, onSolved, submitLabel = 'Ellenőrzés' }: Readonly<TextPuzzleFormProps>) {
  const inputId = useId()
  const [value, setValue] = useState('')
  const [checking, setChecking] = useState(false)
  const [showWrong, setShowWrong] = useState(false)

  const submit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!value.trim() || checking) return
    setChecking(true)
    const correct = await isCorrectAnswer(value, puzzle.answerHash)
    setChecking(false)
    if (correct) {
      onSolved()
    } else {
      // Off for one frame, then on: restarts the shake and re-announces the message.
      setShowWrong(false)
      requestAnimationFrame(() => setShowWrong(true))
    }
  }

  return (
    <form className={styles.form} onSubmit={submit}>
      <label htmlFor={inputId} className={styles.prompt}>
        {puzzle.prompt}
      </label>
      <div className={styles.row}>
        <input
          id={inputId}
          className={styles.input}
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            setShowWrong(false)
          }}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck={false}
          aria-invalid={showWrong}
          data-wrong={showWrong}
        />
        <button type="submit" className={styles.submit} disabled={checking || !value.trim()}>
          {submitLabel}
        </button>
      </div>
      <output className={styles.feedback}>
        {showWrong ? 'Nem ez a válasz.' : ''}
      </output>
    </form>
  )
}
