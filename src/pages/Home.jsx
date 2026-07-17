import { Link } from "react-router-dom";
import produtosImagem from "../assets/all_home_page.png";
import DepoimentosCarrossel from "../components/DepoimentosCarrossel";
import HeroFrasesCarrossel from "../components/HeroFrasesCarrossel";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <HeroFrasesCarrossel />
        </div>
        <div className="hero-inner container">
          <div className="hero-content">
            <span className="hero-badge">Vegano · 0% Álcool · 0% Alumínio</span>
            <h1>
              Proteção que acompanha
              <br /> o seu ritmo.
            </h1>
            <p>Conheça a linha IT de desodorantes: fórmulas leves, veganas e desenvolvidas para o seu dia a dia.</p>
            <div className="hero-actions">
              <Link to="/produtos" className="btn btn-solid">
                Ver produtos
              </Link>
            </div>
          </div>

          <div className="hero-visual">
            <img src={produtosImagem} alt="Linha de desodorantes FIT IT: roll-on Fresh, roll-on Exclusive Premium, roll-on Neutro e spray IT Foot" className="hero-produtos-imagem" />
          </div>
        </div>
      </section>

      <section className="features container">
        <div className="feature-card">
          <h3>Vegano</h3>
          <p>Nenhum ingrediente de origem animal em nossas fórmulas.</p>
        </div>
        <div className="feature-card">
          <h3>0% Álcool</h3>
          <p>Suave com a pele, sem ressecar ou irritar.</p>
        </div>
        <div className="feature-card">
          <h3>0% Alumínio</h3>
          <p>Proteção eficaz sem sais de alumínio na composição.</p>
        </div>
      </section>

      <DepoimentosCarrossel />
    </div>
  );
}

export default Home;
