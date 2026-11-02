import { useEffect, useRef, type ReactNode } from 'react'
import styles from './AppScreen.module.css'

interface AppScreenProps {
  title: string
  onBack: () => void
  /** Accessible name of the back button, e.g. where it leads. */
  backLabel?: string
  children: ReactNode
  /** Pinned below the scrolling body, e.g. reply options. */
  footer?: ReactNode
}

/** Common layout for app screens: header with back button, scrolling body, optional footer. */
export default function AppScreen({ title, onBack, backLabel, children, footer }: Readonly<AppScreenProps>) {
  const backRef = useRef<HTMLButtonElement>(null)
  // Put keyboard focus at the top of each newly opened screen.
  useEffect(() => backRef.current?.focus(), [title])

  return (
    <section className={styles.screen} aria-label={title}>
      <header className={styles.header}>
        <button ref={backRef} type="button" className={styles.back} onClick={onBack} aria-label={backLabel}>
          ‹ Vissza
        </button>
        <h1 className={styles.title}>{title}</h1>
      </header>
      <div className={styles.body}>{children}</div>
      {footer && <div className={styles.footer}>{footer}</div>}
    </section>
  )
}
