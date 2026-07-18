import { useEffect, useState } from "react";
import "./HeroFrasesCarrossel.css";

const frases = ["Não mancha sua pele!", "Não mancha suas roupas!", "Testado por atletas!"];

function HeroFrasesCarrossel() {
  const total = frases.length;
  const trilha = [...frases, frases[0]];

  const [indice, setIndice] = useState(0);
  const [semTransicao, setSemTransicao] = useState(false);

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndice((i) => i + 1);
    }, 5000);
    return () => clearInterval(intervalo);
  }, []);

  useEffect(() => {
    if (indice === total) {
      const timeout = setTimeout(() => {
        setSemTransicao(true);
        setIndice(0);
      }, 600);
      return () => clearTimeout(timeout);
    }
  }, [indice, total]);

  useEffect(() => {
    if (semTransicao) {
      const timeout = setTimeout(() => setSemTransicao(false), 20);
      return () => clearTimeout(timeout);
    }
  }, [semTransicao]);

  return (
    <div className="hero-frase-viewport">
      <div className={`hero-frase-trilha${semTransicao ? " sem-transicao" : ""}`} style={{ transform: `translateX(-${indice * 100}%)` }}>
        {trilha.map((frase, i) => (
          <span className="hero-frase-item" key={`${frase}-${i}`}>
            {frase}
          </span>
        ))}
      </div>
    </div>
  );
}

export default HeroFrasesCarrossel;
