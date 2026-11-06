import { carregarMusicas, salvarMusicas } from "./storage.js";
import { gerarId, normalizar } from "./utils.js";

export const AFINACOES_DISPONIVEIS = ["Standard", "Drop D", "Drop C", "D Standard", "Drop B", "DADGAD"];

export function adicionarMusica(dadosMusica) {
  const musicas = carregarMusicas();
  const novaMusica = { id: gerarId(), ...dadosMusica };
  musicas.push(novaMusica);
  salvarMusicas(musicas);
  return novaMusica;
}

export function atualizarMusica(id, dadosAtualizados) {
  const musicas = carregarMusicas();
  const existente = musicas.find(item => String(item.id) === String(id));
  if (!existente) throw new Error("A música não foi encontrada para edição.");

  const fontesExistentes = Array.isArray(existente.fontes) ? existente.fontes : [];
  const fontesAtualizadas = dadosAtualizados.fontes?.length
    ? (fontesExistentes.length ? [dadosAtualizados.fontes[0], ...fontesExistentes.slice(1)] : dadosAtualizados.fontes)
    : fontesExistentes;
  const atualizada = { ...existente, ...dadosAtualizados, fontes: fontesAtualizadas };
  salvarMusicas(musicas.map(item => String(item.id) === String(id) ? atualizada : item));
  return atualizada;
}

export function excluirMusica(id) {
  const musicas = carregarMusicas();
  const encontrada = musicas.find(item => Number(item.id) === Number(id));
  if (!encontrada) return null;
  salvarMusicas(musicas.filter(item => Number(item.id) !== Number(id)));
  return encontrada;
}

export function buscarMusicaPorId(id) {
  return carregarMusicas().find(musica => String(musica.id) === String(id)) || null;
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
