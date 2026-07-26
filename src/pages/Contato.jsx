import { useState } from "react";
import { pb, getErrorMessage } from "../lib/pocketbase";
import "./Contato.css";

function EnviarIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

function Contato() {
  const [form, setForm] = useState({ nome: "", email: "", assunto: "", mensagem: "" });
  const [enviando, setEnviando] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState("");

  function atualizarCampo(campo, valor) {
    setForm((atual) => ({ ...atual, [campo]: valor }));
    setSucesso(false);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setErro("");
    setEnviando(true);

    try {
      const url = pb.buildURL("/api/contato");
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Não foi possível enviar sua mensagem.");
      }

      setSucesso(true);
      setForm({ nome: "", email: "", assunto: "", mensagem: "" });
    } catch (error) {
      setErro(getErrorMessage(error));
    } finally {
      setEnviando(false);
    }
  }

  return (
    <section className="contato container">
      <div className="contato-cabecalho">
        <h1>Fale conosco</h1>
        <p>Tem alguma dúvida, sugestão ou proposta? Manda uma mensagem pra gente.</p>
      </div>

      <form className="contato-card" onSubmit={handleSubmit}>
        {erro && <p className="auth-erro">{erro}</p>}
        {sucesso && <p className="contato-sucesso">Mensagem enviada com sucesso ✓</p>}

        <label className="contato-field">
          Nome
          <input
            type="text"
            placeholder="O teu nome"
            value={form.nome}
            onChange={(event) => atualizarCampo("nome", event.target.value)}
            required
          />
        </label>

        <label className="contato-field">
          Email
          <input
            type="email"
            placeholder="email@exemplo.com"
            value={form.email}
            onChange={(event) => atualizarCampo("email", event.target.value)}
            required
          />
        </label>

        <label className="contato-field">
          Assunto
          <input
            type="text"
            placeholder="Sobre o que vamos falar?"
            value={form.assunto}
            onChange={(event) => atualizarCampo("assunto", event.target.value)}
            required
          />
        </label>

        <label className="contato-field">
          Mensagem
          <textarea
            placeholder="Conta-nos mais sobre o teu projeto..."
            rows={6}
            value={form.mensagem}
            onChange={(event) => atualizarCampo("mensagem", event.target.value)}
            required
          />
        </label>

        <button type="submit" className="btn btn-solid contato-enviar" disabled={enviando}>
          <EnviarIcon />
          {enviando ? "Enviando..." : "Enviar Mensagem"}
        </button>
      </form>
    </section>
  );
}

export default Contato;
