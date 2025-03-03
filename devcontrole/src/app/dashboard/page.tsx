import { Container } from "@/components/container";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from "next/navigation";
import { TicketItem } from "./components/ticket";
import { Main } from "@/components/main";
import { SubHeader } from "@/components/subheader";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect('/')
  }

  return (
    <Container>
      <Main>
        <SubHeader
          title='Chamados'
          linkTitle='Abrir chamado'
          link='/dashboard/new'
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
            <TicketItem />
            <TicketItem />
          </tbody>
        </table>
      </Main>
    </Container>
  )
}