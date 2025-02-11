import { useEffect, useState } from "react";

function App() {
  const [input, setInput] = useState('');
  const [tarefas, setTarefas] = useState(storage);

  function storage () {
    const tarefasStorage = localStorage.getItem('@tarefa');
    return tarefasStorage ? JSON.parse(tarefasStorage) : [
      'Pagar a conta de luz',
      'Estudar React Js',
    ];
  }

  useEffect(() => {
    localStorage.setItem('@tarefa', JSON.stringify(tarefas));
  }, [tarefas])


  function handleRegister(event) {
    event.preventDefault();
    if (input.trim()) {
      setTarefas([...tarefas, input])
      setInput('');
    }
  }

  return (
    <div>
      <h1>Cadastrando tarefa</h1>
      <form onSubmit={handleRegister}>
        <label>Nome da tarefa:</label><br />
        <input
          placeholder="Digite um tarefa"
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />
        <button type="submit">Registrar</button>
      </form>

      <br /><br />

      <ul>
        {tarefas.map(tarefa => (
          <li key={tarefa}>{tarefa}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
