import { useEffect, type Dispatch } from 'react'
import DocumentBlocks from '../../app/DocumentBlocks'
import type { StaticPage } from '../../story/types'
import type { GameAction } from '../../state/gameState'
import styles from './Pages.module.css'

interface StaticPageViewProps {
  page: StaticPage
  dispatch: Dispatch<GameAction>
  onNavigate: (url: string) => void
}

export default function StaticPageView({ page, dispatch, onNavigate }: Readonly<StaticPageViewProps>) {
  useEffect(() => dispatch({ type: 'visitPage', page: page.id }), [dispatch, page.id])

  return (
    <div className={styles.site}>
      <h2 className={styles.siteTitle}>{page.title}</h2>
      {page.intro && <p className={styles.intro}>{page.intro}</p>}
      <DocumentBlocks blocks={page.blocks} onNavigate={onNavigate} />
    </div>
  )
}
