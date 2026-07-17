import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getErrorMessage } from "../lib/pocketbase";
import { validarSenha } from "../lib/validation";
import "./Auth.css";

function RedefinirSenha() {
  const { confirmarRedefinicaoSenha } = useAuth();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";

  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [enviando, setEnviando] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setErro("");

    if (!token) {
      setErro("Link inválido ou incompleto. Solicite a redefinição novamente.");
      return;
    }

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
      await confirmarRedefinicaoSenha(token, senha, confirmarSenha);
      setSucesso(true);
    } catch (error) {
      const mensagem = getErrorMessage(error);
      const pareceTokenInvalido = /token/i.test(mensagem);
      setErro(
        pareceTokenInvalido
          ? "Link inválido ou expirado. Solicite a redefinição novamente."
          : mensagem
      );
    } finally {
      setEnviando(false);
    }
  }

  if (sucesso) {
    return (
      <section className="auth container">
        <div className="auth-card">
          <h1>Senha redefinida</h1>
          <p className="auth-subtitle">
            Sua senha foi alterada com sucesso. Já pode entrar com a nova senha.
          </p>
          <Link to="/entrar" className="btn btn-solid auth-submit">
            Ir para o login
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="auth container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Redefinir senha</h1>
        <p className="auth-subtitle">Escolha uma nova senha para sua conta.</p>

        {erro && <p className="auth-erro">{erro}</p>}

        <label className="auth-field">
          Nova senha
          <input
            type="password"
            placeholder="••••••••"
            value={senha}
            onChange={(event) => setSenha(event.target.value)}
            minLength={8}
            required
          />
          <span className="auth-hint">Mínimo 8 caracteres, com letras e números.</span>
        </label>

        <label className="auth-field">
          Confirmar nova senha
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
          {enviando ? "Salvando..." : "Redefinir senha"}
        </button>
      </form>
    </section>
  );
}

export default RedefinirSenha;
