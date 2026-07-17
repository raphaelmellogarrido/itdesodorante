import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "./Logo";
import "./Navbar.css";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const closeMenu = () => setOpen(false);

  const linkClass = ({ isActive }) =>
    `navbar-link${isActive ? " is-active" : ""}`;

  function handleSair() {
    logout();
    closeMenu();
    navigate("/");
  }

  return (
    <header className="navbar">
      <div className="navbar-inner container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <Logo />
        </Link>

        <nav className={`navbar-nav${open ? " is-open" : ""}`}>
          <NavLink to="/" end className={linkClass} onClick={closeMenu}>
            Home
          </NavLink>
          <NavLink to="/sobre" className={linkClass} onClick={closeMenu}>
            Sobre
          </NavLink>
          <NavLink to="/produtos" className={linkClass} onClick={closeMenu}>
            Produtos
          </NavLink>
          <NavLink to="/depoimentos" className={linkClass} onClick={closeMenu}>
            Depoimentos
          </NavLink>

          <div className="navbar-actions navbar-actions--mobile">
            {user ? (
              <>
                <span className="navbar-user">Olá, {user.name || user.email}</span>
                <button type="button" className="btn btn-outline" onClick={handleSair}>
                  Sair
                </button>
              </>
            ) : (
              <>
                <Link to="/entrar" className="btn btn-outline" onClick={closeMenu}>
                  Entrar
                </Link>
                <Link to="/registrar" className="btn btn-solid" onClick={closeMenu}>
                  Registrar
                </Link>
              </>
            )}
          </div>
        </nav>

        <div className="navbar-actions navbar-actions--desktop">
          {user ? (
            <>
              <span className="navbar-user">Olá, {user.name || user.email}</span>
              <button type="button" className="btn btn-outline" onClick={handleSair}>
                Sair
              </button>
            </>
          ) : (
            <>
              <Link to="/entrar" className="btn btn-outline">
                Entrar
              </Link>
              <Link to="/registrar" className="btn btn-solid">
                Registrar
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className={`navbar-toggle${open ? " is-open" : ""}`}
          aria-label="Abrir menu"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}

export default Navbar;
