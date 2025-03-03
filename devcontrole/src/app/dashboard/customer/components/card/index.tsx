export function CardCustomer() {
  return (
    <article className="flex flex-col bg-gray-100 bordr-2 p-2 rounded-lg gap-2 hover:scale-90 duration-300">
      <h2>
        <a className="font-bold">Nome:</a> Mercado silva
      </h2>
      <p><a className="font-bold">Email:</a> teste@teste.com</p>
      <p><a className="font-bold">Telefone:</a> XX XXXXX-XXXX</p>
      <button className="bg-red-500 px-4 rounded text-white mt-2 self-start">
        Deletar
      </button>
    </article>
  )
}