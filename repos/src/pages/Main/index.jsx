import { useState } from "react";
import { Container, DeleteButton, Form, List, SubmitButton } from "./styles";
import { FaBars, FaGithub, FaPlus, FaSpinner, FaTrash } from 'react-icons/fa'
import api from "../../services/api";
import { useCallback } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function Main() {
  const [newRepo, setNewRepo] = useState('');
  const [repositorios, setRepositorios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState('');

  // Buscar
  useEffect(() => {
    const repoStorage = localStorage.getItem('repos');
    if (repoStorage) {
      setRepositorios(JSON.parse(repoStorage));
    }
  }, [])

  // Salvar alterações
  useEffect(() => {
    if(repositorios.length > 0) {
      localStorage.setItem('repos', JSON.stringify(repositorios))
    }
  }, [repositorios])

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    async function submit() {
      setLoading(true);
      setAlert('');

      try {
        if (newRepo === '') {
          throw new Error('Você precisa digitar um repositório!')
        }

        const response = await api.get(`repos/${newRepo}`);

        const hasRepo = repositorios.find(repo => repo.name === newRepo)
        if (hasRepo) {
          throw new Error('Repositório duplicado')
        }

        const data = {
          name: response.data.full_name
        }

        setRepositorios([...repositorios, data]);
        setNewRepo('');
      } catch (error) {
        setAlert(true)
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
    setAlert('')
  }

  const handleDeleteRepo = useCallback((repo) => {
    const find = repositorios.filter(r => r.name !== repo);
    setRepositorios(find);
  }, [repositorios])

  return (
    <Container>
      <h1>
        <FaGithub />
        Meus repositórios
      </h1>

      <Form onSubmit={handleSubmit} error={alert}>
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
            <Link to={`/repositorio/${encodeURIComponent(repo.name)}`}>
              <FaBars size={20} />
            </Link>
          </li>
        ))}
      </List>
    </Container>
  )
}