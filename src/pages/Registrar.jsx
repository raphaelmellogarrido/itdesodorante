import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getErrorMessage } from "../lib/pocketbase";
import { validarSenha } from "../lib/validation";
import "./Auth.css";

function Registrar() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setErro("");

    const erroSenha = validarSenha(senha);
    if (erroSenha) {
      setErro(erroSenha);
      return;
    }

    if (senha !== confirmarSenha) {
      setErro("As senhas não coincidem.");
      return;
    }

    setEnviando(true);

    try {
      await register({
        name: nome,
        email,
        password: senha,
        passwordConfirm: confirmarSenha,
      });
      navigate("/");
    } catch (error) {
      setErro(getErrorMessage(error));
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section className="auth container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Criar conta</h1>
        <p className="auth-subtitle">Registre-se para acompanhar seus pedidos.</p>

        {erro && <p className="auth-erro">{erro}</p>}

        <label className="auth-field">
          Nome
          <input
            type="text"
            placeholder="Seu nome"
            value={nome}
            onChange={(event) => setNome(event.target.value)}
            required
          />
        </label>

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
            minLength={8}
            required
          />
          <span className="auth-hint">
            Mínimo 8 caracteres, com letras e números. Nada de senhas óbvias
            como "12345678".
          </span>
        </label>

        <label className="auth-field">
          Confirmar senha
          <input
            type="password"
            placeholder="••••••••"
            value={confirmarSenha}
            onChange={(event) => setConfirmarSenha(event.target.value)}
            minLength={8}
            required
          />
        </label>

        <button type="submit" className="btn btn-solid auth-submit" disabled={enviando}>
          {enviando ? "Criando conta..." : "Registrar"}
        </button>

        <p className="auth-switch">
          Já tem uma conta? <Link to="/entrar">Entrar</Link>
        </p>
      </form>
    </section>
  );
}

export default Registrar;
