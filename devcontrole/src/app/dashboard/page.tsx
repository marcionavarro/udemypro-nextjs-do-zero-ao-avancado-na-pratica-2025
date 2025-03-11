import { Container } from "@/components/container";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from "next/navigation";
import { TicketItem } from "./components/ticket";
import { Main } from "@/components/main";
import { SubHeader } from "@/components/subheader";
import prismaClient from '@/lib/prisma';

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect('/')
  }

  const tickets = await prismaClient.ticket.findMany({
    where: {
      status: "ABERTO",
      customer: {
        userId: session.user.id
      }
    },
    include: {
      customer: true
    },
    orderBy: {
      created_at: "desc"
    }
  })

  return (
    <Container>
      <Main>
        {tickets.length <= 0 ? (
          <SubHeader
            title='Não existem chamados abertos'
            linkTitle='Abrir chamado'
            link='/dashboard/ticket/new'
          />
        ) : (
          <>
            <SubHeader
              title='Chamados Abertos'
              linkTitle='Abrir chamado'
              link='/dashboard/ticket/new'
            />

            <table className="min-w-full my-2">
              <thead>
                <tr>
                  <th className="font-medium text-left pl-1">CLIENTE</th>
                  <th className="font-medium text-left hidden sm:block">CADASTRO</th>
                  <th className="font-medium text-left">STATUS</th>
                  <th className="font-medium text-left">#</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map(ticket => (
                  <TicketItem
                    key={ticket.id}
                    customer={ticket?.customer}
                    ticket={ticket} />
                ))}
              </tbody>
            </table>
          </>
        )}
      </Main>
    </Container >
  )
}