import type { CSSProperties } from 'react'
import { APPS, type AppId } from '../apps/registry'
import NewGameButton from './NewGameButton'
import styles from './HomeScreen.module.css'

interface HomeScreenProps {
  unlockedApps: readonly AppId[]
  onOpenApp: (id: AppId) => void
  onNewGame: () => void
}

export default function HomeScreen({ unlockedApps, onOpenApp, onNewGame }: Readonly<HomeScreenProps>) {
  return (
    <div className={styles.home}>
      <nav aria-label="Kezdőképernyő">
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
      <NewGameButton onConfirm={onNewGame} />
    </div>
  )
}
