import Link from 'next/link'
import styles from './styles.module.scss'
import { X, Menu } from 'lucide-react'

export function Submenu() {
  return (
    <section className={styles.submenu}>
      <div className={styles.submenuIcon}>
        <Menu size={34} color='#121212' />
        Menu
      </div>

      <ul className={styles.ul}>
        <li>
          <Link href="/post/pagina-1">
            Pagina 1
          </Link>
        </li>
        <li>
          <Link href="/post/pagina-2">
            Pagina 2
          </Link>
        </li>
      </ul>
    </section>
  )
}