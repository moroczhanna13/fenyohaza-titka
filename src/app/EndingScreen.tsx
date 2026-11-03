import { useEffect, useRef } from 'react'
import type { Chapter } from '../story/types'
import NewGameButton from './NewGameButton'
import styles from './IntroScreen.module.css'

interface EndingScreenProps {
  gameTitle: string
  /** The last chapter; its outro is the epilogue. */
  chapter: Chapter
  /** What really happened, e.g. the accusation's conclusion. */
  solution?: string
  onNewGame: () => void
  onOpenCases: () => void
}

/** Shown once the last chapter is complete. */
export default function EndingScreen({ gameTitle, chapter, solution, onNewGame, onOpenCases }: Readonly<EndingScreenProps>) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  useEffect(() => headingRef.current?.focus(), [])

  return (
    <section className={styles.intro} aria-labelledby="ending-title">
      <p className={styles.kicker}>Az ügy lezárva</p>
      <h1 id="ending-title" ref={headingRef} tabIndex={-1} className={styles.title}>
        {gameTitle}
      </h1>
      {solution && (
        <>
          <h2 className={styles.subheading}>Mi történt valójában</h2>
          <p className={styles.plain}>{solution}</p>
        </>
      )}
      <h2 className={styles.subheading}>Utóhang</h2>
      {chapter.outro?.map((p) => (
        <p key={p} className={styles.paragraph}>
          {p}
        </p>
      ))}
      <button type="button" className={styles.start} onClick={onOpenCases}>
        Vissza az ügyekhez
      </button>
      <NewGameButton onConfirm={onNewGame} />
    </section>
  )
}
