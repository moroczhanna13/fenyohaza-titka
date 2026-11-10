import { useState } from 'react'
import AppScreen from '../../app/AppScreen'
import type { Id } from '../../story/types'
import type { GameState } from '../../state/gameState'
import { knownCharacters } from '../../state/selectors'
import { initials } from '../browser/SocialPageView'
import styles from './Contacts.module.css'

interface ContactsAppProps {
  game: GameState
  onClose: () => void
}

/** The people of the case and what the player has found out about each of them. */
export default function ContactsApp({ game, onClose }: Readonly<ContactsAppProps>) {
  const people = knownCharacters(game)
  const [openId, setOpenId] = useState<Id | null>(null)
  const open = people.find((p) => p.character.id === openId)

  if (open) {
    const { character, name, facts } = open
    return (
      <AppScreen title="Névjegy" onBack={() => setOpenId(null)} backLabel="Vissza a névjegyekhez">
        <article className={styles.card}>
          <span className={styles.bigAvatar} aria-hidden="true">
            {initials(name) || '?'}
          </span>
          <h2 className={styles.name}>{name}</h2>
          <dl className={styles.roles}>
            {character.roleThen && (
              <>
                <dt>2001-ben</dt>
                <dd>{character.roleThen}</dd>
              </>
            )}
            {character.roleNow && (
              <>
                <dt>Ma</dt>
                <dd>{character.roleNow}</dd>
              </>
            )}
          </dl>
          <h3 className={styles.factsTitle}>Amit tudok róla</h3>
          {facts.length === 0 ? (
            <p className={styles.empty}>Még semmi.</p>
          ) : (
            <ul className={styles.facts}>
              {facts.map((fact) => (
                <li key={fact.id}>{fact.text}</li>
              ))}
            </ul>
          )}
        </article>
      </AppScreen>
    )
  }

  return (
    <AppScreen title="Névjegyek" onBack={onClose} backLabel="Vissza a kezdőképernyőre">
      {people.length === 0 ? (
        <p className={styles.empty}>Nincsenek névjegyek.</p>
      ) : (
        <ul className={styles.list}>
          {people.map(({ character, name, facts }) => (
            <li key={character.id}>
              <button type="button" className={styles.row} onClick={() => setOpenId(character.id)}>
                <span className={styles.avatar} aria-hidden="true">
                  {initials(name) || '?'}
                </span>
                <span className={styles.rowText}>
                  <span className={styles.rowName}>{name}</span>
                  <span className={styles.rowRole}>{character.roleNow ?? character.roleThen ?? ''}</span>
                </span>
                <span className={styles.count} aria-label={`${facts.length} tény`}>
                  {facts.length}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </AppScreen>
  )
}
