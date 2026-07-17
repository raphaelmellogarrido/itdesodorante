import { useEffect, useState } from "react";
import "./DepoimentosCarrossel.css";

const depoimentos = [
  {
    icone: "🌿",
    tags: ["Pele sensível", "Sem irritação"],
    texto: "Tenho pele sensível e sempre tive irritação com desodorante comum. Com o IT desodorante isso simplesmente acabou. Não resseca e ainda protege o dia todo.",
    avatar: "https://i.pravatar.cc/150?img=5",
    nome: "Marina Alves",
    papel: "Cliente há 8 meses",
  },
  {
    icone: "💪",
    tags: ["Academia", "Longa duração"],
    texto: "Uso todos os dias na academia e recomendo pros meus alunos. Aguenta treino pesado sem perder o efeito nem deixar aquela sensação pegajosa.",
    avatar: "https://i.pravatar.cc/150?img=12",
    nome: "Rafael Souza",
    papel: "Personal trainer",
  },
  {
    icone: "🌱",
    tags: ["Vegano", "Cruelty-free"],
    texto: "Sempre foi difícil achar um desodorante vegano que realmente funcionasse. O IT desodorante não deve nada aos convencionais.",
    avatar: "https://i.pravatar.cc/150?img=23",
    nome: "Camila Duarte",
    papel: "Vegana há 5 anos",
  },
  {
    icone: "🛡️",
    tags: ["Sem alumínio", "Pele saudável"],
    texto: "Troquei o desodorante com alumínio que usava há anos. Em poucas semanas minha pele embaixo do braço já estava visivelmente mais saudável.",
    avatar: "https://i.pravatar.cc/150?img=32",
    nome: "Bruna Lima",
    papel: "Cliente satisfeita",
  },
  {
    icone: "⭐",
    tags: ["Indicação", "Fórmula limpa"],
    texto: "Indico o IT desodorante pra pacientes com pele sensível justamente por não conter álcool nem sais de alumínio. Uma fórmula que respeita a pele.",
    avatar: "https://i.pravatar.cc/150?img=44",
    nome: "Juliana Rocha",
    papel: "Dermatologista parceira",
  },
  {
    icone: "♻️",
    tags: ["Sustentável", "Embalagem reciclável"],
    texto: "Além de funcionar muito bem, me sinto bem sabendo que é vegano e vem em embalagem reciclável. Consumo consciente sem abrir mão da qualidade.",
    avatar: "https://i.pravatar.cc/150?img=51",
    nome: "Pedro Almeida",
    papel: "Cliente há 1 ano",
  },
  {
    icone: "👪",
    tags: ["Uso em família", "Aprovação geral"],
    texto: "Comprei pra família inteira depois que testei. Meus filhos adolescentes também usam e aprovaram — coisa rara em casa.",
    avatar: "https://i.pravatar.cc/150?img=27",
    nome: "Fernanda Costa",
    papel: "Mãe de 3 filhos",
  },
  {
    icone: "🏃",
    tags: ["Alta performance", "Sem irritação"],
    texto: "Corro todo fim de semana e o IT desodorante aguenta o treino inteiro sem perder o efeito nem irritar a pele, mesmo com o atrito da roupa.",
    avatar: "https://i.pravatar.cc/150?img=60",
    nome: "Lucas Martins",
    papel: "Corredor amador",
  },
  {
    icone: "📦",
    tags: ["Entrega rápida", "Bom atendimento"],
    texto: "Pedido chegou rapidinho e bem embalado. O atendimento respondeu todas as minhas dúvidas antes mesmo de eu decidir comprar.",
    avatar: "https://i.pravatar.cc/150?img=8",
    nome: "Bernardo Fernandes",
    papel: "Cliente satisfeito",
  },
  {
    icone: "🔁",
    tags: ["Cliente recorrente", "Recomendo"],
    texto: "Já é o quarto pote que compro. Uma vez que você experimenta o IT desodorante, não dá muita vontade de voltar pro desodorante comum.",
    avatar: "https://i.pravatar.cc/150?img=68",
    nome: "Thiago Nascimento",
    papel: "Cliente recorrente",
  },
];

function useVisiveis() {
  const [visiveis, setVisiveis] = useState(3);

  useEffect(() => {
    function calcular() {
      if (window.innerWidth < 640) setVisiveis(1);
      else if (window.innerWidth < 980) setVisiveis(2);
      else setVisiveis(3);
    }
    calcular();
    window.addEventListener("resize", calcular);
    return () => window.removeEventListener("resize", calcular);
  }, []);

  return visiveis;
}

function DepoimentosCarrossel() {
  const visiveis = useVisiveis();
  const total = depoimentos.length;
  const trilha = [...depoimentos, ...depoimentos.slice(0, visiveis)];

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
    <section className="depoimentos-home container">
      <div className="depoimentos-home-cabecalho">
        <span className="depoimentos-home-badge">Depoimentos</span>
        <h2>O que dizem quem já usa IT desodorante</h2>
      </div>

      <div className="carrossel-viewport" style={{ "--visiveis": visiveis }}>
        <div className={`carrossel-trilha${semTransicao ? " sem-transicao" : ""}`} style={{ transform: `translateX(-${(100 / visiveis) * indice}%)` }}>
          {trilha.map((dep, i) => (
            <div className="carrossel-slide" key={`${dep.nome}-${i}`}>
              <article className="carrossel-card">
                <span className="carrossel-icone">{dep.icone}</span>
                <p className="carrossel-texto">"{dep.texto}"</p>
                <div className="carrossel-tags">
                  {dep.tags.map((tag) => (
                    <span className="carrossel-tag" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="carrossel-autor">
                  <img src={dep.avatar} alt="" className="carrossel-avatar" />
                  <div>
                    <p className="carrossel-nome">{dep.nome}</p>
                    <p className="carrossel-papel">{dep.papel}</p>
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default DepoimentosCarrossel;
