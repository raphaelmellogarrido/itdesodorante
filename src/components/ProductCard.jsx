import { useState } from "react";
import { Link } from "react-router-dom";
import { getFileUrl, stripHtml } from "../lib/pocketbase";
import { useCart } from "../context/CartContext";
import "./ProductCard.css";

function formatPreco(preco) {
  return preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function ProductCard({ produto }) {
  const { addItem } = useCart();
  const [adicionado, setAdicionado] = useState(false);

  const estoque = produto.estoque ?? 0;
  const esgotado = estoque <= 0;

  const handleAdicionar = (event) => {
    event.preventDefault();
    if (esgotado) return;
    addItem(produto, 1);
    setAdicionado(true);
    setTimeout(() => setAdicionado(false), 1800);
  };

  const imageUrl = getFileUrl(produto, produto.featured_image);

  return (
    <Link to={`/produtos/${produto.id}`} className="product-card">
      <div className="product-card-visual">
        <img src={imageUrl} alt={produto.name} loading="lazy" />
        {esgotado && <span className="product-card-esgotado">Esgotado</span>}
      </div>

      <div className="product-card-body">
        <h3 className="product-card-nome">{produto.name}</h3>
        <p className="product-card-resumo">{stripHtml(produto.description)}</p>
        <div className="product-card-footer">
          <span className="product-card-preco">{formatPreco(produto.price)}</span>
          <button
            type="button"
            className={`btn btn-solid product-card-btn${adicionado ? " is-added" : ""}`}
            onClick={handleAdicionar}
            disabled={esgotado}
          >
            {esgotado ? "Esgotado" : adicionado ? "Adicionado ✓" : "Adicionar ao carrinho"}
          </button>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
