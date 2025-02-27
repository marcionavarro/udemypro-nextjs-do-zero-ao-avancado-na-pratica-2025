import { Container } from "@/components/container";
import Image from "next/image";
import userImg from '@/../public/user.png'
import { FaShareAlt } from "react-icons/fa";
import { FavoriteCard } from "./componentes/favorite";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meu perfil Daly Games sua plataforma de jogos!",
  description: "Perfil Desenvolvedor Fullstack | Daly Games sua plataforma de jogos!"
}

export default function Profile() {
  return (
    <main className="w-full text-black">
      <Container>
        <section className="mt-8 mb-6 flex flex-col items-center justify-between relative gap-3 sm:flex-row">
          <div className="w-full flex items-center gap-4 text-lg flex-col sm:flex-row justify-center sm:justify-normal">
            <Image
              src={userImg}
              alt="Imagem perfil do usuário"
              className="rounded-full w-56 h-56 object-covers"
            />

            <h1 className="font-bold text-2xl">Desenvolvedor Fullstack</h1>
          </div>

          <div className="sm:absolute top-0 right-0 gap-3 flex items-center justify-center">
            <button className="bg-gray-700 px-4 py-3 rounded-lg text-white hover:text-gray-700 transition duration-300 ease-in-out  hover:bg-white cursor-pointer">Configurações</button>
            <button className="bg-gray-700 px-4 py-3 rounded-lg cursor-pointer"><FaShareAlt size={24} color="#fff" /></button>
          </div>
        </section>

        <section className="flex flex-wrap gap-5 flex-col md:flex-row">
          <div className="flex-grow flex-wrap">
            <FavoriteCard />
          </div>
          <div className="flex-grow flex-wrap">
            <FavoriteCard />
          </div>
          <div className="flex-grow flex-wrap">
            <FavoriteCard />
          </div>
        </section>
      </Container>
    </main>
  )
}