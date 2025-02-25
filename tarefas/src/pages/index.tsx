import Head from "next/head";
import styles from "@/styles/home.module.css";
import Image from "next/image";
import heroImg from "./../../public/assets/hero.png";
import { GetStaticProps } from "next";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/services/firebaseConnection";

interface HomeProps {
  posts: number;
  comments: number;
}

export default function Home({posts, comments}: HomeProps) {
  return (
    <>
      <Head>
        <title>Tarefas+ | Organize suas tarefas de forma fácil</title>
      </Head>
      <main className={styles.container}>
        <div className={styles.logoContent}>
          <Image
            className={styles.hero}
            alt="Logo Tarefas+"
            src={heroImg}
            priority
          />
        </div>
        <h1 className={styles.title}>
          Sistema feito para você organizar <br />
          seus estudos e tarefas
        </h1>

        <div className={styles.infoContent}>
          <section className={styles.box}>
            <span>+{posts} posts</span>
          </section>
          <section className={styles.box}>
            <span>+{comments} comentários</span>
          </section>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const postRef = collection(db, "tarefas");
  const commentRef = collection(db, "comments");

  const postSnapShot = await getDocs(postRef);
  const commentSnapsShot = await getDocs(commentRef);

  return {
    props: {
      posts: postSnapShot.size || 0,
      comments: commentSnapsShot.size || 0
    },
    revalidate: 60 // seria revalidada a cada 60seg
  }
}