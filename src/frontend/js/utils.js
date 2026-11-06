export function gerarId() {
  return Date.now() + Math.floor(Math.random() * 1000);
}

export function normalizar(valor) {
  return String(valor ?? "").trim().toLowerCase();
}

export function escaparHtml(valor) {
  return String(valor ?? "").replace(/[&<>"']/g, caractere => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[caractere]));
}

export function classeStatus(status) {
  return {
    "Aprendendo": "status-aprendendo",
    "Dominada": "status-dominada",
    "Em prática": "status-em-pratica",
    "Não iniciada": "status-nao-iniciada"
  }[status] || "status-nao-iniciada";
}

export function mostrarMensagem(id, texto, tipo = "") {
  const elemento = document.querySelector(`#${id}`);
  if (!elemento) return;
  elemento.textContent = texto;
  elemento.className = `form-message ${tipo}`.trim();
}
