
import { BemVindo, Container, Header, Titulo } from './styles'

function App() {

  return (
    <Container className="container">
      <Header>
        <Titulo className="titulo">Projeto Styled Component</Titulo>
      </Header>

      <BemVindo color='#00FF00' size={4}>
        Bem vindo ao sistema!
      </BemVindo>
    </Container>
  )
}

export default App

/* 
<div className="container">
    <header className="header">
      <a className="titulo">Projeto Styled Component</a>
    </header>

    <h1>Bem vindo ao sistema!</h1>
  </div>
*/
