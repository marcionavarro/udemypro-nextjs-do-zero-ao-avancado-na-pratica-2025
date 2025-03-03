import { Container } from "@/components/container";
import { Main } from "@/components/main";
import { SubHeader } from "@/components/subheader";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { CardCustomer } from "./components/card";

export default async function Customer() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect('/')
  }

  return (
    <Container>
      <Main>
        <SubHeader
          title='Meus clientes'
          linkTitle='Novo cliente'
          link='/dashboard/customer/new'
        />
      </Main>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <CardCustomer />
        <CardCustomer />
        <CardCustomer />
      </section>
    </Container>
  )
}