import { useEffect, useRef } from 'react'
import type { Chapter } from '../story/types'
import styles from './IntroScreen.module.css'

interface ChapterEndProps {
  chapter: Chapter
  next?: Chapter
  onContinue: () => void
}

/** Closing screen of a chapter, leading into the next one. */
export default function ChapterEnd({ chapter, next, onContinue }: Readonly<ChapterEndProps>) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  useEffect(() => headingRef.current?.focus(), [])

  return (
    <section className={styles.intro} aria-labelledby="chapter-end-title">
      {chapter.number !== undefined && <p className={styles.kicker}>{chapter.number}. fejezet vége</p>}
      <h1 id="chapter-end-title" ref={headingRef} tabIndex={-1} className={styles.title}>
        {chapter.title}
      </h1>
      {chapter.outro?.map((p) => (
        <p key={p} className={styles.paragraph}>
          {p}
        </p>
      ))}
      {next ? (
        <button type="button" className={styles.start} onClick={onContinue}>
          Tovább: {next.number}. fejezet
        </button>
      ) : (
        <p className={styles.paragraph}>Folytatás hamarosan.</p>
      )}
    </section>
  )
}
