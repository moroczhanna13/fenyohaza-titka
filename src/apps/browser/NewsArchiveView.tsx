import { useEffect, useId, useState, type Dispatch, type SubmitEvent } from 'react'
import type { NewsArchivePage, NewsArticle } from '../../story/types'
import type { GameAction } from '../../state/gameState'
import styles from './Pages.module.css'

const longDate = new Intl.DateTimeFormat('hu-HU', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })
const DAY_MS = 24 * 60 * 60 * 1000

/** "2001-07-23" → "2001. július 23." */
export function formatIssueDate(date: string): string {
  return longDate.format(new Date(`${date}T00:00:00Z`))
}

/** Articles published on `date` or up to `days` days after it, oldest first. */
export function searchArticles(articles: NewsArticle[], date: string, days: number): NewsArticle[] {
  const from = Date.parse(`${date}T00:00:00Z`)
  if (Number.isNaN(from)) return []
  const to = from + days * DAY_MS
  return articles
    .filter((a) => {
      const t = Date.parse(`${a.date}T00:00:00Z`)
      return t >= from && t <= to
    })
    .sort((a, b) => a.date.localeCompare(b.date))
}

interface NewsArchiveViewProps {
  page: NewsArchivePage
  dispatch: Dispatch<GameAction>
}

export default function NewsArchiveView({ page, dispatch }: Readonly<NewsArchiveViewProps>) {
  const dateId = useId()
  const [date, setDate] = useState('')
  const [results, setResults] = useState<NewsArticle[] | null>(null)
  const [article, setArticle] = useState<NewsArticle | null>(null)

  useEffect(() => dispatch({ type: 'visitPage', page: page.id }), [dispatch, page.id])
  useEffect(() => {
    if (article) dispatch({ type: 'visitPage', page: article.id })
  }, [dispatch, article])

  if (article) {
    return (
      <article className={styles.paper}>
        <button type="button" className={styles.backLink} onClick={() => setArticle(null)}>
          ‹ Vissza a találatokhoz
        </button>
        <p className={styles.masthead}>{page.title}</p>
        <h2 className={styles.headline}>{article.title}</h2>
        <p className={styles.dateline}>
          {formatIssueDate(article.date)}
          {article.author && ` · ${article.author}`}
        </p>
        {article.body.map((p) => (
          <p key={p} className={styles.bodyText}>
            {p}
          </p>
        ))}
      </article>
    )
  }

  const search = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    setResults(searchArticles(page.articles, date, page.searchDays))
  }

  return (
    <div className={styles.paper}>
      <h2 className={styles.masthead}>{page.title}</h2>
      {page.intro && <p className={styles.intro}>{page.intro}</p>}
      <form className={styles.searchForm} onSubmit={search}>
        <label htmlFor={dateId} className={styles.label}>
          Lapszám dátuma
        </label>
        <div className={styles.searchRow}>
          <input
            id={dateId}
            type="date"
            className={styles.input}
            value={date}
            min="1990-01-01"
            max="2026-12-31"
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <button type="submit" className={styles.button}>
            Keresés
          </button>
        </div>
      </form>
      <div aria-live="polite">
        {results &&
          (results.length === 0 ? (
            <p className={styles.noResults}>Erre az időszakra nincs találat.</p>
          ) : (
            <>
              <p className={styles.resultCount}>{results.length} találat</p>
              <ul className={styles.results}>
                {results.map((a) => (
                  <li key={a.id}>
                    <button type="button" className={styles.result} onClick={() => setArticle(a)}>
                      <span className={styles.resultDate}>{formatIssueDate(a.date)}</span>
                      <span className={styles.resultTitle}>{a.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </>
          ))}
      </div>
    </div>
  )
}
