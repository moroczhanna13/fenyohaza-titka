import styles from './SoundToggle.module.css'

/** Speaker button in the status bar; mutes every sound, including the background static. */
export default function SoundToggle({ muted, onToggle }: Readonly<{ muted: boolean; onToggle: () => void }>) {
  return (
    <button
      type="button"
      className={styles.toggle}
      aria-pressed={muted}
      aria-label="Hang némítása"
      title={muted ? 'Hang bekapcsolása' : 'Hang némítása'}
      onClick={onToggle}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 9v6h4l5 4V5L8 9z" fill="currentColor" />
        {muted ? <path d="m17 9 5 6m0-6-5 6" /> : <path d="M17 8.5a5 5 0 0 1 0 7M19.5 6a8.5 8.5 0 0 1 0 12" />}
      </svg>
    </button>
  )
}
