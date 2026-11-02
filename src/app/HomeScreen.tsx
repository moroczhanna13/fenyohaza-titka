import type { CSSProperties } from 'react'
import { APPS, type AppId } from '../apps/registry'
import styles from './HomeScreen.module.css'

interface HomeScreenProps {
  unlockedApps: readonly AppId[]
  onOpenApp: (id: AppId) => void
}

export default function HomeScreen({ unlockedApps, onOpenApp }: Readonly<HomeScreenProps>) {
  return (
    <nav className={styles.home} aria-label="Kezdőképernyő">
      <ul className={styles.grid}>
        {APPS.map((app) => {
          const locked = !unlockedApps.includes(app.id)
          return (
            <li key={app.id}>
              {/* Locked apps use aria-disabled (not disabled) so they stay focusable and announced. */}
              <button
                type="button"
                className={styles.icon}
                aria-disabled={locked}
                aria-label={locked ? `${app.label} (zárolva)` : app.label}
                onClick={locked ? undefined : () => onOpenApp(app.id)}
              >
                <span className={styles.tile} style={{ '--tile-color': app.color } as CSSProperties}>
                  {app.icon}
                </span>
                <span className={styles.label}>{app.label}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
