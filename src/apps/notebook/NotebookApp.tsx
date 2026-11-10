import { useEffect, useId, useState, type Dispatch } from 'react'
import AppScreen from '../../app/AppScreen'
import { findConversation, findPuzzle } from '../../story/chapters'
import type { EvidenceSource } from '../../story/types'
import type { GameAction, GameState } from '../../state/gameState'
import { availableNotes, foundEvidence, knownCharacters, unseenNotebookIds } from '../../state/selectors'
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

type Tab = 'evidence' | 'people' | 'gedeon' | 'own'

interface NotebookAppProps {
  game: GameState
  dispatch: Dispatch<GameAction>
  onClose: () => void
}

/** The player's notebook: evidence, the people of the case, Gedeon's notes and the player's own notes. */
export default function NotebookApp({ game, dispatch, onClose }: Readonly<NotebookAppProps>) {
  const notesId = useId()
  const evidence = foundEvidence(game)
  const notes = availableNotes(game)
  const people = knownCharacters(game)
  const unseen = unseenNotebookIds(game)
  // Remember which items were new when the notebook opened, so the marker stays visible until it closes.
  const [newIds] = useState(unseen)
  const [tab, setTab] = useState<Tab>('evidence')
  const unseenKey = unseen.join()

  useEffect(() => {
    if (unseenKey) dispatch({ type: 'markEvidenceSeen', evidence: unseenKey.split(',') })
  }, [dispatch, unseenKey])

  const newEvidence = evidence.filter((e) => newIds.includes(e.id)).length
  const newNotes = notes.filter((n) => newIds.includes(n.id)).length
  const tabs: { id: Tab; label: string; fresh?: number }[] = [
    { id: 'evidence', label: 'Bizonyítékok', fresh: newEvidence },
    { id: 'people', label: 'Szereplők' },
    { id: 'gedeon', label: 'Gedeon jegyzetei', fresh: newNotes },
    { id: 'own', label: 'Saját' },
  ]
  const newMark = <span className={styles.new}>Új</span>

  let content
  if (tab === 'evidence') {
    content =
      evidence.length === 0 ? (
        <p className={styles.empty}>Még nincs bizonyíték.</p>
      ) : (
        <ul className={styles.evidence}>
          {evidence.map((item) => {
            const source = sourceLabel(item.source)
            return (
              <li key={item.id} className={styles.card}>
                <h3 className={styles.cardTitle}>
                  {item.title}
                  {newIds.includes(item.id) && newMark}
                </h3>
                <p className={styles.description}>{item.description}</p>
                {source && <p className={styles.source}>Forrás: {source}</p>}
              </li>
            )
          })}
        </ul>
      )
  } else if (tab === 'people') {
    content =
      people.length === 0 ? (
        <p className={styles.empty}>Még senkiről nem tudsz semmit.</p>
      ) : (
        <ul className={styles.evidence}>
          {people.map(({ character, name, facts }) => (
            <li key={character.id}>
              <details className={styles.person}>
                <summary className={styles.personSummary}>
                  <span className={styles.personName}>{name}</span>
                  <span className={styles.personRole}>
                    {[character.roleThen && `2001: ${character.roleThen}`, character.roleNow && `ma: ${character.roleNow}`]
                      .filter(Boolean)
                      .join(' · ')}
                  </span>
                </summary>
                {facts.length === 0 ? (
                  <p className={styles.empty}>Még semmi.</p>
                ) : (
                  <ul className={styles.facts}>
                    {facts.map((fact) => (
                      <li key={fact.id}>{fact.text}</li>
                    ))}
                  </ul>
                )}
              </details>
            </li>
          ))}
        </ul>
      )
  } else if (tab === 'gedeon') {
    content =
      notes.length === 0 ? (
        <p className={styles.empty}>Még nem találtál Gedeontól jegyzetet.</p>
      ) : (
        <ul className={styles.gedeonNotes}>
          {notes.map((note) => (
            <li key={note.id} className={styles.gedeonNote}>
              {(note.date || newIds.includes(note.id)) && (
                <p className={styles.noteDate}>
                  {note.date}
                  {newIds.includes(note.id) && newMark}
                </p>
              )}
              <p className={styles.noteText}>{note.text}</p>
            </li>
          ))}
        </ul>
      )
  } else {
    content = (
      <>
        <label htmlFor={notesId} className="visually-hidden">
          Saját jegyzetek
        </label>
        <textarea
          id={notesId}
          className={styles.notes}
          value={game.notes}
          onChange={(e) => dispatch({ type: 'setNotes', text: e.target.value })}
          placeholder="Ide írhatod, amit észrevettél…"
          rows={12}
        />
      </>
    )
  }

  return (
    <AppScreen title="Jegyzetfüzet" onBack={onClose} backLabel="Vissza a kezdőképernyőre">
      <div className={styles.tabs} role="group" aria-label="Jegyzetfüzet részei">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            className={styles.tab}
            aria-pressed={tab === t.id}
            onClick={() => setTab(t.id)}
          >
            {t.label}
            {!!t.fresh && (
              <span className={styles.tabBadge} aria-label={`${t.fresh} új`}>
                {t.fresh}
              </span>
            )}
          </button>
        ))}
      </div>
      <section className={styles.section} aria-label={tabs.find((t) => t.id === tab)!.label}>
        {content}
      </section>
    </AppScreen>
  )
}
