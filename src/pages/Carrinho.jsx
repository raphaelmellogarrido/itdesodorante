import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { getErrorMessage, getFileUrl } from "../lib/pocketbase";
import { camposFaltando, criarPedidoFake, validarEstoque } from "../lib/pedidos";
import "./Carrinho.css";

function formatPreco(preco) {
  return preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function Carrinho() {
  const { user } = useAuth();
  const { items, updateQuantidade, removeItem, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [finalizando, setFinalizando] = useState(false);
  const [erro, setErro] = useState("");

  const faltando = user ? camposFaltando(user) : [];
  const podeComprar = Boolean(user) && faltando.length === 0;

  async function handleFinalizarCompra() {
    setErro("");
    setFinalizando(true);
    try {
      const problemas = await validarEstoque(items);
      if (problemas.length > 0) {
        setErro(
          problemas
            .map((p) =>
              p.disponivel > 0
                ? `${p.nome}: só temos ${p.disponivel} em estoque`
                : `${p.nome}: esgotado`
            )
            .join(" — ")
        );
        setFinalizando(false);
        return;
      }

      const pedido = await criarPedidoFake({ user, itens: items, totalPrice });
      clearCart();
      navigate(`/pedido-confirmado/${pedido.id}`);
    } catch (error) {
      setErro(getErrorMessage(error));
      setFinalizando(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="carrinho-vazio container">
        <h1>Seu carrinho está vazio</h1>
        <p>Adicione produtos pra vê-los aqui.</p>
        <Link to="/produtos" className="btn btn-solid">
          Ver produtos
        </Link>
      </div>
    );
  }

  return (
    <div className="carrinho container">
      <h1>Seu carrinho</h1>

      <div className="carrinho-layout">
        <ul className="carrinho-itens">
          {items.map((item) => (
            <li className="carrinho-item" key={item.id}>
              <div className="carrinho-item-visual">
                <img
                  src={getFileUrl(item, item.featured_image)}
                  alt={item.name}
                />
              </div>

              <div className="carrinho-item-info">
                <Link to={`/produtos/${item.id}`} className="carrinho-item-nome">
                  {item.name}
                </Link>
                <span className="carrinho-item-preco">{formatPreco(item.price)}</span>
              </div>

              <div className="carrinho-item-quantidade">
                <button
                  type="button"
                  aria-label="Diminuir quantidade"
                  onClick={() => updateQuantidade(item.id, item.quantidade - 1)}
                >
                  −
                </button>
                <span>{item.quantidade}</span>
                <button
                  type="button"
                  aria-label="Aumentar quantidade"
                  onClick={() => updateQuantidade(item.id, item.quantidade + 1)}
                  disabled={item.quantidade >= (item.estoque ?? Infinity)}
                >
                  +
                </button>
              </div>

              <span className="carrinho-item-subtotal">
                {formatPreco(item.price * item.quantidade)}
              </span>

              <button
                type="button"
                className="carrinho-item-remover"
                aria-label={`Remover ${item.name}`}
                onClick={() => removeItem(item.id)}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>

        <aside className="carrinho-resumo">
          <h2>Resumo</h2>
          <div className="carrinho-resumo-linha">
            <span>Total</span>
            <span className="carrinho-resumo-total">{formatPreco(totalPrice)}</span>
          </div>
          {erro && <p className="auth-erro">{erro}</p>}

          <button
            type="button"
            className="btn btn-solid carrinho-checkout"
            disabled={!podeComprar || finalizando}
            onClick={handleFinalizarCompra}
          >
            {finalizando ? "Finalizando..." : "Finalizar compra"}
          </button>

          {!user && (
            <p className="carrinho-checkout-aviso">
              <Link to="/entrar">Entre na sua conta</Link> para finalizar a compra.
            </p>
          )}

          {user && faltando.length > 0 && (
            <p className="carrinho-checkout-aviso">
              Complete seu cadastro para comprar: {faltando.join(", ")}.{" "}
              <Link to="/perfil">Ir para o perfil</Link>
            </p>
          )}
          <Link to="/produtos" className="carrinho-continuar">
            Continuar comprando
          </Link>
        </aside>
      </div>
    </div>
  );
}

export default Carrinho;
