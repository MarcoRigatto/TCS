import { buscarMusicaPorId } from "./musicas.js";
import { renderizarDetalhes } from "./ui.js";
export function inicializarDetalhes() {
  const musica = buscarMusicaPorId(new URLSearchParams(window.location.search).get("id"));
  const detalhe = document.querySelector("#music-detail");
  const naoEncontrada = document.querySelector("#music-not-found");
  if (!musica) { detalhe?.classList.add("hidden"); naoEncontrada?.classList.remove("hidden"); return; }
  renderizarDetalhes(musica);
}
