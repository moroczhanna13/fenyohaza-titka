import { useEffect, useId, useState, type Dispatch } from 'react'
import AppScreen from '../../app/AppScreen'
import { findConversation, findPuzzle } from '../../story/chapters'
import type { EvidenceSource } from '../../story/types'
import type { GameAction, GameState } from '../../state/gameState'
import { foundEvidence } from '../../state/selectors'
import styles from './Notebook.module.css'

function sourceLabel(source: EvidenceSource | undefined): string | null {
  switch (source?.type) {
    case 'photo':
      return 'Galéria'
    case 'conversation':
      return `Üzenetek – ${findConversation(source.conversation)?.contact ?? ''}`
    case 'puzzle':
      return findPuzzle(source.puzzle)?.title ?? null
    default:
      return null
  }
}

interface NotebookAppProps {
  game: GameState
  dispatch: Dispatch<GameAction>
  onClose: () => void
}

export default function NotebookApp({ game, dispatch, onClose }: Readonly<NotebookAppProps>) {
  const notesId = useId()
  const evidence = foundEvidence(game)
  const unseen = evidence.filter((e) => !game.seenEvidence.includes(e.id)).map((e) => e.id)
  // Remember which items were new when the notebook opened, so the marker stays visible until it closes.
  const [newIds] = useState(unseen)
  const unseenKey = unseen.join()

  useEffect(() => {
    if (unseenKey) dispatch({ type: 'markEvidenceSeen', evidence: unseenKey.split(',') })
  }, [dispatch, unseenKey])

  return (
    <AppScreen title="Jegyzetfüzet" onBack={onClose} backLabel="Vissza a kezdőképernyőre">
      <section className={styles.section} aria-labelledby="evidence-title">
        <h2 id="evidence-title" className={styles.heading}>
          Bizonyítékok
        </h2>
        {evidence.length === 0 ? (
          <p className={styles.empty}>Még nincs bizonyíték.</p>
        ) : (
          <ul className={styles.evidence}>
            {evidence.map((item) => {
              const source = sourceLabel(item.source)
              return (
                <li key={item.id} className={styles.card}>
                  <h3 className={styles.cardTitle}>
                    {item.title}
                    {newIds.includes(item.id) && <span className={styles.new}>Új</span>}
                  </h3>
                  <p className={styles.description}>{item.description}</p>
                  {source && <p className={styles.source}>Forrás: {source}</p>}
                </li>
              )
            })}
          </ul>
        )}
      </section>
      <section className={styles.section}>
        <h2 className={styles.heading}>
          <label htmlFor={notesId}>Saját jegyzetek</label>
        </h2>
        <textarea
          id={notesId}
          className={styles.notes}
          value={game.notes}
          onChange={(e) => dispatch({ type: 'setNotes', text: e.target.value })}
          placeholder="Ide írhatod, amit észrevettél…"
          rows={8}
        />
      </section>
    </AppScreen>
  )
}
