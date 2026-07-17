export function formatarCPF(valor) {
  return valor
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

export function formatarTelefone(valor) {
  return valor
    .replace(/\D/g, "")
    .slice(0, 11)
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2");
}

export function formatarCEP(valor) {
  return valor
    .replace(/\D/g, "")
    .slice(0, 8)
    .replace(/(\d{5})(\d)/, "$1-$2");
}

export function validarCPF(cpf) {
  const digitos = cpf.replace(/\D/g, "");

  if (digitos.length !== 11 || /^(\d)\1{10}$/.test(digitos)) {
    return false;
  }

  let soma = 0;
  for (let i = 0; i < 9; i++) {
    soma += Number(digitos[i]) * (10 - i);
  }
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== Number(digitos[9])) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) {
    soma += Number(digitos[i]) * (11 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== Number(digitos[10])) return false;

  return true;
}
