import AppScreen from './AppScreen'
import styles from './AppPlaceholder.module.css'

/** Temporary screen for apps that are not built yet. */
export default function AppPlaceholder({ title, onBack }: Readonly<{ title: string; onBack: () => void }>) {
  return (
    <AppScreen title={title} onBack={onBack}>
      <p className={styles.body}>Hamarosan…</p>
    </AppScreen>
  )
}
