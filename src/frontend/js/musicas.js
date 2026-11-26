import { carregarMusicas, criarMusicaNaApi, atualizarMusicaNaApi, buscarMusicaNaApi, excluirMusicaNaApi } from "./storage.js";
import { normalizar } from "./utils.js";

export const AFINACOES_DISPONIVEIS = ["Standard", "Drop D", "Drop C", "D Standard", "Drop B", "DADGAD"];

export async function adicionarMusica(dadosMusica) {
  return criarMusicaNaApi(dadosMusica);
}

export async function atualizarMusica(id, dadosAtualizados) {
  return atualizarMusicaNaApi(id, dadosAtualizados);
}

export async function excluirMusica(id) {
  await excluirMusicaNaApi(id);
}

export async function buscarMusicaPorId(id) {
  try { return await buscarMusicaNaApi(id); }
  catch (erro) {
    if (erro.message === "Musica nao encontrada.") return null;
    throw erro;
  }
}

export function filtrarMusicas(musicas, filtros) {
  return musicas.filter(musica => {
    const tituloOk = !filtros.titulo || normalizar(musica.titulo).includes(filtros.titulo);
    const artistaOk = !filtros.artista || normalizar(musica.artista) === filtros.artista;
    const afinacaoOk = !filtros.afinacao || normalizar(musica.afinacao) === filtros.afinacao;
    const dificuldadeOk = !filtros.dificuldade || normalizar(musica.dificuldade) === filtros.dificuldade;
    const statusOk = !filtros.status || normalizar(musica.status) === filtros.status;
    const generoOk = !filtros.genero || normalizar(musica.genero).includes(filtros.genero);
    return tituloOk && artistaOk && afinacaoOk && dificuldadeOk && statusOk && generoOk;
  });
}
