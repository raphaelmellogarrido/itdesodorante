import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { getFileUrl } from "../lib/pocketbase";
import "./Carrinho.css";

function formatPreco(preco) {
  return preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function Carrinho() {
  const { items, updateQuantidade, removeItem, totalPrice } = useCart();

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
          <button type="button" className="btn btn-solid carrinho-checkout" disabled>
            Finalizar compra
          </button>
          <p className="carrinho-checkout-aviso">
            Finalização de compra ainda não disponível.
          </p>
          <Link to="/produtos" className="carrinho-continuar">
            Continuar comprando
          </Link>
        </aside>
      </div>
    </div>
  );
}

export default Carrinho;
