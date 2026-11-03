import type { GameState } from '../state/gameState'
import { currentChapter, isCaseSolved } from '../state/selectors'
import type { Id, StoryCase } from '../story/types'
import AppScreen from './AppScreen'
import styles from './CasePicker.module.css'

interface CasePickerProps {
  cases: readonly StoryCase[]
  /** Saved game of each case, if any. */
  saves: Readonly<Record<Id, GameState | null>>
  activeCase: Id
  onPick: (id: Id) => void
  onClose: () => void
}

function status(storyCase: StoryCase, save: GameState | null): string {
  if (!save || (save.introSeen.length === 0 && save.solvedPuzzles.length === 0)) return 'Még nem kezdted el'
  if (isCaseSolved(save)) return 'Megoldva'
  const { number } = currentChapter(save)
  return storyCase.chapters.length > 1 && number !== undefined ? `Folyamatban: ${number}. fejezet` : 'Folyamatban'
}

/** Lists the main story and the side cases; each keeps its own progress. */
export default function CasePicker({ cases, saves, activeCase, onPick, onClose }: Readonly<CasePickerProps>) {
  return (
    <AppScreen title="Ügyek" onBack={onClose} backLabel="Vissza a kezdőképernyőre">
      <ul className={styles.list}>
        {cases.map((c) => {
          const active = c.id === activeCase
          return (
            <li key={c.id}>
              <button
                type="button"
                className={styles.card}
                data-active={active}
                aria-current={active || undefined}
                onClick={() => (active ? onClose() : onPick(c.id))}
              >
                <span className={styles.kind}>{c.kind === 'main' ? 'Főszál' : 'Mellékügy'}</span>
                <span className={styles.title}>{c.title}</span>
                <span className={styles.summary}>{c.summary}</span>
                <span className={styles.status}>
                  {status(c, saves[c.id] ?? null)}
                  {active && ' · most ezt játszod'}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </AppScreen>
  )
}
