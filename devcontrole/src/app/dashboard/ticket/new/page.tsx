import { Container } from "@/components/container";
import { Main } from "@/components/main";
import { SubHeader } from "@/components/subheader";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import prismaClient from '@/lib/prisma';

export default async function NewTicket() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect('/')
  }

  const customers = await prismaClient.customer.findMany({
    where: {
      userId: session.user.id
    }
  })

  async function handleRegisterTicket(formData: FormData) {
    'use server'

    const name = formData.get("name");
    const description = formData.get("description");
    const customerId = formData.get("customer");

    if (!name || !description || !customerId) return;

    await prismaClient.ticket.create({
      data: {
        name: name as string,
        description: description as string,
        customerId: customerId as string,
        status: 'ABERTO',
        userId: session?.user.id
      }
    });

    redirect("/dashboard")
  }

  return (
    <Container>
      <Main>
        {customers.length <= 0 ? (
          <SubHeader
            title='Voçê ainda não tem nenhum cliente'
            linkTitle='Cadastrar Cliente'
            link='/dashboard/customer/new'
          />
        ) : (
          <>
            <SubHeader
              title='Novo Chamado'
              linkTitle='voltar'
              link='/dashboard'
            />

            <form className="flex flex-col" action={handleRegisterTicket}>
              <label className="inline-block mb-1 font-medium text-lg">Nome do chamado</label>
              <input
                className="w-full border-2 border-gray-200 rounded-md px-2 mb-4 h-11"
                type="text"
                name="name"
                placeholder="Digite o nome do chamado"
                required
              />

              <label className="inline-block mb-1 font-medium text-lg">Escreva o problema:</label>
              <textarea
                className="w-full border-2 border-gray-200 rounded-md px-2 mb-4 h-24 resize-none"
                name="description"
                placeholder="Descreva o problema..."
                required
              ></textarea>

              <label className="inline-block mb-1 font-medium text-lg">Selecione o cliente</label>
              <select
                className="w-full border-2 border-gray-200 rounded-md px-2 mb-4 h-11 bg-white"
                name="customer"
              >
                {customers.map(customer => (
                  <option key={customer.id} value={customer.id}>{customer.name}</option>
                ))}
              </select>

              <button
                type="submit"
                className="sm:w-2xs bg-blue-500 my-4 px-2 h-11 rounded text-white font-bold hover:bg-blue-700 transition-all duration-150 cursor-pointer"
              >
                Cadastrar
              </button>
            </form>
          </>
        )}
      </Main>
    </Container>
  )
}