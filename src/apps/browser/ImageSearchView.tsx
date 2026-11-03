import { useEffect, useState, type Dispatch } from 'react'
import type { Id, ImageSearchPage } from '../../story/types'
import type { GameAction, GameState } from '../../state/gameState'
import { availablePhotos } from '../../state/selectors'
import { photoUrl } from '../gallery/format'
import styles from './Pages.module.css'

interface ImageSearchViewProps {
  page: ImageSearchPage
  game: GameState
  dispatch: Dispatch<GameAction>
}

/** Reverse image search over the photos in the player's gallery. */
export default function ImageSearchView({ page, game, dispatch }: Readonly<ImageSearchViewProps>) {
  const photos = availablePhotos(game)
  const [selected, setSelected] = useState<Id | null>(null)
  const photo = photos.find((p) => p.id === selected)
  const entry = page.searches.find((e) => e.photo === selected)

  useEffect(() => dispatch({ type: 'visitPage', page: page.id }), [dispatch, page.id])
  useEffect(() => {
    if (entry) dispatch({ type: 'visitPage', page: entry.id })
  }, [dispatch, entry])

  return (
    <div className={styles.imageSearch}>
      <h2 className={styles.imageSearchTitle}>{page.title}</h2>
      {page.intro && <p className={styles.intro}>{page.intro}</p>}
      {photos.length === 0 ? (
        <p className={styles.noResults}>A galériádban nincs kép.</p>
      ) : (
        <ul className={styles.pickGrid} aria-label="Képek a galériádból">
          {photos.map((p) => (
            <li key={p.id}>
              <button
                type="button"
                className={styles.pick}
                aria-pressed={p.id === selected}
                onClick={() => setSelected(p.id)}
              >
                <img src={photoUrl(p.src)} alt={`Keresés ezzel a képpel: ${p.caption ?? p.alt}`} />
              </button>
            </li>
          ))}
        </ul>
      )}
      <div aria-live="polite">
        {photo && (
          <>
            <p className={styles.resultCount}>
              {entry && entry.matches.length > 0
                ? `${entry.matches.length} találat erre a képre: ${photo.caption ?? ''}`
                : 'Nincs találat. Ez a kép máshol nem szerepel az interneten.'}
            </p>
            {entry && entry.matches.length > 0 && (
              <ul className={styles.matches}>
                {entry.matches.map((m) => (
                  <li key={m.url} className={styles.match}>
                    <span className={styles.matchUrl}>{m.url}</span>
                    <span className={styles.matchTitle}>{m.title}</span>
                    {m.date && <span className={styles.resultDate}>{m.date}</span>}
                    <span className={styles.matchSnippet}>{m.snippet}</span>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </div>
  )
}
