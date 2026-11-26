export const API_BASE_URL = "http://localhost:3000/api";

export function normalizarMusica(musica) {
  return {
    ...musica,
    tags: Array.isArray(musica.tags) ? musica.tags : [],
    fontes: Array.isArray(musica.fontes) ? musica.fontes : []
  };
}

async function requisicao(endpoint, opcoes = {}) {
  let resposta;
  try {
    resposta = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...opcoes,
      headers: { "Content-Type": "application/json", ...(opcoes.headers || {}) }
    });
  } catch {
    throw new Error("Não foi possível acessar a API. Verifique se o backend está iniciado em http://localhost:3000.");
  }
  const resultado = await resposta.json().catch(() => ({}));
  if (!resposta.ok) throw new Error(resultado?.erro?.mensagem || "A API não conseguiu concluir a operação.");
  return resultado;
}

export async function carregarMusicas() {
  const resultado = await requisicao("/musicas");
  return (resultado.dados || []).map(normalizarMusica);
}

export async function buscarMusicaNaApi(id) {
  const resultado = await requisicao(`/musicas/${encodeURIComponent(id)}`);
  return normalizarMusica(resultado.dados);
}

export async function criarMusicaNaApi(dados) {
  const resultado = await requisicao("/musicas", { method: "POST", body: JSON.stringify(dados) });
  return normalizarMusica(resultado.dados);
}

export async function atualizarMusicaNaApi(id, dados) {
  const resultado = await requisicao(`/musicas/${encodeURIComponent(id)}`, { method: "PUT", body: JSON.stringify(dados) });
  return normalizarMusica(resultado.dados);
}

export async function excluirMusicaNaApi(id) {
  return requisicao(`/musicas/${encodeURIComponent(id)}`, { method: "DELETE" });
}
