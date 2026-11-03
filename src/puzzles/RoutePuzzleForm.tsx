import { useState } from 'react'
import type { Id, MapRoad, RoutePuzzle } from '../story/types'
import { isCorrectAnswer, routeAnswer } from './answer'
import styles from './Deduction.module.css'

interface RoutePuzzleFormProps {
  puzzle: RoutePuzzle
  onSolved: () => void
}

function roadBetween(roads: MapRoad[], a: Id, b: Id): MapRoad | undefined {
  return roads.find((r) => (r.from === a && r.to === b) || (r.from === b && r.to === a))
}

/**
 * Build a route on the map from the start, one neighbouring place at a time.
 * The map is for pointer users; the same moves are offered as buttons below it.
 */
export default function RoutePuzzleForm({ puzzle, onSolved }: Readonly<RoutePuzzleFormProps>) {
  const [route, setRoute] = useState<Id[]>([puzzle.start])
  const [checking, setChecking] = useState(false)
  const [wrong, setWrong] = useState(false)

  const placeById = new Map(puzzle.places.map((p) => [p.id, p]))
  const label = (id: Id) => placeById.get(id)?.label ?? id
  const here = route[route.length - 1]
  const neighbours = puzzle.roads
    .filter((r) => r.from === here || r.to === here)
    .map((r) => ({ id: r.from === here ? r.to : r.from, km: r.km }))
  const km = route.slice(1).reduce((sum, id, i) => sum + (roadBetween(puzzle.roads, route[i], id)?.km ?? 0), 0)
  const travelled = new Set(route.slice(1).map((id, i) => roadBetween(puzzle.roads, route[i], id)))

  const update = (next: Id[]) => {
    setWrong(false)
    setRoute(next)
  }

  const check = async () => {
    if (route.length < 2 || checking) return
    setChecking(true)
    const correct = await isCorrectAnswer(routeAnswer(route), puzzle.answerHash)
    setChecking(false)
    if (correct) {
      onSolved()
    } else {
      // Off for one frame, then on: re-announces the message.
      setWrong(false)
      requestAnimationFrame(() => setWrong(true))
    }
  }

  return (
    <div className={styles.form}>
      <p className={styles.prompt}>{puzzle.prompt}</p>
      <svg className={styles.map} viewBox="-4 -4 108 88" aria-hidden="true">
        {puzzle.roads.map((road) => {
          const a = placeById.get(road.from)
          const b = placeById.get(road.to)
          if (!a || !b) return null
          return (
            <g key={`${road.from}-${road.to}`} data-travelled={travelled.has(road)} className={styles.road}>
              <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} />
              <text x={(a.x + b.x) / 2} y={(a.y + b.y) / 2 - 1.5} textAnchor="middle">
                {road.km} km
              </text>
            </g>
          )
        })}
        {puzzle.places.map((place) => {
          const next = neighbours.some((n) => n.id === place.id)
          const side = place.labelSide ?? 'below'
          const labelAt = ({
            below: { x: place.x, y: place.y + 7, anchor: 'middle' },
            left: { x: place.x - 4.5, y: place.y + 1.2, anchor: 'end' },
            right: { x: place.x + 4.5, y: place.y + 1.2, anchor: 'start' },
          } as const)[side]
          return (
            <g
              key={place.id}
              className={styles.place}
              data-here={place.id === here}
              data-next={next}
              onClick={next ? () => update([...route, place.id]) : undefined}
            >
              <circle cx={place.x} cy={place.y} r={place.id === here ? 3.2 : 2.4} />
              <text x={labelAt.x} y={labelAt.y} textAnchor={labelAt.anchor}>
                {place.label}
              </text>
            </g>
          )
        })}
      </svg>

      <ol className={styles.route}>
        {route.map((id, i) => (
          // Places can repeat, so the position is part of the key.
          <li key={`${i}-${id}`}>{label(id)}</li>
        ))}
      </ol>
      <p className={styles.routeTotal} aria-live="polite">
        Összesen: {km} km
      </p>

      <fieldset className={styles.question}>
        <legend className={styles.questionText}>Következő állomás innen: {label(here)}</legend>
        <div className={styles.nextStops}>
          {neighbours.map((n) => (
            <button key={n.id} type="button" className={styles.stop} onClick={() => update([...route, n.id])}>
              {label(n.id)} ({n.km} km)
            </button>
          ))}
        </div>
      </fieldset>

      <div className={styles.routeActions}>
        <button type="button" className={styles.secondary} disabled={route.length < 2} onClick={() => update(route.slice(0, -1))}>
          Visszavonás
        </button>
        <button type="button" className={styles.secondary} disabled={route.length < 2} onClick={() => update([puzzle.start])}>
          Újrakezdés
        </button>
        <button type="button" className={styles.primary} disabled={route.length < 2 || checking} onClick={check}>
          Ellenőrzés
        </button>
      </div>
      <output className={styles.feedback}>{wrong ? 'Ez az útvonal nem egyezik a bizonyítékokkal.' : ''}</output>
    </div>
  )
}
