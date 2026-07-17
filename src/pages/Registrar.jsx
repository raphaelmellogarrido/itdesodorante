import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getErrorMessage } from "../lib/pocketbase";
import { validarSenha, nomeValido, emailValido, verificarEmailDisponivel } from "../lib/validation";
import BotaoMostrarSenha from "../components/BotaoMostrarSenha";
import "./Auth.css";

function CheckIcon() {
  return (
    <svg className="campo-check-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="10" fill="#1e7a45" />
      <path d="M6 10.5l2.5 2.5L14 7.5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Registrar() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  const [emailDisponivel, setEmailDisponivel] = useState(null); // null | true | false
  const [verificandoEmail, setVerificandoEmail] = useState(false);
  const verificacaoId = useRef(0);

  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

  const nomeOk = nome.length > 0 && nomeValido(nome);
  const nomeRuim = nome.length > 0 && !nomeValido(nome);

  const formatoEmailOk = email.length > 0 && emailValido(email);
  const emailRuim = email.length > 0 && !formatoEmailOk;

  const erroSenha = senha.length > 0 ? validarSenha(senha) : null;
  const senhaOk = senha.length > 0 && !erroSenha;

  const confirmarOk = confirmarSenha.length > 0 && senhaOk && confirmarSenha === senha;
  const confirmarRuim = confirmarSenha.length > 0 && confirmarSenha !== senha;

  useEffect(() => {
    if (!formatoEmailOk) {
      setEmailDisponivel(null);
      setVerificandoEmail(false);
      return;
    }

    const idAtual = ++verificacaoId.current;
    setVerificandoEmail(true);

    const timeout = setTimeout(async () => {
      const disponivel = await verificarEmailDisponivel(email);
      if (verificacaoId.current === idAtual) {
        setEmailDisponivel(disponivel);
        setVerificandoEmail(false);
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [email, formatoEmailOk]);

  const emailOk = formatoEmailOk && emailDisponivel === true;
  const emailEmUso = formatoEmailOk && emailDisponivel === false;

  const formValido = nomeOk && emailOk && senhaOk && confirmarOk;

  async function handleSubmit(event) {
    event.preventDefault();
    setErro("");

    if (!formValido) {
      setErro("Confira os campos destacados antes de continuar.");
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
      <form className="auth-card" onSubmit={handleSubmit} noValidate>
        <h1>Criar conta</h1>
        <p className="auth-subtitle">Registre-se para acompanhar seus pedidos.</p>

        {erro && <p className="auth-erro">{erro}</p>}

        <label className="auth-field">
          Nome
          <div className="campo-status-wrap">
            <input
              type="text"
              placeholder="Seu nome"
              value={nome}
              onChange={(event) => setNome(event.target.value)}
              className={nomeOk ? "campo-valido" : nomeRuim ? "campo-invalido" : ""}
            />
            {nomeOk && <CheckIcon />}
          </div>
        </label>

        <label className="auth-field">
          E-mail
          <div className="campo-status-wrap">
            <input
              type="email"
              placeholder="voce@email.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={emailOk ? "campo-valido" : emailRuim || emailEmUso ? "campo-invalido" : ""}
            />
            {emailOk && <CheckIcon />}
          </div>
          {verificandoEmail && <span className="auth-hint">Verificando disponibilidade...</span>}
          {emailEmUso && <p className="campo-mensagem-erro">Esse e-mail já está em uso.</p>}
        </label>

        <label className="auth-field">
          Senha
          <div className="campo-status-wrap campo-status-wrap--senha">
            <input
              type={mostrarSenha ? "text" : "password"}
              placeholder="••••••••"
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              className={senhaOk ? "campo-valido" : erroSenha ? "campo-invalido" : ""}
            />
            {senhaOk && <CheckIcon />}
            <BotaoMostrarSenha
              visivel={mostrarSenha}
              onClick={() => setMostrarSenha((valor) => !valor)}
            />
          </div>
          {erroSenha && <p className="campo-mensagem-erro">{erroSenha}</p>}
        </label>

        <label className="auth-field">
          Confirmar senha
          <div className="campo-status-wrap campo-status-wrap--senha">
            <input
              type={mostrarConfirmarSenha ? "text" : "password"}
              placeholder="••••••••"
              value={confirmarSenha}
              onChange={(event) => setConfirmarSenha(event.target.value)}
              className={confirmarOk ? "campo-valido" : confirmarRuim ? "campo-invalido" : ""}
            />
            {confirmarOk && <CheckIcon />}
            <BotaoMostrarSenha
              visivel={mostrarConfirmarSenha}
              onClick={() => setMostrarConfirmarSenha((valor) => !valor)}
            />
          </div>
          {confirmarRuim && <p className="campo-mensagem-erro">As senhas não coincidem.</p>}
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
