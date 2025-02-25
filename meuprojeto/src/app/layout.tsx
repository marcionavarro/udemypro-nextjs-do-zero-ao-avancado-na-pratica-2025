import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header";


export const metadata: Metadata = {
  title: "Meu Site - Aprendendo NextJS",
  description: "Desenvolvedor Fullstack para seus projetos",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
