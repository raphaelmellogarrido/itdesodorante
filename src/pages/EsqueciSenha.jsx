import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

function EsqueciSenha() {
  const { solicitarRedefinicaoSenha } = useAuth();
  const [email, setEmail] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setErro("");
    setEnviando(true);

    try {
      await solicitarRedefinicaoSenha(email);
      setEnviado(true);
    } catch {
      // PocketBase também retorna sucesso para e-mails inexistentes,
      // então um erro aqui normalmente é problema de conexão.
      setErro("Não foi possível enviar o e-mail agora. Tente novamente.");
    } finally {
      setEnviando(false);
    }
  }

  if (enviado) {
    return (
      <section className="auth container">
        <div className="auth-card">
          <h1>Verifique seu e-mail</h1>
          <p className="auth-subtitle">Se houver uma conta cadastrada com {email}, enviamos um link para redefinir sua senha. Confira também a caixa de spam. Pode demorar até 1 minuto para receber seu e-mail.</p>
          <Link to="/entrar" className="btn btn-solid auth-submit">
            Voltar para o login
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="auth container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h1>Esqueci minha senha</h1>
        <p className="auth-subtitle">Digite seu e-mail e enviaremos um link para você redefinir sua senha.</p>

        {erro && <p className="auth-erro">{erro}</p>}

        <label className="auth-field">
          E-mail
          <input type="email" placeholder="voce@email.com" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </label>

        <button type="submit" className="btn btn-solid auth-submit" disabled={enviando}>
          {enviando ? "Enviando..." : "Enviar link de redefinição"}
        </button>

        <p className="auth-switch">
          Lembrou a senha? <Link to="/entrar">Entrar</Link>
        </p>
      </form>
    </section>
  );
}

export default EsqueciSenha;
