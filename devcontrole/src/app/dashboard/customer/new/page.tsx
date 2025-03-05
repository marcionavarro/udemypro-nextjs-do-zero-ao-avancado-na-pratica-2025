import { Container } from "@/components/container";
import { Main } from "@/components/main";
import { SubHeader } from "@/components/subheader";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { NewCustomerForm } from "../components/form";

export default async function NewCustomer() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect('/')
  }

  return (
    <Container>
      <Main>
        <SubHeader
          title="Novo Cliente"
          linkTitle="Voltar"
          link="/dashboard"
        />

        <NewCustomerForm userId={session.user.id}/>
      </Main>
    </Container>
  )
}