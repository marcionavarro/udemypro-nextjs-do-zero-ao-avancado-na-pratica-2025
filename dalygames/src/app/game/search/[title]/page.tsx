import { Container } from "@/components/container"
import { GameCard } from "@/components/game-card"
import { Input } from "@/components/input"
import { GameProps } from "@/utils/types/game"

async function getData(title: string) {
  try {
    const decodeTitle = decodeURI(title)
    const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&title=${decodeTitle}`)
    return res.json()
  } catch (error) {
    return null
  }
}

export default async function Search({
  params: { title }
}: {
  params: { title: string }
}) {
  const games: GameProps[] = await getData(title)

  return (
    <main>
      <Container>
        <Input />

        <h1 className="font-bold text-xl mt-7 mb-5">Veja o que encontramos em nossa base:</h1>

        {!games && (
          <p>Esse jogo não foi encontrado!...</p>
        )}

        <section className="grid gap-7 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {games && games.map(game => (
            <GameCard key={game.id} data={game} />
          ))}
        </section>
      </Container>
    </main>
  )
}