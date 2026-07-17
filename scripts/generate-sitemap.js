import { writeFile } from "node:fs/promises";
import { join } from "node:path";

const BASE_URL = "https://itdesodorante.com.br";
const POCKETBASE_URL = process.env.VITE_POCKETBASE_URL || BASE_URL;

const PAGINAS_ESTATICAS = [
  { loc: "/", changefreq: "weekly", priority: "1.0" },
  { loc: "/sobre", changefreq: "monthly", priority: "0.6" },
  { loc: "/produtos", changefreq: "weekly", priority: "0.9" },
  { loc: "/politica-de-privacidade", changefreq: "yearly", priority: "0.2" },
  { loc: "/termos-de-uso", changefreq: "yearly", priority: "0.2" },
];

async function buscarProdutos() {
  try {
    const resposta = await fetch(
      `${POCKETBASE_URL}/api/collections/products/records?perPage=200&fields=id,updated`
    );
    if (!resposta.ok) throw new Error(`HTTP ${resposta.status}`);
    const dados = await resposta.json();
    return dados.items || [];
  } catch (erro) {
    console.warn("Não foi possível buscar produtos do PocketBase para o sitemap:", erro.message);
    return [];
  }
}

function gerarUrlXml({ loc, changefreq, priority, lastmod }) {
  return [
    "  <url>",
    `    <loc>${BASE_URL}${loc}</loc>`,
    lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
    `    <changefreq>${changefreq}</changefreq>`,
    `    <priority>${priority}</priority>`,
    "  </url>",
  ]
    .filter(Boolean)
    .join("\n");
}

async function gerarSitemap() {
  const produtos = await buscarProdutos();

  const urlsProdutos = produtos.map((produto) =>
    gerarUrlXml({
      loc: `/produtos/${produto.id}`,
      changefreq: "monthly",
      priority: "0.7",
      lastmod: produto.updated ? produto.updated.slice(0, 10) : undefined,
    })
  );

  const urlsEstaticas = PAGINAS_ESTATICAS.map((pagina) => gerarUrlXml(pagina));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${[
    ...urlsEstaticas,
    ...urlsProdutos,
  ].join("\n")}\n</urlset>\n`;

  await writeFile(join(process.cwd(), "public", "sitemap.xml"), xml, "utf-8");

  console.log(
    `sitemap.xml gerado: ${PAGINAS_ESTATICAS.length} páginas estáticas + ${produtos.length} produtos.`
  );
}

gerarSitemap();
