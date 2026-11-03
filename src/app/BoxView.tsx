import type { BoxItem } from '../story/types'
import AppScreen from './AppScreen'
import DocumentBlocks from './DocumentBlocks'
import styles from './BoxView.module.css'

/** The physical items that came with the phone. */
export default function BoxView({ items, onBack }: Readonly<{ items: BoxItem[]; onBack: () => void }>) {
  return (
    <AppScreen title="A doboz" onBack={onBack} backLabel="Vissza a zárolt telefonhoz">
      <div className={styles.items}>
        {items.map((item) => (
          <article key={item.id} className={styles.item} aria-labelledby={`${item.id}-title`}>
            <h2 id={`${item.id}-title`} className={styles.itemTitle}>
              {item.title}
            </h2>
            <DocumentBlocks blocks={item.blocks} textStyle="handwriting" />
          </article>
        ))}
      </div>
    </AppScreen>
  )
}
