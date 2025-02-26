import { GameProps } from "@/utils/types/game"
import Image from "next/image"
import Link from "next/link"
import { BiRightArrowCircle } from "react-icons/bi"

interface GameCardProps {
  data: GameProps
}

export function GameCard({ data }: GameCardProps) {
  return (
    <section className="w-full bg-slate-200 rounded-lg p-3 mb-5 hover:bg-slate-300 transition-all delay-200">
      <div className="relative w-ful h-56 hover:scale-105 transition-all delay-200">
        <Link href={`/game/${data.id}`}>
          <Image
            className="rounded-lg object-cover"
            src={data.image_url}
            alt={data.title}
            fill={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 44vw"
          />
        </Link>
      </div>

      <div className="flex justify-between items-center mt-4">
        <p className="text-sm font-bold px-2 text-black text-ellipsis truncate whitespace-nowrap overflow-hidden">
          <Link href={`/game/${data.id}`} className="hover:text-white transition-all delay-200">
            {data.title}
          </Link>
        </p>
        <Link href={`/game/${data.id}`}>
          <BiRightArrowCircle size={24} color="#000" />
        </Link>
      </div>
    </section>
  )
}