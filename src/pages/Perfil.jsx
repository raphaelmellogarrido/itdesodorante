import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getErrorMessage } from "../lib/pocketbase";
import { formatarCPF, formatarTelefone, formatarCEP, validarCPF } from "../lib/masks";
import { buscarEnderecoPorCep } from "../lib/viacep";
import "./Perfil.css";

const ESTADOS = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS",
  "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC",
  "SP", "SE", "TO",
];

function Perfil() {
  const { user, updateProfile } = useAuth();

  const [form, setForm] = useState({
    name: user?.name || "",
    telefone: formatarTelefone(user?.telefone || ""),
    cpf: formatarCPF(user?.cpf || ""),
    data_nascimento: user?.data_nascimento ? user.data_nascimento.slice(0, 10) : "",
    cep: formatarCEP(user?.cep || ""),
    endereco: user?.endereco || "",
    numero: user?.numero || "",
    complemento: user?.complemento || "",
    bairro: user?.bairro || "",
    cidade: user?.cidade || "",
    estado: user?.estado || "",
  });
  const [buscandoCep, setBuscandoCep] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState(false);
  const [salvando, setSalvando] = useState(false);

  if (!user) {
    return <Navigate to="/entrar" replace />;
  }

  function atualizarCampo(campo, valor) {
    setForm((atual) => ({ ...atual, [campo]: valor }));
    setSucesso(false);
  }

  async function handleCepBlur() {
    const digitos = form.cep.replace(/\D/g, "");
    if (digitos.length !== 8) return;

    setBuscandoCep(true);
    const endereco = await buscarEnderecoPorCep(form.cep);
    setBuscandoCep(false);

    if (endereco) {
      setForm((atual) => ({ ...atual, ...endereco }));
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setErro("");
    setSucesso(false);

    if (form.cpf && !validarCPF(form.cpf)) {
      setErro("CPF inválido. Confira os números digitados.");
      return;
    }

    setSalvando(true);

    try {
      await updateProfile({
        ...form,
        telefone: form.telefone.replace(/\D/g, ""),
        cpf: form.cpf.replace(/\D/g, ""),
        cep: form.cep.replace(/\D/g, ""),
      });
      setSucesso(true);
    } catch (error) {
      setErro(getErrorMessage(error));
    } finally {
      setSalvando(false);
    }
  }

  return (
    <section className="perfil container">
      <div className="perfil-cabecalho">
        <h1>Meu perfil</h1>
        <p>Mantenha seus dados atualizados para agilizar suas compras.</p>
        <Link to="/meus-pedidos" className="perfil-link-pedidos">
          Ver meus pedidos →
        </Link>
      </div>

      <form className="perfil-form" onSubmit={handleSubmit}>
        {erro && <p className="auth-erro">{erro}</p>}
        {sucesso && <p className="perfil-sucesso">Dados salvos com sucesso ✓</p>}

        <div className="perfil-secao">
          <h2>Dados pessoais</h2>

          <div className="perfil-grid">
            <label className="auth-field perfil-campo-largo">
              Nome completo
              <input
                type="text"
                value={form.name}
                onChange={(event) => atualizarCampo("name", event.target.value)}
                required
              />
            </label>

            <label className="auth-field">
              E-mail
              <input type="email" value={user.email} disabled />
              <span className="auth-hint">O e-mail é usado para entrar e não pode ser alterado aqui.</span>
            </label>

            <label className="auth-field">
              CPF
              <input
                type="text"
                placeholder="000.000.000-00"
                value={form.cpf}
                onChange={(event) => atualizarCampo("cpf", formatarCPF(event.target.value))}
              />
            </label>

            <label className="auth-field">
              Data de nascimento
              <input
                type="date"
                value={form.data_nascimento}
                onChange={(event) => atualizarCampo("data_nascimento", event.target.value)}
              />
            </label>

            <label className="auth-field">
              Telefone
              <input
                type="text"
                placeholder="(00) 00000-0000"
                value={form.telefone}
                onChange={(event) => atualizarCampo("telefone", formatarTelefone(event.target.value))}
              />
            </label>
          </div>
        </div>

        <div className="perfil-secao">
          <h2>Endereço</h2>

          <div className="perfil-grid">
            <label className="auth-field">
              CEP
              <input
                type="text"
                placeholder="00000-000"
                value={form.cep}
                onChange={(event) => atualizarCampo("cep", formatarCEP(event.target.value))}
                onBlur={handleCepBlur}
              />
              <span className="auth-hint">
                {buscandoCep ? "Buscando endereço..." : "Preenche o endereço automaticamente."}
              </span>
            </label>

            <label className="auth-field perfil-campo-largo">
              Endereço
              <input
                type="text"
                value={form.endereco}
                onChange={(event) => atualizarCampo("endereco", event.target.value)}
              />
            </label>

            <label className="auth-field">
              Número
              <input
                type="text"
                value={form.numero}
                onChange={(event) => atualizarCampo("numero", event.target.value)}
              />
            </label>

            <label className="auth-field">
              Complemento
              <input
                type="text"
                placeholder="Apto, bloco, etc."
                value={form.complemento}
                onChange={(event) => atualizarCampo("complemento", event.target.value)}
              />
            </label>

            <label className="auth-field">
              Bairro
              <input
                type="text"
                value={form.bairro}
                onChange={(event) => atualizarCampo("bairro", event.target.value)}
              />
            </label>

            <label className="auth-field">
              Cidade
              <input
                type="text"
                value={form.cidade}
                onChange={(event) => atualizarCampo("cidade", event.target.value)}
              />
            </label>

            <label className="auth-field">
              Estado
              <select
                value={form.estado}
                onChange={(event) => atualizarCampo("estado", event.target.value)}
              >
                <option value="">Selecione</option>
                {ESTADOS.map((uf) => (
                  <option value={uf} key={uf}>
                    {uf}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <button type="submit" className="btn btn-solid perfil-salvar" disabled={salvando}>
          {salvando ? "Salvando..." : "Salvar alterações"}
        </button>
      </form>
    </section>
  );
}

export default Perfil;
