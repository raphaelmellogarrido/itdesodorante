import { Link } from "react-router-dom";
import "./Sobre.css";

function Sobre() {
  return (
    <div className="sobre">
      <section className="sobre-hero">
        <div className="sobre-hero-inner container">
          <div className="sobre-hero-content">
            <span className="sobre-badge">Nossa história</span>
            <h1>
              Reinventamos o desodorante para respeitar
              <br /> a sua pele e o meio ambiente.
            </h1>
            <p>
              A FIT IT nasceu de uma pergunta simples: por que aceitar
              irritação, manchas na roupa e ingredientes agressivos só para
              ficar protegido o dia todo? Fomos atrás de uma fórmula
              diferente — e criamos um desodorante 100% natural, vegano e
              livre de alumínio e álcool.
            </p>
          </div>
        </div>
      </section>

      <section className="sobre-story container">
        <div className="sobre-story-text">
          <h2>Inovação que nasceu da insatisfação</h2>
          <p>
            Cansados dos desodorantes tradicionais cheios de sais de
            alumínio, álcool e conservantes agressivos, reunimos
            dermatologistas, químicos cosméticos e apaixonados por
            veganismo para desenvolver uma fórmula própria, testada e
            aprovada em laboratório antes de chegar até você.
          </p>
          <p>
            O resultado é o FIT IT: um desodorante que neutraliza o odor
            usando ativos de origem vegetal, sem bloquear os poros e sem
            interferir no processo natural de transpiração do corpo — porque
            proteção e saúde da pele não deveriam ser escolhas opostas.
          </p>
        </div>
        <div className="sobre-story-values">
          <div className="sobre-value-card">
            <h3>100% Natural</h3>
            <p>
              Ativos de origem vegetal no lugar de sais de alumínio e
              álcool, com a mesma eficácia que você espera.
            </p>
          </div>
          <div className="sobre-value-card">
            <h3>Não agride a pele</h3>
            <p>
              Fórmula dermatologicamente testada, sem ressecar, manchar ou
              irritar — inclusive em peles sensíveis.
            </p>
          </div>
          <div className="sobre-value-card">
            <h3>Feito para durar</h3>
            <p>
              Proteção que acompanha o seu ritmo, do treino ao expediente,
              sem precisar reaplicar.
            </p>
          </div>
        </div>
      </section>

      <section className="sobre-vegan">
        <div className="sobre-vegan-inner container">
          <div className="sobre-vegan-badge" aria-hidden="true">
            🌱
          </div>
          <h2>Vegano de verdade, do frasco à fórmula</h2>
          <p>
            Todo produto FIT IT é 100% vegano: nenhum ingrediente de origem
            animal entra na composição, e nunca testamos em animais. Isso
            também significa uma fórmula mais limpa para você — sem
            derivados que sobrecarregam a pele ou o meio ambiente.
          </p>
          <p>
            Também é livre de parabenos, alumínio e álcool, os principais
            responsáveis por irritações, ressecamento e obstrução dos poros
            nos desodorantes convencionais. O que sobra é proteção real,
            sem abrir mão da sua saúde: nada de substâncias associadas a
            riscos de longo prazo, nada de químicos desnecessários — só o
            essencial para você se sentir bem e confiante o dia inteiro.
          </p>
          <p>
            E porque acreditamos que cuidar de você é também cuidar do
            planeta, nossas embalagens são recicláveis e a produção segue
            práticas sustentáveis do início ao fim.
          </p>
        </div>
      </section>

      <section className="sobre-cta container">
        <h2>Quer sentir a diferença?</h2>
        <p>Conheça a linha completa e escolha o FIT IT ideal para você.</p>
        <Link to="/produtos" className="btn btn-solid">
          Ver produtos
        </Link>
      </section>
    </div>
  );
}

export default Sobre;
