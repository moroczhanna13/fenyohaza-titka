import type { CSSProperties } from 'react'
import { APPS, type AppId } from '../apps/registry'
import NewGameButton from './NewGameButton'
import styles from './HomeScreen.module.css'

interface HomeScreenProps {
  unlockedApps: readonly AppId[]
  /** Unread counts shown on app icons. */
  badges?: Partial<Record<AppId, number>>
  onOpenApp: (id: AppId) => void
  onNewGame: () => void
}

export default function HomeScreen({ unlockedApps, badges = {}, onOpenApp, onNewGame }: Readonly<HomeScreenProps>) {
  return (
    <div className={styles.home}>
      <nav aria-label="Kezdőképernyő">
        <ul className={styles.grid}>
          {APPS.map((app) => {
            const locked = !unlockedApps.includes(app.id)
            const badge = locked ? 0 : (badges[app.id] ?? 0)
            let label = app.label
            if (locked) label += ' (zárolva)'
            else if (badge > 0) label += `, ${badge} új`
            return (
              <li key={app.id}>
                {/* Locked apps use aria-disabled (not disabled) so they stay focusable and announced. */}
                <button
                  type="button"
                  className={styles.icon}
                  aria-disabled={locked}
                  aria-label={label}
                  onClick={locked ? undefined : () => onOpenApp(app.id)}
                >
                  <span className={styles.tile} style={{ '--tile-color': app.color } as CSSProperties}>
                    {app.icon}
                    {badge > 0 && (
                      <span className={styles.badge} aria-hidden="true">
                        {badge}
                      </span>
                    )}
                  </span>
                  <span className={styles.label}>{app.label}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </nav>
      <NewGameButton onConfirm={onNewGame} />
    </div>
  )
}
