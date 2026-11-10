import { useEffect, useRef, useState, type PointerEvent } from 'react'
import AppScreen from '../../app/AppScreen'
import type { Id, Photo } from '../../story/types'
import { formatCoordinates, formatTakenAt, photoUrl } from './format'
import styles from './Gallery.module.css'

interface PhotoViewerProps {
  photos: Photo[]
  index: number
  onNavigate: (index: number) => void
  onViewed: (id: Id) => void
  onBack: () => void
}

export default function PhotoViewer({ photos, index, onNavigate, onViewed, onBack }: Readonly<PhotoViewerProps>) {
  const photo = photos[index]
  const [showInfo, setShowInfo] = useState(false)
  const [zoomed, setZoomed] = useState(false)
  const stageRef = useRef<HTMLDivElement>(null)
  const drag = useRef<{ x: number; y: number; left: number; top: number } | null>(null)
  const hasPrev = index > 0
  const hasNext = index < photos.length - 1

  useEffect(() => {
    onViewed(photo.id)
    setZoomed(false)
  }, [photo.id, onViewed])

  // Zooming in starts at the middle of the photo.
  useEffect(() => {
    const stage = stageRef.current
    if (!zoomed || !stage) return
    stage.scrollLeft = (stage.scrollWidth - stage.clientWidth) / 2
    stage.scrollTop = (stage.scrollHeight - stage.clientHeight) / 2
  }, [zoomed])

  // With a mouse, the zoomed photo is moved by dragging; touch screens scroll natively.
  const startDrag = (e: PointerEvent<HTMLDivElement>) => {
    const stage = stageRef.current
    if (!zoomed || !stage || e.pointerType !== 'mouse') return
    drag.current = { x: e.clientX, y: e.clientY, left: stage.scrollLeft, top: stage.scrollTop }
    stage.setPointerCapture(e.pointerId)
  }
  const moveDrag = (e: PointerEvent<HTMLDivElement>) => {
    const stage = stageRef.current
    if (!drag.current || !stage) return
    stage.scrollLeft = drag.current.left - (e.clientX - drag.current.x)
    stage.scrollTop = drag.current.top - (e.clientY - drag.current.y)
  }
  const endDrag = () => {
    drag.current = null
  }

  // Arrow keys page through photos.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && hasPrev) onNavigate(index - 1)
      if (e.key === 'ArrowRight' && hasNext) onNavigate(index + 1)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [index, hasPrev, hasNext, onNavigate])

  const footer = (
    <div className={styles.toolbar}>
      <button type="button" disabled={!hasPrev} onClick={() => onNavigate(index - 1)} aria-label="Előző kép">
        ‹
      </button>
      <button type="button" aria-pressed={zoomed} onClick={() => setZoomed((z) => !z)}>
        Nagyítás
      </button>
      <button type="button" aria-pressed={showInfo} aria-controls="photo-info" onClick={() => setShowInfo((s) => !s)}>
        Infó
      </button>
      <button type="button" disabled={!hasNext} onClick={() => onNavigate(index + 1)} aria-label="Következő kép">
        ›
      </button>
    </div>
  )

  return (
    <div className={styles.viewer}>
      <AppScreen
        title={`${index + 1} / ${photos.length}`}
        onBack={onBack}
        backLabel="Vissza a galériához"
        footer={footer}
      >
        <div
          ref={stageRef}
          className={styles.stage}
          data-zoomed={zoomed}
          onPointerDown={startDrag}
          onPointerMove={moveDrag}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onDoubleClick={() => setZoomed((z) => !z)}
        >
          <img src={photoUrl(photo.src)} alt={photo.alt} className={styles.photo} />
        </div>
        {photo.caption && <p className={styles.caption}>{photo.caption}</p>}
        {showInfo && (
          <dl id="photo-info" className={styles.info}>
            <dt>Dátum</dt>
            <dd>{formatTakenAt(photo.info.takenAt)}</dd>
            {photo.info.place && (
              <>
                <dt>Hely</dt>
                <dd>{photo.info.place}</dd>
              </>
            )}
            {photo.info.coordinates && (
              <>
                <dt>Koordináták</dt>
                <dd>{formatCoordinates(photo.info.coordinates)}</dd>
              </>
            )}
            {photo.info.device && (
              <>
                <dt>Eszköz</dt>
                <dd>{photo.info.device}</dd>
              </>
            )}
          </dl>
        )}
      </AppScreen>
    </div>
  )
}
