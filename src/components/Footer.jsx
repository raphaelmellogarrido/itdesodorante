import { Link } from "react-router-dom";
import Logo from "./Logo";
import "./Footer.css";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner container">
        <div className="footer-brand">
          <Logo className="footer-logo" />
          <p className="footer-tagline">
            Desodorantes veganos, sem álcool e sem alumínio.
          </p>
        </div>

        <div className="footer-col">
          <h3>Navegação</h3>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/produtos">Produtos</Link>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Conta</h3>
          <ul>
            <li>
              <Link to="/entrar">Entrar</Link>
            </li>
            <li>
              <Link to="/registrar">Registrar</Link>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Contato</h3>
          <ul>
            <li>
              <a href="mailto:contato@itdesodorante.com.br">
                contato@itdesodorante.com.br
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {year} It Desodorante. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
