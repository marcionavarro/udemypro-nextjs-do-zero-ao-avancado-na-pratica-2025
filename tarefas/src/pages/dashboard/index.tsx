import { GetServerSideProps } from 'next';
import styles from './styles.module.css';
import Head from 'next/head';

import { getSession } from 'next-auth/react';
import { Textarea } from '@/components/textarea';
import { FaEdit, FaShare, FaTrash } from 'react-icons/fa';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { db } from '@/services/firebaseConnection';
import Link from 'next/link';

interface HomeProps {
    user: {
        email: string
    }
}

interface TasksProps {
    id: string;
    created: Date;
    public: boolean;
    tarefa: string;
    user: string;
}

export default function Dashboard({ user }: HomeProps) {
    const [input, setInput] = useState('');
    const [publicTask, setPublicTask] = useState(false);
    const [tasks, setTasks] = useState<TasksProps[]>([]);
    const [editID, setEditID] = useState('');


    useEffect(() => {
        async function loadTarefas() {
            const tarefasRef = collection(db, "tarefas");
            const q = query(
                tarefasRef,
                orderBy("created", "desc"),
                where("user", "==", user?.email)
            )

            onSnapshot(q, (snapshot) => {
                let lista = [] as TasksProps[];

                snapshot.forEach(doc => {
                    lista.push({
                        id: doc.id,
                        tarefa: doc.data().tarefa,
                        created: doc.data().created,
                        user: doc.data().user,
                        public: doc.data().public,
                    })
                })

                setTasks(lista);
            })
        }

        loadTarefas();
    }, [user?.email])

    function handleChangePublic(event: ChangeEvent<HTMLInputElement>) {
        setPublicTask(event.target.checked)
    }

    async function handleRegisterTask(event: FormEvent) {
        event.preventDefault();

        if (input === '') return;

        if (editID) {
            try {
                const tarefaRef = doc(db, "tarefas", editID);
                await updateDoc(tarefaRef, {
                    tarefa: input,
                    public: publicTask
                });
                setInput('');
                setPublicTask(false);
                setEditID('');
            } catch (error) {
                console.error("Erro ao atualizar tarefa:", error);
            }
            return;
        }

        try {
            await addDoc(collection(db, "tarefas"), {
                tarefa: input,
                created: new Date(),
                user: user?.email,
                public: publicTask
            });

            setInput('');
            setPublicTask(false);
        } catch (error) {
            console.log(error)
        }
    }

    async function handleShare(id: string) {
        await navigator.clipboard.writeText(
            `${process.env.NEXT_PUBLIC_URL}/task/${id}`
        );
        alert('URL Copiada com sucesso');
    }

    function handleEditTask(task: TasksProps) {
        const { id, tarefa, public: publicTask } = task;
        setEditID(id);
        setInput(tarefa);
        setPublicTask(publicTask);
    }

    async function handleDeleteTask(id: string) {
        const docRef = doc(db, "tarefas", id);
        await deleteDoc(docRef).then(() => {
            setInput('');
            setPublicTask(false);
            setEditID('');
        });
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Meu painde de tarefas</title>
            </Head>

            <main className={styles.main}>
                <section className={styles.content}>
                    <div className={styles.contentForm}>
                        <h1 className={styles.title}>Qual sua tarefa ?</h1>

                        <form onSubmit={handleRegisterTask}>
                            <Textarea
                                placeholder='Digite qual sua tarefa ?'
                                value={input}
                                onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                                    setInput(event.target.value)
                                }
                            />
                            <div className={styles.checkboxArea}>
                                <input
                                    type="checkbox"
                                    className={styles.checkbox}
                                    checked={publicTask}
                                    onChange={handleChangePublic}
                                />
                                <label>Deixar sua tarefa pública</label>
                            </div>
                            <button className={styles.button} type='submit'>
                                Registrar
                            </button>
                        </form>
                    </div>
                </section>

                <section className={styles.taskContainer}>
                    <h1>Minhas Tarefas</h1>

                    {tasks.map((task) => (
                        <article key={task.id} className={styles.task}>
                            {task.public && (
                                <div className={styles.tagContainer}>
                                    <label className={styles.tag}>PUBLICO</label>
                                    <button className={styles.shareButton} onClick={() => handleShare(task.id)}>
                                        <FaShare
                                            size={22}
                                            color='#3183ff'
                                        />
                                    </button>
                                </div>
                            )}
                            <div className={styles.taskContent}>
                                {task.public ? (
                                    <Link href={`/task/${task.id}`}>{task.tarefa}</Link>
                                ) : (
                                    <p>{task.tarefa}</p>
                                )}

                                <div>
                                    <button
                                        className={styles.editButton}
                                        type='submit'
                                        onClick={() => handleEditTask(task)}
                                    >
                                        <FaEdit size={22} color='#3183ff' />
                                    </button>
                                    <button
                                        className={styles.trashButton}
                                        type='submit'
                                        onClick={() => handleDeleteTask(task.id)}
                                    >
                                        <FaTrash size={22} color='#ea3140' />
                                    </button>
                                </div>
                            </div>
                        </article>
                    ))}
                </section>
            </main>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const session = await getSession({ req });

    if (!session?.user) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            user: {
                email: session?.user?.email
            }
        },
    }
}