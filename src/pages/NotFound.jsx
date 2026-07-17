import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <section className="not-found">
      <div className="not-found-inner container">
        <span className="not-found-badge">Erro 404</span>
        <h1>Essa página não existe.</h1>
        <p>
          O endereço que você tentou acessar não foi encontrado. Ele pode ter
          sido removido ou o link pode estar errado.
        </p>
        <div className="not-found-actions">
          <Link to="/" className="btn btn-solid">
            Voltar para a Home
          </Link>
          <Link to="/produtos" className="btn btn-outline">
            Ver produtos
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
