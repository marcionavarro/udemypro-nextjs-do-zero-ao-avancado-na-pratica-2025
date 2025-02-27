import { Container } from "@/components/container"
import { GameCard } from "@/components/game-card"
import { Label } from "@/components/label"
import { GameProps } from "@/utils/types/game"
import { Metadata } from "next"
import Image from "next/image"
import { redirect } from "next/navigation"

interface PropsParams {
  params: Promise<{
    id: string
  }>
}

export async function generateMetadata(props: PropsParams): Promise<Metadata> {
  const params = await props.params;
  try {
    const response: GameProps = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&id=${params.id}`, {
      next: { revalidate: 60 }
    })
      .then(res => res.json())
      .catch(() => {
        return {
          title: "DalyGames - Descubra jogos incríveis para se divertir."
        }
      })
    return {
      title: response.title,
      description: `${response.description.slice(0, 100)}...`,
      openGraph: {
        title: response.title,
        images: [response.image_url]
      },
      robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
          index: true,
          follow: true,
          noimageindex: true
        }
      }
    }
  } catch (error) {
    return {
      title: "DalyGames - Descubra jogos incríveis para se divertir."
    }
  }
}

async function getData(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game&id=${id}`, {
      next: { revalidate: 60 }
    })
    return res.json()
  } catch (error) {
    throw new Error("Failed to fetch data")
  }
}

async function getGamesSorted() {
  try {
    const res = await fetch(`${process.env.NEXT_API_URL}/next-api/?api=game_day`, {
      cache: "no-store"
    })
    return res.json()
  } catch (error) {
    throw new Error("Failed to fetch data")
  }
}

export default async function Game(
  props: {
    params: Promise<{ id: string }>
  }
) {
  const params = await props.params;

  const {
    id
  } = params;

  const data: GameProps = await getData(id)
  const sortedGame: GameProps = await getGamesSorted()

  if (!data) {
    redirect("/")
  }

  return (
    <main className="w-full text-black">
      <div className="bg-black h-80 sm:h-96 w-full relative">
        <Image
          className="rounded-lg object-cover h-80 sm:h-96 opacity-75"
          src={data.image_url}
          alt={data.title}
          fill={true}
          quality={100}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 44vw"
        />
      </div>

      <Container>
        <h1 className="font-bold text-xl my-4">{data.title}</h1>
        <p>{data.description}</p>

        <h2 className="font-bold text-lg mt-7 mb-2">Plataformas</h2>
        <div className="flex gap-2 flex-wrap">
          {data.platforms.map(item => (
            <Label key={item} name={item} />
          ))}
        </div>

        <h2 className="font-bold text-lg mt-7 mb-2">Categorias</h2>
        <div className="flex gap-2 flex-wrap">
          {data.categories.map(item => (
            <Label key={item} name={item} />
          ))}
        </div>

        <p className="mt-7 mb-2"><strong>Data de lançamento</strong> {data.release}</p>

        <h2 className="font-bold text-lg mt-7 mb-2">Jogo recomendado:</h2>
        <div className="flex">
          <div className="flex-grow">
            <GameCard data={sortedGame} />
          </div>
        </div>
      </Container>
    </main>
  )
}