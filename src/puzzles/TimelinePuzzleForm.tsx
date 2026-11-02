import { useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import type { Id, TimelinePuzzle } from '../story/types'
import { isCorrectAnswer, timelineAnswer } from './answer'
import styles from './Deduction.module.css'

interface TimelinePuzzleFormProps {
  puzzle: TimelinePuzzle
  onSolved: () => void
}

function move(order: Id[], id: Id, to: number): Id[] {
  const rest = order.filter((x) => x !== id)
  const target = Math.max(0, Math.min(rest.length, to))
  return [...rest.slice(0, target), id, ...rest.slice(target)]
}

/**
 * Drag statements into chronological order (or use the arrow keys / buttons)
 * and mark the one that does not fit.
 */
export default function TimelinePuzzleForm({ puzzle, onSolved }: Readonly<TimelinePuzzleFormProps>) {
  const [order, setOrder] = useState<Id[]>(() => puzzle.statements.map((s) => s.id))
  const [misfit, setMisfit] = useState<Id | null>(null)
  const [dragging, setDragging] = useState<Id | null>(null)
  const [announcement, setAnnouncement] = useState('')
  const [checking, setChecking] = useState(false)
  const [wrong, setWrong] = useState(false)
  const listRef = useRef<HTMLOListElement>(null)
  const textOf = (id: Id) => puzzle.statements.find((s) => s.id === id)?.text ?? ''

  const moveTo = (id: Id, to: number) => {
    setWrong(false)
    setOrder((current) => {
      const next = move(current, id, to)
      setAnnouncement(`${next.indexOf(id) + 1}. hely: ${textOf(id)}`)
      return next
    })
  }

  // Pointer drag: the item follows the pointer by swapping with the item under it.
  const onPointerDown = (e: PointerEvent<HTMLButtonElement>, id: Id) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    setDragging(id)
  }
  const onPointerMove = (e: PointerEvent<HTMLButtonElement>, id: Id) => {
    if (dragging !== id || !listRef.current) return
    const items = [...listRef.current.children] as HTMLElement[]
    const target = items.findIndex((item) => {
      const rect = item.getBoundingClientRect()
      return e.clientY >= rect.top && e.clientY <= rect.bottom
    })
    if (target >= 0 && target !== order.indexOf(id)) moveTo(id, target)
  }
  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, id: Id) => {
    const index = order.indexOf(id)
    if (e.key === 'ArrowUp') moveTo(id, index - 1)
    else if (e.key === 'ArrowDown') moveTo(id, index + 1)
    else return
    e.preventDefault()
  }

  const check = async () => {
    if (!misfit || checking) return
    setChecking(true)
    const correct = await isCorrectAnswer(timelineAnswer(order, misfit), puzzle.answerHash)
    setChecking(false)
    if (correct) {
      onSolved()
    } else {
      setWrong(false)
      requestAnimationFrame(() => setWrong(true))
    }
  }

  return (
    <div className={styles.form}>
      <p className={styles.prompt}>{puzzle.prompt}</p>
      <ol ref={listRef} className={styles.timeline} aria-label="Vallomások időrendben">
        {order.map((id, index) => (
          <li key={id} className={styles.event} data-misfit={misfit === id} data-dragging={dragging === id}>
            <button
              type="button"
              className={styles.handle}
              aria-label={`Áthelyezés (${index + 1}. hely). Nyilakkal mozgatható.`}
              onPointerDown={(e) => onPointerDown(e, id)}
              onPointerMove={(e) => onPointerMove(e, id)}
              onPointerUp={() => setDragging(null)}
              onPointerCancel={() => setDragging(null)}
              onKeyDown={(e) => onKeyDown(e, id)}
            >
              ⠿
            </button>
            <div className={styles.eventBody}>
              <p className={styles.eventText}>{textOf(id)}</p>
              <div className={styles.eventControls}>
                <button type="button" className={styles.small} disabled={index === 0} onClick={() => moveTo(id, index - 1)}>
                  ↑ Fel
                </button>
                <button
                  type="button"
                  className={styles.small}
                  disabled={index === order.length - 1}
                  onClick={() => moveTo(id, index + 1)}
                >
                  ↓ Le
                </button>
                <button
                  type="button"
                  className={styles.small}
                  aria-pressed={misfit === id}
                  onClick={() => {
                    setWrong(false)
                    setMisfit((m) => (m === id ? null : id))
                  }}
                >
                  Nem fér bele
                </button>
              </div>
            </div>
          </li>
        ))}
      </ol>
      <p className="visually-hidden" aria-live="polite">
        {announcement}
      </p>
      <button type="button" className={styles.primary} disabled={!misfit || checking} onClick={check}>
        Ellenőrzés
      </button>
      <output className={styles.feedback}>
        {wrong ? 'Valami még nem stimmel: a sorrend vagy a kilógó vallomás.' : ''}
      </output>
    </div>
  )
}
