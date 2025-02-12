import { useParams } from "react-router-dom"
import { BackButton, Container, Loading, Owner } from "./styles";
import { useEffect } from "react";
import api from './../../services/api';
import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

export default function Repositorio() {
  const [repositorio, setRepositorio] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);

  const { repo } = useParams();

  useEffect(() => {
    async function load() {
      const nomeRepo = repo;

      const [repositorioData, issuesData] = await Promise.all([
        api.get(`/repos/${nomeRepo}`),
        api.get(`/repos/${nomeRepo}/issues`, {
          params: {
            state: 'open',
            per_page: 5
          }
        })
      ]);

      setRepositorio(repositorioData.data);
      setIssues(issuesData.data);
      setLoading(false);
    }

    load();
  }, [repo])

  if (loading) {
    return (
      <Loading>
        <h1>Carregando...</h1>
      </Loading>
    )
  }

  return (
    <Container>
      <BackButton to="/">
        <FaArrowLeft color="#0D2636" size={30} />
      </BackButton>
      <Owner>
        <img
          src={repositorio.owner?.avatar_url}
          alt={repositorio.owner?.login}
        />
        <h1>{repositorio?.name}</h1>
        <p>{repositorio?.description}</p>
      </Owner>
    </Container>
  )
}