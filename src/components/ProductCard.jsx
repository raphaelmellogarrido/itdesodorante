import { useState } from "react";
import { Link } from "react-router-dom";
import { getFileUrl, stripHtml } from "../lib/pocketbase";
import "./ProductCard.css";

function formatPreco(preco) {
  return preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function ProductCard({ produto }) {
  const [adicionado, setAdicionado] = useState(false);

  const handleAdicionar = (event) => {
    event.preventDefault();
    setAdicionado(true);
    setTimeout(() => setAdicionado(false), 1800);
  };

  const imageUrl = getFileUrl(produto, produto.featured_image);

  return (
    <Link to={`/produtos/${produto.id}`} className="product-card">
      <div className="product-card-visual">
        <img src={imageUrl} alt={produto.name} loading="lazy" />
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
          >
            {adicionado ? "Adicionado ✓" : "Adicionar ao carrinho"}
          </button>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
