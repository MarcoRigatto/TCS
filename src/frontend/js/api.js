const ITUNES_URL = "https://itunes.apple.com/search";
const JSON_PLACEHOLDER_URL = "https://jsonplaceholder.typicode.com/posts";

export async function buscarMusicasExternas(termo) {
  const parametros = new URLSearchParams({ term: termo, media: "music", entity: "song", limit: "12", country: "br" });
  const resposta = await fetch(`${ITUNES_URL}?${parametros.toString()}`);
  if (!resposta.ok) throw new Error(`A busca externa respondeu com status ${resposta.status}.`);
  const dados = await resposta.json();
  if (!dados || !Array.isArray(dados.results)) throw new Error("A resposta da busca veio em um formato inesperado.");
  return dados.results;
}

export async function enviarMusicaParaServicoTeste(musica) {
  const resposta = await fetch(JSON_PLACEHOLDER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=UTF-8" },
    body: JSON.stringify({
      title: musica.trackName,
      body: `Artista: ${musica.artistName}. Álbum: ${musica.collectionName || "Não informado"}. Enviado pelo Riffly para demonstração da Etapa 5.`,
      userId: 1
    })
  });
  if (!resposta.ok) throw new Error(`O serviço de teste respondeu com status ${resposta.status}.`);
  return resposta.json();
}
