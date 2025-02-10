import { useState } from "react";

function App() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState('');
  const [user, setUser] = useState({nome: 'Fulano', email: 'fulano@teste.com', idade: '30'});

  function handleRegister(event) {
    event.preventDefault();

    alert("Usuario registrado com sucesso!")
    setUser({nome,email,idade});
  }

  return (
    <div>
      <h1>Cadastrando Usuario</h1>
      <form onSubmit={handleRegister}>
        <label>Nome:</label>
        <input  
        placeholder="Digite seu nome"
        value={nome}
        onChange={(event) => setNome(event.target.value)}
        /><br />

        <label>E-mail:</label>
        <input 
        placeholder="Digite seu e-mail"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        /><br />

        <label>Idade:</label>
        <input placeholder="Digite sua idade"
        value={idade}
        onChange={(event) => setIdade(event.target.value)}
        /><br />

        <button type="submit">Registrar</button>
      </form>

      <br /><br />

      <div>
        <span>Bem-vindo: {user.nome}</span><br />
        <span>Email: {user.email}</span><br />
        <span>Idade: {user.idade}</span><br />
      </div>
    </div>
  );
}

export default App;
