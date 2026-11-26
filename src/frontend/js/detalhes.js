import { buscarMusicaPorId } from "./musicas.js";
import { renderizarDetalhes } from "./ui.js";
export async function inicializarDetalhes() {
  const detalhe = document.querySelector("#song-detail");
  const naoEncontrada = document.querySelector("#detail-not-found");
  try {
    const musica = await buscarMusicaPorId(new URLSearchParams(window.location.search).get("id"));
    if (!musica) { detalhe?.classList.add("hidden"); naoEncontrada?.classList.remove("hidden"); return; }
    renderizarDetalhes(musica);
  } catch (erro) {
    if (detalhe) detalhe.innerHTML = `<div class="empty-state"><strong>Não foi possível carregar a música</strong><p>${erro.message}</p></div>`;
  }
}
