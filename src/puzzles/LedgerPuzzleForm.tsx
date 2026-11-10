import { useId, useState } from 'react'
import type { Id, LedgerPuzzle } from '../story/types'
import { isCorrectAnswer } from './answer'
import styles from './Deduction.module.css'

const money = new Intl.NumberFormat('hu-HU')
const ft = (n: number) => money.format(n)

/** Income as "+86 000", expense as "−54 000", nothing for balance-only rows. The unit is in the header. */
function amount(income?: number, expense?: number): string {
  if (income) return `+${ft(income)}`
  if (expense) return `−${ft(expense)}`
  return ''
}

interface LedgerPuzzleFormProps {
  puzzle: LedgerPuzzle
  onSolved: () => void
}

/** A cash book table; the player marks the row whose balance does not add up. */
export default function LedgerPuzzleForm({ puzzle, onSolved }: Readonly<LedgerPuzzleFormProps>) {
  const name = useId()
  const [marked, setMarked] = useState<Id | null>(null)
  const [checking, setChecking] = useState(false)
  const [wrong, setWrong] = useState(false)

  const check = async () => {
    if (!marked || checking) return
    setChecking(true)
    const correct = await isCorrectAnswer(marked, puzzle.answerHash)
    setChecking(false)
    if (correct) {
      onSolved()
    } else {
      setWrong(false)
      requestAnimationFrame(() => setWrong(true))
    }
  }

  return (
    <div className={styles.form}>
      <p className={styles.prompt}>{puzzle.prompt}</p>
      <fieldset className={styles.ledger}>
        <legend className={styles.ledgerCaption}>{puzzle.caption}</legend>
        <div className={styles.ledgerScroll}>
          <table className={styles.ledgerTable}>
            <thead>
              <tr>
                <th scope="col">
                  <span className="visually-hidden">Hibás sor</span>
                </th>
                <th scope="col">Dátum</th>
                <th scope="col">Tétel</th>
                <th scope="col">Összeg (Ft)</th>
                <th scope="col">Egyenleg (Ft)</th>
                <th scope="col">Szignó</th>
              </tr>
            </thead>
            <tbody>
              {puzzle.rows.map((row) => (
                <tr key={row.id} data-marked={marked === row.id}>
                  <td>
                    <input
                      type="radio"
                      name={name}
                      checked={marked === row.id}
                      onChange={() => {
                        setWrong(false)
                        setMarked(row.id)
                      }}
                      aria-label={`${row.date}, ${row.text}`}
                    />
                  </td>
                  <td>{row.date}</td>
                  <td className={styles.wrap}>{row.text}</td>
                  <td className={styles.num}>{amount(row.income, row.expense)}</td>
                  <td className={styles.num}>{ft(row.balance)}</td>
                  <td>{row.signed}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {puzzle.note && <p className={styles.ledgerNote}>{puzzle.note}</p>}
        </div>
      </fieldset>
      <button type="button" className={styles.primary} disabled={!marked || checking} onClick={check}>
        Megjelölés
      </button>
      <output className={styles.feedback}>{wrong ? 'Ebben a sorban stimmel a számítás.' : ''}</output>
    </div>
  )
}
