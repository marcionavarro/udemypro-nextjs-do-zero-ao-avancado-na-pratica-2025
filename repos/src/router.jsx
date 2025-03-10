import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';
import Repositorio from './pages/Repositorio';

export default function Rotas(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/repositorio/:repo' element={<Repositorio />} />
      </Routes>
    </BrowserRouter>
  )
}