import { useId, useState, type Dispatch, type SubmitEvent } from 'react'
import AppScreen from '../../app/AppScreen'
import type { GameAction, GameState } from '../../state/gameState'
import { availablePages } from '../../state/selectors'
import ImageSearchView from './ImageSearchView'
import LoginPageView from './LoginPageView'
import NewsArchiveView from './NewsArchiveView'
import StaticPageView from './StaticPageView'
import { findPageByUrl, normalizeUrl } from './url'
import VehicleRegistryView from './VehicleRegistryView'
import styles from './Browser.module.css'

interface BrowserAppProps {
  game: GameState
  dispatch: Dispatch<GameAction>
  onClose: () => void
}

const START = ''

export default function BrowserApp({ game, dispatch, onClose }: Readonly<BrowserAppProps>) {
  const addressId = useId()
  const pages = availablePages(game)
  const [history, setHistory] = useState<string[]>([START])
  const current = history[history.length - 1]
  const [address, setAddress] = useState(current)

  const navigate = (url: string) => {
    const normalized = normalizeUrl(url)
    setHistory((h) => [...h, normalized])
    setAddress(normalized)
  }
  const goBack = () => {
    const previous = history.slice(0, -1)
    setHistory(previous)
    setAddress(previous[previous.length - 1])
  }
  const submit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    navigate(address)
  }

  const page = current === START ? undefined : findPageByUrl(pages, current)
  let content
  if (current === START) {
    const bookmarks = pages.filter((p) => p.bookmarked)
    content = (
      <div className={styles.start}>
        <h2 className={styles.startTitle}>Könyvjelzők</h2>
        {bookmarks.length === 0 ? (
          <p className={styles.muted}>Nincsenek könyvjelzők.</p>
        ) : (
          <ul className={styles.bookmarks}>
            {bookmarks.map((p) => (
              <li key={p.id}>
                <button type="button" className={styles.bookmark} onClick={() => navigate(p.url)}>
                  <span className={styles.bookmarkTitle}>{p.title}</span>
                  <span className={styles.bookmarkUrl}>{p.url}</span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  } else if (page) {
    switch (page.kind) {
      case 'newsArchive':
        content = <NewsArchiveView page={page} dispatch={dispatch} />
        break
      case 'vehicleRegistry':
        content = <VehicleRegistryView page={page} dispatch={dispatch} />
        break
      case 'static':
        content = <StaticPageView page={page} dispatch={dispatch} />
        break
      case 'login':
        content = <LoginPageView page={page} game={game} dispatch={dispatch} />
        break
      case 'imageSearch':
        content = <ImageSearchView page={page} game={game} dispatch={dispatch} />
        break
    }
  } else {
    content = (
      <div className={styles.notFound}>
        <h2>Az oldal nem érhető el</h2>
        <p className={styles.muted}>A(z) {current} cím nem található. Ellenőrizd, jól írtad-e be.</p>
      </div>
    )
  }

  return (
    <AppScreen title="Böngésző" onBack={onClose} backLabel="Vissza a kezdőképernyőre">
      <form className={styles.toolbar} onSubmit={submit}>
        <button
          type="button"
          className={styles.navButton}
          onClick={goBack}
          disabled={history.length <= 1}
          aria-label="Előző oldal"
        >
          ‹
        </button>
        <label htmlFor={addressId} className="visually-hidden">
          Webcím
        </label>
        <input
          id={addressId}
          className={styles.address}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          onFocus={(e) => e.target.select()}
          placeholder="Írj be egy webcímet"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          inputMode="url"
        />
        <button type="submit" className={styles.navButton} aria-label="Ugrás">
          →
        </button>
        <button
          type="button"
          className={styles.navButton}
          onClick={() => navigate(START)}
          aria-label="Kezdőlap"
        >
          ⌂
        </button>
      </form>
      <div key={current} className={styles.page}>
        {content}
      </div>
    </AppScreen>
  )
}
