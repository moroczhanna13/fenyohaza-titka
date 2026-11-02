import { useEffect, useRef } from 'react'
import styles from './AppPlaceholder.module.css'

interface AppPlaceholderProps {
  title: string
  onBack: () => void
}

/** Temporary screen for apps that are not built yet. */
export default function AppPlaceholder({ title, onBack }: Readonly<AppPlaceholderProps>) {
  const backRef = useRef<HTMLButtonElement>(null)
  useEffect(() => backRef.current?.focus(), [])

  return (
    <section className={styles.screen} aria-label={title}>
      <header className={styles.header}>
        <button ref={backRef} type="button" className={styles.back} onClick={onBack}>
          ‹ Vissza
        </button>
        <h1 className={styles.title}>{title}</h1>
      </header>
      <p className={styles.body}>Hamarosan…</p>
    </section>
  )
}
