import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Painel - Dashboard",
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

export default function Dashboard() {
  return (
    <div>
      <h1>Página painel</h1>
      <span>Bem vindo ao painel do site</span>
    </div>
  )
}