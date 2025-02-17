import Head from 'next/head';
import styles from './styles.module.css';
import { GetServerSideProps } from 'next';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { db } from '@/services/firebaseConnection';
import { Textarea } from '@/components/textarea';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useSession } from 'next-auth/react';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface TaskProps {
  item: {
    taskId: string;
    user: string;
    tarefa: string;
    public: boolean;
    created: string
  },
  allComments: CommentProps[];
}

interface CommentProps {
  id: string;
  comment: string;
  taskId: string;
  user: string;
  name: string;
}

export default function Task({ item, allComments }: TaskProps) {
  const { data: session } = useSession();

  const [input, setInput] = useState('');
  const [comments, setComments] = useState<CommentProps[]>(allComments || []);
  const [editID, setEditID] = useState('');

  async function handleComment(event: FormEvent) {
    event.preventDefault();

    if (input === "") return;
    if (!session?.user?.email || !session?.user?.name) return;

    try {
      const commentUser = {
        comment: input,
        created: new Date(),
        user: session?.user?.email,
        name: session?.user?.name,
        taskId: item?.taskId
      }

      if (editID) {
        try {
          const commentRef = doc(db, "comments", editID);
          await updateDoc(commentRef, {
            comment: input,
          });
        } catch (error) {
          console.log("Error:", error)
        }

        const editComment = comments.map((comment) => 
          comment.id === editID ? {...comment, comment: input } : comment
        );
        setComments(editComment);
        setInput('');
        setEditID('');
        return;
      }

      const docRef = await addDoc(collection(db, "comments"), commentUser);

      const data = {
        id: docRef.id,
        comment: input,
        user: session?.user?.email,
        name: session?.user?.name,
        taskId: item?.taskId
      }

      setComments((oldItems) => [...oldItems, data])
      setInput("");
    } catch (error) {
      console.log("Error:", error)
    }
  }

  async function handleEditComment(item: CommentProps) {
    setInput(item.comment);
    setEditID(item.id)
  }
  async function handleDeleteComment(id: string) {
    try {
      const docRef = doc(db, "comments", id);
      await deleteDoc(docRef);
      const deleteComment = comments.filter((comment) => comment.id !== id);
      setComments(deleteComment);
      setInput('');
      setEditID('');
    } catch (error) {
      console.log("ERROR: ", error)
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

      <section className={styles.commentsContainer}>
        <h2>Comentários</h2>
        {comments.length === 0 && (
          <span>Nenhum comentário encontrado...</span>
        )}
        {comments.map((item) => (
          <article key={item.id} className={styles.comment}>
            <div className={styles.headComment}>
              <label className={styles.commentsLabel}>{item.name}</label>
              {item.user === session?.user?.email && (
                <div className={styles.buttonContainer}>
                  <button
                    className={styles.editrash}
                    onClick={() => handleEditComment(item)}
                  >
                    <FaEdit size={18} color='#3183ff' />
                  </button>
                  <button
                    className={styles.buttonTrash}
                    onClick={() => handleDeleteComment(item.id)}
                  >
                    <FaTrash size={18} color='#EA3140' />
                  </button>
                </div>
              )}
            </div>
            <p>{item.comment}</p>
          </article>
        ))}
      </section>

    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id as string;

  const docRef = doc(db, "tarefas", id);

  const q = query(collection(db, "comments"), where("taskId", "==", id));
  const snapsShotComments = await getDocs(q);

  let allComments: CommentProps[] = [];
  snapsShotComments.forEach(doc => {
    allComments.push({
      id: doc.id,
      comment: doc.data().comment,
      user: doc.data().user,
      name: doc.data().name,
      taskId: doc.data().taskId
    })
  });

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
      allComments: allComments
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