import Head from 'next/head';
import styles from './styles.module.css';

export default function Dashboard(){
    return (
        <div className={styles.container}>
            <Head>
                <title>Meu painde de tarefas</title>
            </Head>

            <h1>Página painel</h1>
        </div>
    )
}