import PocketBase from "pocketbase";

export const pb = new PocketBase(import.meta.env.VITE_POCKETBASE_URL);

export function getFileUrl(record, filename) {
  if (!record || !filename) return "";
  return pb.files.getURL(record, filename);
}

export function getErrorMessage(error) {
  const fieldErrors = error?.response?.data;
  if (fieldErrors && Object.keys(fieldErrors).length > 0) {
    return Object.values(fieldErrors)
      .map((fieldError) => fieldError.message)
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
