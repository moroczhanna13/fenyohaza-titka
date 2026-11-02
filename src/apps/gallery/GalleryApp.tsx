import { useCallback, useState, type Dispatch } from 'react'
import AppScreen from '../../app/AppScreen'
import type { Id, Photo } from '../../story/types'
import type { GameAction, GameState } from '../../state/gameState'
import { availablePhotos } from '../../state/selectors'
import { formatMonth, photoUrl } from './format'
import PhotoViewer from './PhotoViewer'
import styles from './Gallery.module.css'

interface GalleryAppProps {
  game: GameState
  dispatch: Dispatch<GameAction>
  onClose: () => void
}

export default function GalleryApp({ game, dispatch, onClose }: Readonly<GalleryAppProps>) {
  const photos = availablePhotos(game)
  const [openPhoto, setOpenPhoto] = useState<Id | null>(null)
  const index = photos.findIndex((p) => p.id === openPhoto)
  const markViewed = useCallback((id: Id) => dispatch({ type: 'viewPhoto', photo: id }), [dispatch])

  if (index >= 0) {
    return (
      <PhotoViewer
        photos={photos}
        index={index}
        onNavigate={(i) => setOpenPhoto(photos[i].id)}
        onViewed={markViewed}
        onBack={() => setOpenPhoto(null)}
      />
    )
  }

  // Group by month, like a phone gallery.
  const groups = new Map<string, Photo[]>()
  for (const photo of photos) {
    const month = formatMonth(photo.info.takenAt)
    groups.set(month, [...(groups.get(month) ?? []), photo])
  }

  return (
    <AppScreen title="Galéria" onBack={onClose} backLabel="Vissza a kezdőképernyőre">
      {photos.length === 0 && <p className={styles.empty}>Nincsenek képek.</p>}
      {[...groups].map(([month, monthPhotos]) => (
        <section key={month} className={styles.group}>
          <h2 className={styles.month}>{month}</h2>
          <ul className={styles.grid}>
            {monthPhotos.map((photo) => (
              <li key={photo.id}>
                <button type="button" className={styles.thumb} onClick={() => setOpenPhoto(photo.id)}>
                  <img src={photoUrl(photo.src)} alt={photo.alt} loading="lazy" />
                </button>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </AppScreen>
  )
}
