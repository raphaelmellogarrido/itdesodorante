import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-inner container">
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

        {/* <div className="footer-col">
          <h3>Conta</h3>
          <ul>
            <li>
              <Link to="/entrar">Entrar</Link>
            </li>
            <li>
              <Link to="/registrar">Registrar</Link>
            </li>
          </ul>
        </div> */}

        <div className="footer-col">
          <h3>Contato</h3>
          <ul>
            <li>
              <a href="mailto:contato@itdesodorante.com.br">contato@itdesodorante.com.br</a>
            </li>
            <li>
              <a href="https://www.instagram.com/itdesodorante/" target="_blank">
                Instagram <i class="fab fa-instagram"></i>
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Legal</h3>
          <ul>
            <li>
              <Link to="/politica-de-privacidade">Política de Privacidade</Link>
            </li>
            <li>
              <Link to="/termos-de-uso">Termos de Uso</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* <div className="footer-social">
        <a href="#" className="footer-social-btn" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        </a>
      </div> */}

      <div className="footer-bottom">
        <p>CNPJ 00.000.000/0001-00 — Rua Exemplo, 123, Centro, Rio de Janeiro/RJ, CEP 20000-000</p>
        <p>&copy; {year} It Desodorante. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;
