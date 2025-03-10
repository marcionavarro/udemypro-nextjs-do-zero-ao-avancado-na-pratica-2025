import { OwnerRepo } from "@/components/owner-repo"
import styles from './styles.module.css'

interface DataProps {
  id: number
  name: string
  full_name: string
  owner: {
    login: string
    id: number
    avatar_url: string
    url: string
  }
}

async function delayFetch(url: string, delay: number) {
  await new Promise(resolve => setTimeout(resolve, delay))
  const response = await fetch(url, { next: { revalidate: 120 }})
  return response.json()
}

async function getData() {
  /* const response = await fetch('https://api.github.com/users/marcionavarro/repos')
  return response.json() */
  const data = await delayFetch('https://api.github.com/users/marcionavarro/repos', 0)
  return data
}

export default async function Home() {
  const data: DataProps[] = await getData()

  return (
    <main>
      <h1>Página Home</h1>
      <span>Seja bem vindo a página home</span>
      <br />

      <h3>Meus repostitorios</h3>
      {data.map(item => (
        <div key={item.id} className={styles.itemRepo}>
          <strong>Repositório: </strong><a>{item.name}</a>
          <br />
          <OwnerRepo 
            avatar_url={item.owner.avatar_url}
            name={item.owner.login}
          />
          <br />
        </div>
      ))}
    </main>
  );
}