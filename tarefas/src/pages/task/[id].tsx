import Head from 'next/head';
import styles from './styles.module.css';
import { GetServerSideProps } from 'next';
import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import { db } from '@/services/firebaseConnection';
import { Textarea } from '@/components/textarea';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useSession } from 'next-auth/react';

interface TaskProps {
  item: {
    taskId: string,
    user: string,
    tarefa: string,
    public: boolean,
    created: string
  }
}

export default function Task({ item }: TaskProps) {
  const { data: session } = useSession();
  const [input, setInput] = useState('');

  async function handleComment(event: FormEvent) {
    event.preventDefault();

    if(input === "") return;
    if(!session?.user?.email || !session?.user?.name) return;

    try {
      const docRef = await addDoc(collection(db, "comments"), {
        comment: input,
        created: new Date(),
        user: session?.user?.email,
        name: session?.user?.name,
        taskId: item?.taskId
      });

      setInput("");
    } catch (error) {
      console.log("Error:", error)
    }
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Tarefa - Detalhes da tarefa</title>
      </Head>

      <main className={styles.main}>
        <h1>Tarefa</h1>
        <article className={styles.task}>
          <p>{item.tarefa}</p>
        </article>
      </main>

      <section className={styles.commentsContainer}>
        <h2>Deixar comentário</h2>
        <form onSubmit={handleComment}>
          <Textarea
            value={input}
            onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
              setInput(event.target.value)
            }
            placeholder='Digite seu comentário'
          />
          <button
            disabled={!session?.user}
            className={styles.button}
          >
            Enviar comentário
          </button>
        </form>
      </section>

    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id as string;

  const docRef = doc(db, "tarefas", id);
  const snapsShot = await getDoc(docRef);

  if (snapsShot.data() === undefined) {
    return returnRedirect();
  }

  if (!snapsShot.data()?.public) {
    return returnRedirect();
  }

  const miliseconds = snapsShot.data()?.created.seconds * 1000;
  const task = {
    taskId: id,
    user: snapsShot.data()?.user,
    tarefa: snapsShot.data()?.tarefa,
    public: snapsShot.data()?.public,
    created: new Date(miliseconds).toDateString()
  }

  return {
    props: {
      item: task,
    }
  }
}

function returnRedirect() {
  return {
    redirect: {
      destination: "/",
      permanent: false,
    }
  }
}