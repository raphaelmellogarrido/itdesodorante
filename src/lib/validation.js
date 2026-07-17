import { pb } from "./pocketbase";

const SENHAS_COMUNS = ["12345678", "123456789", "1234567890", "password", "senha123", "senha1234", "qwerty123", "11111111", "00000000", "87654321", "abcdefgh", "letmein1", "iloveyou", "admin123", "brasil123", "12345678a"];

export function validarSenha(senha) {
  if (senha.length < 8) {
    return "A senha precisa ter pelo menos 8 caracteres.";
  }

  if (SENHAS_COMUNS.includes(senha.toLowerCase())) {
    return "Senha fraca.";
  }

  const temLetra = /[a-zA-Z]/.test(senha);
  const temNumero = /[0-9]/.test(senha);

  if (!temLetra || !temNumero) {
    return "A senha precisa ter letras e números.";
  }

  return null;
}

export function nomeValido(nome) {
  return nome.trim().length >= 4;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function emailValido(email) {
  return EMAIL_REGEX.test(email);
}

export async function verificarEmailDisponivel(email) {
  try {
    const url = pb.buildURL(`/api/check-email?email=${encodeURIComponent(email)}`);
    const response = await fetch(url);
    const data = await response.json();
    return !data.exists;
  } catch {
    return null;
  }
}
