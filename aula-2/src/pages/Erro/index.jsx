import { Link } from "react-router-dom";

export default function Erro () {
    return (
        <div>
            <h1>Oops, Essa página não existe</h1>

            <span>Você pode estar procurando: </span><br />
            <Link to="/">Home</Link><br />
            <Link to="/sobre">Sobre</Link><br />
            <Link to="/contato">Contato</Link>
        </div>
    )
}