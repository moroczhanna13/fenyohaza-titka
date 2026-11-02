import PhoneFrame from './PhoneFrame'
import styles from './App.module.css'

export default function App() {
  return (
    <PhoneFrame>
      <main className={styles.placeholder}>
        <h1 className={styles.title}>Fenyőháza titka</h1>
      </main>
    </PhoneFrame>
  )
}
