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
