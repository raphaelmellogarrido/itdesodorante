import PocketBase from "pocketbase";

export const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL);

export function getFileUrl(record, filename) {
  if (!record || !filename) return "";
  return pb.files.getURL(record, filename);
}

const MENSAGENS_POR_CODIGO = {
  validation_not_unique: "Este e-mail já está cadastrado. Tente entrar ou use outro e-mail.",
  validation_is_email: "Digite um e-mail válido.",
  validation_required: "Preencha todos os campos.",
  validation_min_text_constraint: "A senha precisa ter pelo menos 8 caracteres.",
};

export function getErrorMessage(error) {
  const fieldErrors = error?.response?.data;
  if (fieldErrors && Object.keys(fieldErrors).length > 0) {
    return Object.values(fieldErrors)
      .map((fieldError) => MENSAGENS_POR_CODIGO[fieldError.code] || fieldError.message)
      .join(" ");
  }
  return error?.response?.message || error?.message || "Algo deu errado. Tente novamente.";
}

export function stripHtml(html) {
  if (!html) return "";
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent.replace(/\s+/g, " ").trim();
}
