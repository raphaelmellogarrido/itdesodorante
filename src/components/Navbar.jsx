import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import Logo from "./Logo";
import "./Navbar.css";

function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const closeMenu = () => setOpen(false);

  const linkClass = ({ isActive }) =>
    `navbar-link${isActive ? " is-active" : ""}`;

  function handleSair() {
    logout();
    closeMenu();
    navigate("/");
  }

  const primeiroNome = user?.name ? user.name.trim().split(/\s+/)[0] : user?.email;

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

          <div className="navbar-actions navbar-actions--mobile">
            {user ? (
              <>
                <Link to="/perfil" className="navbar-user" onClick={closeMenu}>
                  Olá, <span className="navbar-user-nome">{primeiroNome}</span>
                </Link>
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
          <Link to="/carrinho" className="navbar-cart" onClick={closeMenu} aria-label="Carrinho">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
            </svg>
            {itemCount > 0 && <span className="navbar-cart-badge">{itemCount}</span>}
          </Link>

          {user ? (
            <>
              <Link to="/perfil" className="navbar-user">
                Olá, <span className="navbar-user-nome">{primeiroNome}</span>
              </Link>
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

        <div className="navbar-mobile-actions">
          <Link
            to="/carrinho"
            className="navbar-cart navbar-cart--mobile"
            onClick={closeMenu}
            aria-label="Carrinho"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.7 13.4a2 2 0 0 0 2 1.6h9.7a2 2 0 0 0 2-1.6L23 6H6" />
            </svg>
            {itemCount > 0 && <span className="navbar-cart-badge">{itemCount}</span>}
          </Link>

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
      </div>
    </header>
  );
}

export default Navbar;
