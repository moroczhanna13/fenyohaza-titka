import { useEffect } from 'react'
import styles from './NotificationBanner.module.css'

export interface PhoneNotification {
  /** Changes for every notification so the auto-hide timer restarts. */
  key: number
  title: string
  text: string
  onOpen: () => void
}

const VISIBLE_MS = 5000

/**
 * Banner for incoming messages. The live region is always mounted so screen
 * readers announce each new notification (the text equivalent of the sound).
 */
export default function NotificationBanner({
  notification,
  onDismiss,
}: Readonly<{ notification: PhoneNotification | null; onDismiss: () => void }>) {
  useEffect(() => {
    if (!notification) return
    const timer = window.setTimeout(onDismiss, VISIBLE_MS)
    return () => window.clearTimeout(timer)
  }, [notification, onDismiss])

  return (
    <div className={styles.region} role="status" aria-live="polite">
      {notification && (
        <button
          key={notification.key}
          type="button"
          className={styles.banner}
          onClick={() => {
            notification.onOpen()
            onDismiss()
          }}
        >
          <span className={styles.title}>{notification.title}</span>
          <span className={styles.text}>{notification.text}</span>
        </button>
      )}
    </div>
  )
}
