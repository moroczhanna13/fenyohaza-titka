import { useEffect, useRef } from 'react'
import styles from './IntroScreen.module.css'

interface IntroScreenProps {
  title: string
  number?: number
  paragraphs: string[]
  onStart: () => void
  onOpenCases?: () => void
}

/** Chapter opening text, shown once. */
export default function IntroScreen({ title, number, paragraphs, onStart, onOpenCases }: Readonly<IntroScreenProps>) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  useEffect(() => headingRef.current?.focus(), [])

  return (
    <section className={styles.intro} aria-labelledby="intro-title">
      {number !== undefined && <p className={styles.kicker}>{number}. fejezet</p>}
      <h1 id="intro-title" ref={headingRef} tabIndex={-1} className={styles.title}>
        {title}
      </h1>
      {paragraphs.map((p) => (
        <p key={p} className={styles.paragraph}>
          {p}
        </p>
      ))}
      <button type="button" className={styles.start} onClick={onStart}>
        Kezdés
      </button>
      {onOpenCases && (
        <button type="button" className={styles.secondary} onClick={onOpenCases}>
          Másik ügy választása
        </button>
      )}
    </section>
  )
}
