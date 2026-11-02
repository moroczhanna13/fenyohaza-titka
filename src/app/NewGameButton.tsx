import { useEffect, useRef, useState } from 'react'
import styles from './NewGameButton.module.css'

/** "New game" with an inline confirmation step, so progress is not lost by accident. */
export default function NewGameButton({ onConfirm }: Readonly<{ onConfirm: () => void }>) {
  const [confirming, setConfirming] = useState(false)
  const openRef = useRef<HTMLButtonElement>(null)
  const cancelRef = useRef<HTMLButtonElement>(null)
  const wasConfirming = useRef(false)

  // Move focus into the prompt when it opens, and back to the button when it closes.
  useEffect(() => {
    if (confirming) cancelRef.current?.focus()
    else if (wasConfirming.current) openRef.current?.focus()
    wasConfirming.current = confirming
  }, [confirming])

  if (!confirming) {
    return (
      <button ref={openRef} type="button" className={styles.link} onClick={() => setConfirming(true)}>
        Új játék
      </button>
    )
  }

  return (
    <div
      className={styles.prompt}
      role="alertdialog"
      aria-labelledby="new-game-question"
      onKeyDown={(e) => e.key === 'Escape' && setConfirming(false)}
    >
      <p id="new-game-question" className={styles.question}>
        Új játékot kezdesz? Az eddigi haladás elvész.
      </p>
      <div className={styles.actions}>
        <button ref={cancelRef} type="button" className={styles.secondary} onClick={() => setConfirming(false)}>
          Mégse
        </button>
        <button
          type="button"
          className={styles.danger}
          onClick={() => {
            setConfirming(false)
            onConfirm()
          }}
        >
          Új játék
        </button>
      </div>
    </div>
  )
}
