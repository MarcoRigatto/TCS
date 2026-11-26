import { carregarMusicas } from "./storage.js";
import { renderizarDashboard } from "./ui.js";
export async function inicializarDashboard() {
  try { renderizarDashboard(await carregarMusicas()); }
  catch (erro) { const alvo = document.querySelector("#recent-songs"); if (alvo) alvo.innerHTML = `<div class="empty-state"><strong>Não foi possível carregar a biblioteca</strong><p>${erro.message}</p></div>`; }
}
