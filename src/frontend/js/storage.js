export const STORAGE_KEY = "riffly.musicas";

export const musicasIniciais = [
  { id: 1, titulo: "Everlong", artista: "Foo Fighters", album: "The Colour and the Shape", afinacao: "Drop D", instrumento: "Guitarra", genero: "Rock", dificuldade: "Intermediária", status: "Aprendendo", tags: ["Rock", "Riff"], observacoes: "", fontes: [{ tipo: "YouTube", url: "https://www.youtube.com/" }] },
  { id: 2, titulo: "Nothing Else Matters", artista: "Metallica", album: "Metallica", afinacao: "Standard", instrumento: "Guitarra", genero: "Metal", dificuldade: "Intermediária", status: "Dominada", tags: ["Rock", "Fingerstyle"], observacoes: "", fontes: [] },
  { id: 3, titulo: "Blackbird", artista: "The Beatles", album: "The Beatles", afinacao: "Standard", instrumento: "Violão", genero: "Rock", dificuldade: "Avançada", status: "Em prática", tags: ["Fingerstyle"], observacoes: "", fontes: [] }
];

export function normalizarMusica(musica) {
  return {
    ...musica,
    tags: Array.isArray(musica.tags) ? musica.tags : [],
    fontes: Array.isArray(musica.fontes)
      ? musica.fontes.filter(fonte => fonte && (fonte.tipo || fonte.url))
      : musica.sourceUrl ? [{ tipo: musica.sourceType || "Fonte", url: musica.sourceUrl }] : []
  };
}

export function carregarMusicas() {
  const salvo = localStorage.getItem(STORAGE_KEY);
  if (!salvo) {
    const iniciais = musicasIniciais.map(normalizarMusica);
    salvarMusicas(iniciais);
    return iniciais;
  }
  try {
    const dados = JSON.parse(salvo);
    if (!Array.isArray(dados)) throw new Error("Formato inválido");
    return dados.map(normalizarMusica);
  } catch {
    const iniciais = musicasIniciais.map(normalizarMusica);
    salvarMusicas(iniciais);
    return iniciais;
  }
}

export function salvarMusicas(musicas) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(musicas.map(normalizarMusica)));
}
