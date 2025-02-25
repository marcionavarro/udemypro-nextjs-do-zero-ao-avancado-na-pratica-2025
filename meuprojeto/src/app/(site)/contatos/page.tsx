import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contato - Aprendendo NextJS",
  description: "Entre em contato com desenvolvedor fullstack",
  keywords: ['Html', "CSS", "JavaScript", "Programação"],
  openGraph: {
    images: ['Image do site'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true
    }
  }
};

export default function Contatos() {
    return (
      <main>
        <h1>Página Contatos</h1>
        <span>(xx) 98888-7777</span>
      </main>
    );
  }