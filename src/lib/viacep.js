export async function buscarEnderecoPorCep(cep) {
  const digitos = cep.replace(/\D/g, "");
  if (digitos.length !== 8) return null;

  try {
    const response = await fetch(`https://viacep.com.br/ws/${digitos}/json/`);
    const data = await response.json();
    if (data.erro) return null;

    return {
      endereco: data.logradouro || "",
      bairro: data.bairro || "",
      cidade: data.localidade || "",
      estado: data.uf || "",
    };
  } catch {
    return null;
  }
}
