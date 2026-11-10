import { useEffect, useId, useState, type Dispatch, type SubmitEvent } from 'react'
import { normalizeAnswer } from '../../puzzles/answer'
import type { SocialHomePage, SocialPage, WebPage } from '../../story/types'
import type { GameAction } from '../../state/gameState'
import { initials } from './SocialPageView'
import { normalizeUrl } from './url'
import styles from './Social.module.css'

/** The social pages that belong to this network, i.e. live under its address. */
export function networkPages(home: SocialHomePage, pages: WebPage[]): SocialPage[] {
  const prefix = `${normalizeUrl(home.url)}/`
  return pages.filter((p): p is SocialPage => p.kind === 'social' && normalizeUrl(p.url).startsWith(prefix))
}

/** Profiles whose name contains the query, ignoring case, accents and spaces. Needs at least 3 letters. */
export function searchProfiles(profiles: SocialPage[], query: string): SocialPage[] {
  const q = normalizeAnswer(query)
  if (q.length < 3) return []
  return profiles.filter((p) => normalizeAnswer(p.name).includes(q))
}

interface SocialHomeViewProps {
  page: SocialHomePage
  pages: WebPage[]
  dispatch: Dispatch<GameAction>
  onNavigate: (url: string) => void
}

export default function SocialHomeView({ page, pages, dispatch, onNavigate }: Readonly<SocialHomeViewProps>) {
  const searchId = useId()
  const [query, setQuery] = useState('')
  const [submitted, setSubmitted] = useState<string | null>(null)
  const profiles = networkPages(page, pages)
  const listed = profiles.filter((p) => p.profileType !== 'person')
  const results = submitted === null ? [] : searchProfiles(profiles, submitted)

  useEffect(() => dispatch({ type: 'visitPage', page: page.id }), [dispatch, page.id])

  const submit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitted(query)
  }

  const profileList = (items: SocialPage[]) => (
    <ul className={styles.profileList}>
      {items.map((p) => (
        <li key={p.id}>
          <button type="button" className={styles.profileRow} onClick={() => onNavigate(p.url)}>
            <span className={styles.smallAvatar} data-type={p.profileType} aria-hidden="true">
              {initials(p.name)}
            </span>
            <span className={styles.profileRowText}>
              <span className={styles.profileRowName}>{p.name}</span>
              {p.about && <span className={styles.profileRowAbout}>{p.about}</span>}
            </span>
          </button>
        </li>
      ))}
    </ul>
  )

  return (
    <div className={styles.social}>
      <h2 className={styles.homeTitle}>{page.title}</h2>
      {page.intro && <p className={styles.about}>{page.intro}</p>}
      <form className={styles.search} onSubmit={submit} role="search">
        <label htmlFor={searchId} className="visually-hidden">
          Keresés emberek, csoportok és oldalak között
        </label>
        <input
          id={searchId}
          className={styles.searchInput}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Keresés: név, csoport, oldal"
          autoComplete="off"
        />
        <button type="submit" className={styles.searchButton}>
          Keresés
        </button>
      </form>
      {submitted !== null && (
        <section aria-live="polite">
          <h3 className={styles.sectionTitle}>Találatok</h3>
          {results.length === 0 ? (
            <p className={styles.muted}>
              {normalizeAnswer(submitted).length < 3 ? 'Írj be legalább három betűt.' : 'Nincs találat.'}
            </p>
          ) : (
            profileList(results)
          )}
        </section>
      )}
      {listed.length > 0 && (
        <section>
          <h3 className={styles.sectionTitle}>Csoportok és oldalak</h3>
          {profileList(listed)}
        </section>
      )}
    </div>
  )
}
