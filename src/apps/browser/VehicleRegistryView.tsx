import { useEffect, useId, useState, type Dispatch, type SubmitEvent } from 'react'
import type { VehicleRecord, VehicleRegistryPage } from '../../story/types'
import type { GameAction } from '../../state/gameState'
import styles from './Pages.module.css'

/** "gbm 418" → "GBM418": plates match regardless of spaces, dashes and case. */
export function normalizePlate(plate: string): string {
  return plate.toUpperCase().replace(/[^A-Z0-9]/g, '')
}

export function findVehicles(records: VehicleRecord[], plate: string): VehicleRecord[] {
  const wanted = normalizePlate(plate)
  return wanted ? records.filter((r) => normalizePlate(r.plate) === wanted) : []
}

interface VehicleRegistryViewProps {
  page: VehicleRegistryPage
  dispatch: Dispatch<GameAction>
}

export default function VehicleRegistryView({ page, dispatch }: Readonly<VehicleRegistryViewProps>) {
  const plateId = useId()
  const [plate, setPlate] = useState('')
  const [results, setResults] = useState<VehicleRecord[] | null>(null)

  useEffect(() => dispatch({ type: 'visitPage', page: page.id }), [dispatch, page.id])

  const search = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    setResults(findVehicles(page.records, plate))
  }

  return (
    <div className={styles.registry}>
      <h2 className={styles.registryTitle}>{page.title}</h2>
      {page.intro && <p className={styles.intro}>{page.intro}</p>}
      <form className={styles.searchForm} onSubmit={search}>
        <label htmlFor={plateId} className={styles.label}>
          Rendszám
        </label>
        <div className={styles.searchRow}>
          <input
            id={plateId}
            className={`${styles.input} ${styles.plateInput}`}
            value={plate}
            onChange={(e) => setPlate(e.target.value)}
            placeholder="ABC-123"
            autoComplete="off"
            autoCapitalize="characters"
            spellCheck={false}
            required
          />
          <button type="submit" className={styles.button}>
            Lekérdezés
          </button>
        </div>
      </form>
      <div aria-live="polite">
        {results &&
          (results.length === 0 ? (
            <p className={styles.noResults}>Erre a rendszámra nincs nyilvántartott adat.</p>
          ) : (
            results.map((r) => (
              <dl key={`${r.plate}-${r.period}`} className={styles.record}>
                <dt>Rendszám</dt>
                <dd className={styles.plate}>{r.plate}</dd>
                <dt>Jármű</dt>
                <dd>{r.vehicle}</dd>
                <dt>Szín</dt>
                <dd>{r.color}</dd>
                <dt>Üzembentartó</dt>
                <dd>{r.holder}</dd>
                <dt>Időszak</dt>
                <dd>{r.period}</dd>
              </dl>
            ))
          ))}
      </div>
    </div>
  )
}
