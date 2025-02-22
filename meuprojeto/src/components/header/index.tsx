import Link from "next/link";
import styles from './header.module.css'

export function Header() {
  return (
    <header className={styles.header}>
      <h1>Meu Site</h1>
      <Link href="/">Home</Link>
      <Link href="/contatos">Contatos</Link>
    </header>
  )
}