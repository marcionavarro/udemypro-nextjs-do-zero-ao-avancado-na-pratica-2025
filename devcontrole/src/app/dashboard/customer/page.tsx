import { Container } from "@/components/container";
import { Main } from "@/components/main";
import { SubHeader } from "@/components/subheader";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { CardCustomer } from "./components/card";
import PrismaClient from "@/lib/prisma";

export default async function Customer() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect('/')
  }

  const customers = await PrismaClient.customer.findMany({
    where: {
      userId: session.user.id
    }
  })

  return (
    <Container>
      <Main>
        <SubHeader
          title={customers.length > 0 ? 'Meus clientes' : 'Não existem clientes cadastrados'}
          linkTitle='Novo cliente'
          link='/dashboard/customer/new'
        />
      </Main>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {customers.map(customer => (
          <CardCustomer
            key={customer.id}
            customer={customer}
          />
        ))}

      </section>
    </Container>
  )
}