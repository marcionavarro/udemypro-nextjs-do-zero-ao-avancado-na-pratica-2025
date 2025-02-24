import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h2>Pagina não encontrada</h2>
      <p>Parece que essa pagina que está tentando acessar não existe!</p>
      <Link href='/'>Voltar para home</Link>
    </div>
  ) 
}