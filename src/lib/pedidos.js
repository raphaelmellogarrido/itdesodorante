import { pb } from "./pocketbase";

const CAMPOS_OBRIGATORIOS = [
  ["name", "Nome"],
  ["telefone", "Telefone"],
  ["cpf", "CPF"],
  ["cep", "CEP"],
  ["endereco", "Endereço"],
  ["numero", "Número"],
  ["bairro", "Bairro"],
  ["cidade", "Cidade"],
  ["estado", "Estado"],
];

const PREVISOES_ENTREGA = [
  "Chega em 3 a 5 dias úteis",
  "Chega em 5 a 7 dias úteis",
  "Chega em 7 a 10 dias úteis",
  "Chega em até 6 dias úteis",
];

export function camposFaltando(user) {
  if (!user) return CAMPOS_OBRIGATORIOS.map(([, label]) => label);
  return CAMPOS_OBRIGATORIOS.filter(([campo]) => !user[campo]).map(([, label]) => label);
}

export function gerarPrevisaoEntrega() {
  return PREVISOES_ENTREGA[Math.floor(Math.random() * PREVISOES_ENTREGA.length)];
}

export function gerarNumeroPedido() {
  return Math.floor(100000000 + Math.random() * 900000000);
}

export async function validarEstoque(itens) {
  const problemas = [];

  for (const item of itens) {
    try {
      const produto = await pb.collection("products").getOne(item.id, { requestKey: null });
      const disponivel = produto.estoque ?? 0;
      if (disponivel < item.quantidade) {
        problemas.push({ nome: item.name, disponivel });
      }
    } catch {
      problemas.push({ nome: item.name, disponivel: 0 });
    }
  }

  return problemas;
}

export async function criarPedidoFake({ user, itens, totalPrice }) {
  const previsao_entrega = gerarPrevisaoEntrega();
  const numero_pedido = gerarNumeroPedido();

  const pedido = await pb.collection("pedidos").create({
    user: user.id,
    itens,
    total: totalPrice,
    status: "pago",
    endereco_entrega: {
      cep: user.cep,
      endereco: user.endereco,
      numero: user.numero,
      complemento: user.complemento,
      bairro: user.bairro,
      cidade: user.cidade,
      estado: user.estado,
    },
    previsao_entrega,
    numero_pedido,
  });

  return pedido;
}
