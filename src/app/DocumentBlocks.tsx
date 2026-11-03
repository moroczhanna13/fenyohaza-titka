import type { DocumentBlock } from '../story/types'
import styles from './DocumentBlocks.module.css'

interface DocumentBlocksProps {
  blocks: DocumentBlock[]
  /** 'handwriting' for notes and paper items, 'plain' for web pages. */
  textStyle?: 'handwriting' | 'plain'
}

/** Renders story documents: text (optionally in rovás), headings, key tables and data tables. */
export default function DocumentBlocks({ blocks, textStyle = 'plain' }: Readonly<DocumentBlocksProps>) {
  return (
    <>
      {blocks.map((block, i) => {
        // Blocks are static data, so their order never changes.
        const key = i
        switch (block.type) {
          case 'text':
            return (
              <p key={key} className={block.script === 'rovas' ? styles.rovas : styles[textStyle]}>
                {block.text}
              </p>
            )
          case 'heading':
            return (
              <h3 key={key} className={styles.heading}>
                {block.text}
              </h3>
            )
          case 'glyphTable':
            return (
              <ul key={key} className={styles.glyphTable}>
                {block.entries.map(([latin, glyph]) => (
                  <li key={latin} className={styles.glyphCell}>
                    <span className={styles.glyph}>{glyph}</span>
                    <span className={styles.latin}>{latin}</span>
                  </li>
                ))}
              </ul>
            )
          case 'table':
            return (
              <div key={key} className={styles.tableWrap}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      {block.headers.map((h) => (
                        <th key={h} scope="col">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row) => (
                      <tr key={row.join('|')}>
                        {row.map((cell, c) => (
                          // Cells are positional.
                          <td key={c}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
        }
      })}
    </>
  )
}
