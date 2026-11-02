import { useEffect, useState, type ReactNode } from 'react'
import styles from './PhoneFrame.module.css'

const timeFormat = new Intl.DateTimeFormat('hu-HU', { hour: '2-digit', minute: '2-digit' })

function useClock(): Date {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    // Tick on the minute boundary, then every minute.
    let interval: number | undefined
    const timeout = window.setTimeout(() => {
      setNow(new Date())
      interval = window.setInterval(() => setNow(new Date()), 60_000)
    }, 60_000 - (Date.now() % 60_000))
    return () => {
      window.clearTimeout(timeout)
      window.clearInterval(interval)
    }
  }, [])
  return now
}

function SignalIcon() {
  return (
    <svg width="18" height="12" viewBox="0 0 18 12" aria-hidden="true" fill="currentColor">
      <rect x="0" y="8" width="3" height="4" rx="1" />
      <rect x="5" y="5" width="3" height="7" rx="1" />
      <rect x="10" y="2.5" width="3" height="9.5" rx="1" />
      <rect x="15" y="0" width="3" height="12" rx="1" opacity="0.35" />
    </svg>
  )
}

function BatteryIcon() {
  return (
    <svg width="26" height="12" viewBox="0 0 26 12" aria-hidden="true">
      <rect x="0.5" y="0.5" width="22" height="11" rx="3" fill="none" stroke="currentColor" opacity="0.5" />
      <rect x="2" y="2" width="12" height="8" rx="1.5" fill="var(--color-accent)" />
      <rect x="23.5" y="4" width="2" height="4" rx="1" fill="currentColor" opacity="0.5" />
    </svg>
  )
}

interface PhoneFrameProps {
  children: ReactNode
  /** Floating content above the screen, e.g. notification banners. */
  overlay?: ReactNode
}

export default function PhoneFrame({ children, overlay }: Readonly<PhoneFrameProps>) {
  const now = useClock()
  return (
    <div className={styles.stage}>
      <div className={styles.device}>
        <div className={styles.statusBar}>
          <time dateTime={now.toISOString()}>{timeFormat.format(now)}</time>
          <span className={styles.indicators}>
            <SignalIcon />
            <BatteryIcon />
          </span>
        </div>
        <div className={styles.screen}>{children}</div>
        {overlay}
        <div className={styles.homeIndicator} aria-hidden="true" />
      </div>
    </div>
  )
}
