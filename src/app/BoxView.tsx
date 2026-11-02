import type { BoxItem, DocumentBlock } from '../story/types'
import AppScreen from './AppScreen'
import styles from './BoxView.module.css'

function Block({ block }: Readonly<{ block: DocumentBlock }>) {
  if (block.type === 'text') {
    return <p className={block.script === 'rovas' ? styles.rovas : styles.handwriting}>{block.text}</p>
  }
  return (
    <ul className={styles.glyphTable}>
      {block.entries.map(([latin, glyph]) => (
        <li key={latin} className={styles.glyphCell}>
          <span className={styles.glyph} aria-hidden="true">
            {glyph}
          </span>
          <span className={styles.latin}>{latin}</span>
        </li>
      ))}
    </ul>
  )
}

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
            {item.blocks.map((block, i) => (
              // Blocks are static data, so their order never changes.
              <Block key={i} block={block} />
            ))}
          </article>
        ))}
      </div>
    </AppScreen>
  )
}
