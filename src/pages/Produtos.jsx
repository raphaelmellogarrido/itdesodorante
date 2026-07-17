import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { pb } from "../lib/pocketbase";
import "./Produtos.css";

function Produtos() {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    pb.collection("products")
      .getFullList({ sort: "-created", signal: controller.signal })
      .then((registros) => setProdutos(registros))
      .catch((error) => {
        if (!controller.signal.aborted) setErro(true);
        if (!controller.signal.aborted) console.error(error);
      })
      .finally(() => {
        if (!controller.signal.aborted) setCarregando(false);
      });

    return () => controller.abort();
  }, []);

  return (
    <div className="produtos">
      <section className="produtos-hero container">
        <div className="produtos-hero-content">
          <span className="produtos-badge">Catálogo</span>
          <h1>Nossos produtos</h1>
          <p>
            Fórmulas veganas, sem álcool e sem alumínio, pensadas para o
            corpo e para os pés.
          </p>
        </div>
      </section>

      {carregando && (
        <p className="produtos-estado container">Carregando produtos...</p>
      )}

      {!carregando && erro && (
        <p className="produtos-estado container">
          Não foi possível carregar os produtos agora. Tente novamente em
          instantes.
        </p>
      )}

      {!carregando && !erro && produtos.length === 0 && (
        <p className="produtos-estado container">
          Nenhum produto cadastrado ainda.
        </p>
      )}

      {!carregando && !erro && produtos.length > 0 && (
        <section className="produtos-grid container">
          {produtos.map((produto) => (
            <ProductCard produto={produto} key={produto.id} />
          ))}
        </section>
      )}
    </div>
  );
}

export default Produtos;
