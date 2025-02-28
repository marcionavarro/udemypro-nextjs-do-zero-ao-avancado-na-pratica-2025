import { Container } from "@/componentes/Container";
import { Hero } from "@/componentes/hero";
import { Footer } from "@/componentes/home/footer";
import { Services } from "@/componentes/home/services";
import { Submenu } from "@/componentes/home/submenu";
import { getDataHome, getSubMenu } from "@/utils/actions/getData";
import { MenuProps } from "@/utils/actions/menu.type";
import { HomeProps } from "@/utils/home.type";
import { Phone } from "lucide-react";

export default async function Home() {
  const { object }: HomeProps = await getDataHome()
  const menu: MenuProps = await getSubMenu()

  return (
    <main>
      {menu.objects.length > 0 && <Submenu menu={menu} />}
      <Hero
        heading={object.metadata.heading}
        buttonTitle={object.metadata.cta_button.title}
        buttonUrl={object.metadata.cta_button.url}
        bannerUrl={object.metadata.banner.url}
        icon={<Phone size={24} color="#fff" />}
      />
      <Container>
        <Services object={object}/>
        <Footer object={object}/>
      </Container>


    </main>
  );
}
