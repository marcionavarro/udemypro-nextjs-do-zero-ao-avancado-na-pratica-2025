import { Container } from "@/componentes/Container";
import { Hero } from "@/componentes/hero";
import { Services } from "@/componentes/home/services";
import { Submenu } from "@/componentes/home/submenu";
import { getDataHome } from "@/utils/actions/getData";
import { HomeProps } from "@/utils/home.type";
import { Phone } from "lucide-react";

export default async function Home() {
  const { object }: HomeProps = await getDataHome()

  return (
    <main>
      <Submenu />
      <Hero
        heading={object.metadata.heading}
        buttonTitle={object.metadata.cta_button.title}
        buttonUrl={object.metadata.cta_button.url}
        bannerUrl={object.metadata.banner.url}
        icon={<Phone size={24} color="#fff" />}
      />
      <Container>
        <Services object={object}/>
      </Container>
    </main>
  );
}
