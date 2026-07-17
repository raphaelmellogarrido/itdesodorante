import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

function Entrar() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setErro("");
    setEnviando(true);

    try {
      await login(email, senha);
      navigate("/");
    } catch (error) {
      setErro("E-mail ou senha incorretos.");
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section className="auth container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Entrar</h1>
        <p className="auth-subtitle">Acesse sua conta para continuar.</p>

        {erro && <p className="auth-erro">{erro}</p>}

        <label className="auth-field">
          E-mail
          <input
            type="email"
            placeholder="voce@email.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>

        <label className="auth-field">
          Senha
          <input
            type="password"
            placeholder="••••••••"
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
            required
          />
        </label>

        <Link to="/esqueci-senha" className="auth-esqueci-senha">
          Esqueci minha senha
        </Link>

        <button type="submit" className="btn btn-solid auth-submit" disabled={enviando}>
          {enviando ? "Entrando..." : "Entrar"}
        </button>

        <p className="auth-switch">
          Não tem uma conta? <Link to="/registrar">Registrar</Link>
        </p>
      </form>
    </section>
  );
}

export default Entrar;
