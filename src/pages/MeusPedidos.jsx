import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { pb, getErrorMessage, getFileUrl } from "../lib/pocketbase";
import "./MeusPedidos.css";

const STATUS_LABEL = {
  pendente: "Pendente",
  pago: "Pago",
  enviado: "Enviado",
  entregue: "Entregue",
  cancelado: "Cancelado",
};

function formatPreco(preco) {
  return preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatData(data) {
  const dataFormatada = new Date(data).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const horaFormatada = new Date(data).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${dataFormatada} às ${horaFormatada}`;
}

function MeusPedidos() {
  const { user } = useAuth();
  const [pedidos, setPedidos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (!user) return;

    pb.collection("pedidos")
      .getFullList({
        filter: pb.filter("user = {:uid}", { uid: user.id }),
        sort: "-created",
        requestKey: null,
      })
      .then((registros) => {
        setPedidos(registros);
        setCarregando(false);
      })
      .catch((error) => {
        if (error?.isAbort) return;
        setErro(getErrorMessage(error));
        setCarregando(false);
      });
  }, [user]);

  if (!user) {
    return <Navigate to="/entrar" replace />;
  }

  return (
    <section className="meus-pedidos container">
      <div className="meus-pedidos-cabecalho">
        <h1>Meus pedidos</h1>
        <p>Acompanhe aqui o histórico e o status das suas compras.</p>
      </div>

      {carregando && <p>Carregando pedidos...</p>}
      {erro && <p className="auth-erro">{erro}</p>}

      {!carregando && !erro && pedidos.length === 0 && (
        <div className="meus-pedidos-vazio">
          <p>Você ainda não fez nenhum pedido.</p>
          <Link to="/produtos" className="btn btn-solid">
            Ver produtos
          </Link>
        </div>
      )}

      <ul className="meus-pedidos-lista">
        {pedidos.map((pedido) => (
          <li className="pedido-card" key={pedido.id}>
            <div className="pedido-card-topo">
              <div>
                <span className="pedido-numero">Pedido #{pedido.numero_pedido || pedido.id.slice(-8)}</span>
                <span className="pedido-data">{formatData(pedido.created)}</span>
              </div>
              <span className={`pedido-status pedido-status--${pedido.status}`}>
                {STATUS_LABEL[pedido.status] || pedido.status}
              </span>
            </div>

            <ul className="pedido-itens">
              {(pedido.itens || []).map((item, index) => (
                <li className="pedido-item" key={index}>
                  {item.featured_image && (
                    <img src={getFileUrl(item, item.featured_image)} alt={item.name} />
                  )}
                  <span className="pedido-item-nome">{item.name}</span>
                  <span className="pedido-item-quantidade">x{item.quantidade}</span>
                  <span className="pedido-item-preco">
                    {formatPreco(item.price * item.quantidade)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="pedido-card-total">
              <span>Total</span>
              <span>{formatPreco(pedido.total)}</span>
            </div>

            {pedido.previsao_entrega && (
              <p className="pedido-previsao">{pedido.previsao_entrega}</p>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default MeusPedidos;
