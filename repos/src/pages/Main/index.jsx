import { useState } from "react";
import { Container, DeleteButton, Form, List, SubmitButton } from "./styles";
import { FaBars, FaGithub, FaPlus, FaSpinner, FaTrash } from 'react-icons/fa'
import api from "../../services/api";
import { useCallback } from "react";

export default function Main() {
  const [newRepo, setNewRepo] = useState('');
  const [repositorios, setRepositorios] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    async function submit() {
      setLoading(true);
      try {
        const response = await api.get(`repos/${newRepo}`);
        const data = {
          name: response.data.full_name
        }

        setRepositorios([...repositorios, data]);
        setNewRepo('');
      } catch (error) {
        console.log('ERROR => ', error);
      } finally {
        setLoading(false);
      }
    }

    submit();
  }, [newRepo, repositorios])

  function handleInputchange(e) {
    e.preventDefault();
    setNewRepo(e.target.value);
  }

  const handleDeleteRepo = useCallback((repo) => {
    console.log(repo)
    const find = repositorios.filter(r => r.name !== repo);
    setRepositorios(find);
  }, [repositorios])

  return (
    <Container>
      <h1>
        <FaGithub />
        Meus repositórios
      </h1>

      <Form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Adicionar Repositorios"
          value={newRepo}
          onChange={handleInputchange}
        />

        <SubmitButton loading={loading ? 1 : 0}>
          {loading ? (
            <FaSpinner color="#FFF" size={14} />
          ) : (
            <FaPlus color="#FFF" size={14} />
          )}
        </SubmitButton>
      </Form>

      <List>
        {repositorios.map(repo => (
          <li key={repo.name}>
            <span>
              <DeleteButton onClick={() => handleDeleteRepo(repo.name)}>
                <FaTrash color="red" size={14} />
              </DeleteButton>
              {repo.name}
            </span>
            <a href="">
              <FaBars size={20} />
            </a>
          </li>
        ))}
      </List>
    </Container>
  )
}