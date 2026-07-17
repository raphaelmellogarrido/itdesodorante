import { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { pb, getErrorMessage } from "../lib/pocketbase";
import "./PedidoConfirmado.css";

function formatPreco(preco) {
  return preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function PedidoConfirmado() {
  const { user } = useAuth();
  const { id } = useParams();
  const [pedido, setPedido] = useState(null);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (!user) return;
    pb.collection("pedidos")
      .getOne(id, { requestKey: null })
      .then(setPedido)
      .catch((error) => {
        if (error?.isAbort) return;
        setErro(getErrorMessage(error));
      });
  }, [user, id]);

  if (!user) {
    return <Navigate to="/entrar" replace />;
  }

  if (erro) {
    return (
      <div className="pedido-confirmado container">
        <p className="auth-erro">{erro}</p>
        <Link to="/produtos" className="btn btn-solid">
          Ver produtos
        </Link>
      </div>
    );
  }

  if (!pedido) {
    return <div className="pedido-confirmado container">Carregando...</div>;
  }

  return (
    <div className="pedido-confirmado container">
      <span className="pedido-confirmado-icone" aria-hidden="true">
        ✓
      </span>
      <h1>Pedido confirmado!</h1>
      <p>Recebemos sua compra e já vamos preparar tudo com carinho. Enviamos os detalhes para o seu e-mail. Pode demorar alguns minutos para receber o e-mail de confirmação.</p>

      <div className="pedido-confirmado-card">
        <div className="pedido-confirmado-linha">
          <span>Número do pedido</span>
          <span>#{pedido.numero_pedido || pedido.id.slice(-8)}</span>
        </div>
        <div className="pedido-confirmado-linha">
          <span>Total</span>
          <span>{formatPreco(pedido.total)}</span>
        </div>
        <div className="pedido-confirmado-linha">
          <span>Previsão de entrega</span>
          <span>{pedido.previsao_entrega}</span>
        </div>
      </div>

      <div className="pedido-confirmado-acoes">
        <Link to="/meus-pedidos" className="btn btn-solid">
          Ver meus pedidos
        </Link>
        <Link to="/produtos" className="btn btn-outline">
          Continuar comprando
        </Link>
      </div>
    </div>
  );
}

export default PedidoConfirmado;
