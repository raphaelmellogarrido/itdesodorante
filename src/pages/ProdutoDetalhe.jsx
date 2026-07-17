import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { pb, getFileUrl, stripHtml } from "../lib/pocketbase";
import { useCart } from "../context/CartContext";
import "./ProdutoDetalhe.css";

function formatPreco(preco) {
  return preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function ProdutoDetalhe() {
  const { id } = useParams();
  const { addItem } = useCart();
  const [produto, setProduto] = useState(null);
  const [outrosProdutos, setOutrosProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [naoEncontrado, setNaoEncontrado] = useState(false);
  const [imagemAtiva, setImagemAtiva] = useState(null);
  const [quantidade, setQuantidade] = useState(1);
  const [adicionado, setAdicionado] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setCarregando(true);
    setNaoEncontrado(false);
    setQuantidade(1);

    pb.collection("products")
      .getOne(id, { signal: controller.signal })
      .then((registro) => {
        setProduto(registro);
        setImagemAtiva(registro.featured_image);
        return pb.collection("products").getFullList({
          sort: "-created",
          signal: controller.signal,
        });
      })
      .then((todos) => {
        if (todos) {
          setOutrosProdutos(todos.filter((item) => item.id !== id));
        }
      })
      .catch((error) => {
        if (!controller.signal.aborted) {
          setNaoEncontrado(true);
          console.error(error);
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setCarregando(false);
      });

    return () => controller.abort();
  }, [id]);

  const handleAdicionar = () => {
    addItem(produto, quantidade);
    setAdicionado(true);
    setTimeout(() => setAdicionado(false), 1800);
  };

  if (carregando) {
    return <p className="produto-estado container">Carregando produto...</p>;
  }

  if (naoEncontrado || !produto) {
    return (
      <div className="produto-estado container">
        <p>Produto não encontrado.</p>
        <Link to="/produtos" className="btn btn-solid">
          Voltar para produtos
        </Link>
      </div>
    );
  }

  const miniaturas = [produto.featured_image, ...(produto.gallery_image || [])];

  return (
    <div className="produto-detalhe">
      <div className="produto-breadcrumb container">
        <Link to="/produtos">Produtos</Link>
        <span> / </span>
        <span>{produto.name}</span>
      </div>

      <section className="produto-topo container">
        <div className="produto-galeria">
          <div className="produto-imagem-principal">
            <img src={getFileUrl(produto, imagemAtiva)} alt={produto.name} />
          </div>

          {miniaturas.length > 1 && (
            <div className="produto-miniaturas">
              {miniaturas.map((arquivo, index) => (
                <button
                  type="button"
                  key={arquivo + index}
                  className={`produto-miniatura${
                    arquivo === imagemAtiva ? " is-ativa" : ""
                  }`}
                  onClick={() => setImagemAtiva(arquivo)}
                  aria-label={`Ver foto ${index + 1} de ${produto.name}`}
                >
                  <img src={getFileUrl(produto, arquivo)} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="produto-info">
          <h1>{produto.name}</h1>

          <p className="produto-resumo">{stripHtml(produto.description)}</p>

          <span className="produto-preco">{formatPreco(produto.price)}</span>

          <div className="produto-compra">
            <div className="produto-quantidade">
              <button
                type="button"
                aria-label="Diminuir quantidade"
                onClick={() => setQuantidade((q) => Math.max(1, q - 1))}
              >
                −
              </button>
              <span>{quantidade}</span>
              <button
                type="button"
                aria-label="Aumentar quantidade"
                onClick={() => setQuantidade((q) => q + 1)}
              >
                +
              </button>
            </div>

            <button
              type="button"
              className={`btn btn-solid produto-add-btn${adicionado ? " is-added" : ""}`}
              onClick={handleAdicionar}
            >
              {adicionado ? "Adicionado ao carrinho ✓" : "Adicionar ao carrinho"}
            </button>
          </div>
        </div>
      </section>

      {outrosProdutos.length > 0 && (
        <section className="produto-relacionados container">
          <h2>Você também pode gostar</h2>
          <div className="produto-relacionados-grid">
            {outrosProdutos.map((item) => (
              <Link
                to={`/produtos/${item.id}`}
                className="produto-relacionado-card"
                key={item.id}
              >
                <div className="produto-relacionado-visual">
                  <img src={getFileUrl(item, item.featured_image)} alt={item.name} />
                </div>
                <div>
                  <h3>{item.name}</h3>
                  <span>{formatPreco(item.price)}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default ProdutoDetalhe;
