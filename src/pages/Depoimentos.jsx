import "./Depoimentos.css";

const depoimentos = [
  {
    iniciais: "MA",
    nome: "Marina Alves",
    papel: "Cliente há 8 meses",
    texto:
      "Tenho pele sensível e sempre tive irritação com desodorante comum. Com o FIT IT isso simplesmente acabou. Não resseca, não mancha a roupa e ainda protege o dia todo.",
  },
  {
    iniciais: "RS",
    nome: "Rafael Souza",
    papel: "Personal trainer",
    texto:
      "Uso todos os dias na academia e recomendo para todos os meus alunos. Aguenta treino pesado sem perder o efeito e não deixa aquela sensação pegajosa.",
  },
  {
    iniciais: "CD",
    nome: "Camila Duarte",
    papel: "Vegana há 5 anos",
    texto:
      "Sempre foi difícil achar um desodorante vegano que realmente funcionasse. O FIT IT é o primeiro que uso e sinto que a eficácia não deve nada aos convencionais.",
  },
  {
    iniciais: "BL",
    nome: "Bruno Lima",
    papel: "Cliente satisfeito",
    texto:
      "Troquei o desodorante com alumínio que usava há anos e em poucas semanas minha pele embaixo do braço já estava visivelmente mais saudável. Não volto atrás.",
  },
  {
    iniciais: "JR",
    nome: "Juliana Rocha",
    papel: "Dermatologista parceira",
    texto:
      "Indico o FIT IT para pacientes com pele sensível justamente por não conter álcool nem sais de alumínio. Uma fórmula limpa, que respeita a barreira natural da pele.",
  },
  {
    iniciais: "PA",
    nome: "Pedro Almeida",
    papel: "Cliente há 1 ano",
    texto:
      "Além de funcionar muito bem, me sinto bem sabendo que é vegano, não é testado em animais e vem em embalagem reciclável. Consumo consciente sem abrir mão da qualidade.",
  },
];

function Depoimentos() {
  return (
    <div className="depoimentos">
      <section className="depoimentos-hero container">
        <span className="depoimentos-badge">Depoimentos</span>
        <h1>O que dizem quem já usa FIT IT</h1>
        <p>
          Histórias reais de pessoas que trocaram o desodorante convencional
          por uma fórmula natural, vegana e que respeita a pele.
        </p>
      </section>

      <section className="depoimentos-grid container">
        {depoimentos.map((depoimento) => (
          <article className="depoimento-card" key={depoimento.nome}>
            <span className="depoimento-quote" aria-hidden="true">
              &ldquo;
            </span>
            <p className="depoimento-texto">&ldquo;{depoimento.texto}&rdquo;</p>
            <div className="depoimento-estrelas" aria-label="5 de 5 estrelas">
              ★★★★★
            </div>
            <div className="depoimento-autor">
              <span className="depoimento-avatar">{depoimento.iniciais}</span>
              <div>
                <p className="depoimento-nome">{depoimento.nome}</p>
                <p className="depoimento-papel">{depoimento.papel}</p>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

export default Depoimentos;
