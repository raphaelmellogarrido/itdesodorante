import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-inner container">
          <div className="hero-content">
            <span className="hero-badge">Vegano · 0% Álcool · 0% Alumínio</span>
            <h1>
              Proteção que acompanha
              <br /> o seu ritmo.
            </h1>
            <p>
              Conheça a linha FIT IT de desodorantes: fórmulas leves,
              veganas e desenvolvidas para o seu dia a dia.
            </p>
            <div className="hero-actions">
              <Link to="/produtos" className="btn btn-solid">
                Ver produtos
              </Link>
              <Link to="/registrar" className="btn btn-outline">
                Criar conta
              </Link>
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="hero-bottle">
              <div className="hero-bottle-cap" />
              <div className="hero-bottle-body">
                <span className="hero-bottle-brand">
                  <em>FIT</em>
                  IT
                </span>
                <span className="hero-bottle-label">DESODORANTE</span>
                <span className="hero-bottle-band">NEUTRO</span>
              </div>
            </div>
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
    </div>
  );
}

export default Home;
