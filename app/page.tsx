import styles from './page.module.css'
import Link from 'next/link'

export default function TodoList() {
  return (
    <main className={styles.main}>
       <h1 className={styles.title}>  Главная страница </h1>
       <Link href="/todo" className={styles.link}> Перейти в тудулист</Link>
    </main>
  )
}