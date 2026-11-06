import { AFINACOES_DISPONIVEIS } from "./musicas.js";
import { escaparHtml, classeStatus } from "./utils.js";

export function criarCardMusica(musica, permitirExcluir = false) {
  const acoes = permitirExcluir
    ? `<div class="card-actions"><a class="button button-secondary" href="musica.html?id=${encodeURIComponent(musica.id)}">Ver música</a><button class="button button-danger" type="button" data-delete-id="${musica.id}">Excluir</button></div>`
    : `<div class="card-actions"><a class="button button-secondary" href="musica.html?id=${encodeURIComponent(musica.id)}">Ver música</a></div>`;
  return `<article class="song-card"><div class="song-card-head"><div><h3>${escaparHtml(musica.titulo)}</h3><p class="artist">${escaparHtml(musica.artista)}</p></div><span class="status-badge ${classeStatus(musica.status)}">${escaparHtml(musica.status)}</span></div><dl class="song-meta"><div><dt>Afinação</dt><dd>${escaparHtml(musica.afinacao)}</dd></div><div><dt>Instrumento</dt><dd>${escaparHtml(musica.instrumento)}</dd></div><div><dt>Dificuldade</dt><dd>${escaparHtml(musica.dificuldade)}</dd></div></dl>${acoes}</article>`;
}

export function renderizarBiblioteca(lista) {
  const container = document.querySelector("#library-list");
  const contador = document.querySelector("#result-count");
  if (!container) return;
  if (contador) contador.textContent = `${lista.length} ${lista.length === 1 ? "resultado" : "resultados"}`;
  container.innerHTML = lista.length ? lista.map(musica => criarCardMusica(musica, true)).join("")
    : `<div class="empty-state"><strong>Nenhuma música encontrada</strong><p>Tente alterar os filtros ou cadastrar uma nova música.</p></div>`;
}

export function preencherOpcoesFiltro(musicas, valoresAtuais = {}) {
  const artistas = [...new Set(musicas.map(m => String(m.artista || "").trim()).filter(Boolean))].sort((a, b) => a.localeCompare(b, "pt-BR"));
  const afinacoes = [...new Set([...AFINACOES_DISPONIVEIS, ...musicas.map(m => String(m.afinacao || "").trim()).filter(Boolean)])].sort((a, b) => a.localeCompare(b, "pt-BR"));
  const artistSelect = document.querySelector("#filter-artist");
  const tuningSelect = document.querySelector("#filter-tuning");
  if (artistSelect) {
    artistSelect.innerHTML = '<option value="">Todos</option>' + artistas.map(a => `<option value="${escaparHtml(a)}">${escaparHtml(a)}</option>`).join("");
    artistSelect.value = valoresAtuais.artista || "";
  }
  if (tuningSelect) {
    tuningSelect.innerHTML = '<option value="">Todas</option>' + afinacoes.map(a => `<option value="${escaparHtml(a)}">${escaparHtml(a)}</option>`).join("");
    tuningSelect.value = valoresAtuais.afinacao || "";
  }
}

export function limparErrosFormulario() {
  document.querySelectorAll(".has-error").forEach(el => el.classList.remove("has-error"));
  document.querySelectorAll(".field-error").forEach(el => el.textContent = "");
}

function mostrarErroCampo(id, mensagem) {
  const campo = document.querySelector(`#${id}`);
  const erro = document.querySelector(`#error-${id.replace("song-", "")}`);
  campo?.closest(".field")?.classList.add("has-error");
  if (erro) erro.textContent = mensagem;
}

export function validarFormulario(formulario) {
  limparErrosFormulario();
  const dados = new FormData(formulario);
  const erros = [];
  const obrigatorios = [
    ["song-title", "title", "Informe o título da música."],
    ["song-artist", "artist", "Informe o artista ou banda."],
    ["song-tuning", "tuning", "Selecione uma afinação."],
    ["song-instrument", "instrument", "Selecione um instrumento."],
    ["song-difficulty", "difficulty", "Selecione a dificuldade."]
  ];
  obrigatorios.forEach(([id, chave, mensagem]) => {
    if (!String(dados.get(chave) || "").trim()) { mostrarErroCampo(id, mensagem); erros.push(mensagem); }
  });
  const url = String(dados.get("sourceUrl") || "").trim();
  if (url) {
    try {
      const urlValida = new URL(url);
      if (!["http:", "https:"].includes(urlValida.protocol)) throw new Error("Protocolo inválido");
    } catch {
      document.querySelector("#source-url")?.closest(".field")?.classList.add("has-error");
      const erroUrl = document.querySelector("#error-source-url");
      if (erroUrl) erroUrl.textContent = "Informe um link HTTP ou HTTPS válido.";
      erros.push("O link da fonte da tablatura não é válido.");
    }
  }
  return { valido: erros.length === 0, dados, erros };
}

export function dadosDoFormulario(dados) {
  const tags = String(dados.get("tags") || "").split(",").map(tag => tag.trim()).filter(Boolean);
  const fonteUrl = String(dados.get("sourceUrl") || "").trim();
  const fonteTipo = String(dados.get("sourceType") || "").trim();
  return {
    titulo: String(dados.get("title") || "").trim(), artista: String(dados.get("artist") || "").trim(),
    album: String(dados.get("album") || "").trim(), afinacao: String(dados.get("tuning") || "").trim(),
    instrumento: String(dados.get("instrument") || "").trim(), genero: String(dados.get("genre") || "").trim() || "Não informado",
    dificuldade: String(dados.get("difficulty") || "").trim(), status: String(dados.get("status") || "Não iniciada").trim(),
    tags, observacoes: String(dados.get("notes") || "").trim(), fontes: fonteUrl ? [{ tipo: fonteTipo || "Fonte", url: fonteUrl }] : []
  };
}

export function preencherFormulario(formulario, musica) {
  const campos = { title: musica.titulo, artist: musica.artista, album: musica.album, tuning: musica.afinacao, instrument: musica.instrumento, genre: musica.genero === "Não informado" ? "" : musica.genero, difficulty: musica.dificuldade, tags: musica.tags.join(", "), notes: musica.observacoes };
  Object.entries(campos).forEach(([nome, valor]) => { const campo = formulario.elements[nome]; if (campo) campo.value = valor || ""; });
  const status = formulario.querySelector(`input[name="status"][value="${CSS.escape(musica.status)}"]`);
  if (status) status.checked = true;
  const primeiraFonte = musica.fontes?.[0];
  if (primeiraFonte) { formulario.elements.sourceType.value = primeiraFonte.tipo || ""; formulario.elements.sourceUrl.value = primeiraFonte.url || ""; }
}

export function renderizarDashboard(musicas) {
  const contar = status => musicas.filter(m => m.status === status).length;
  document.querySelector("#total-musicas")?.replaceChildren(document.createTextNode(musicas.length));
  document.querySelector("#total-dominadas")?.replaceChildren(document.createTextNode(contar("Dominada")));
  document.querySelector("#total-aprendendo")?.replaceChildren(document.createTextNode(contar("Aprendendo")));
  document.querySelector("#total-nao-iniciadas")?.replaceChildren(document.createTextNode(contar("Não iniciada")));
  const recentes = document.querySelector("#recent-songs");
  if (recentes) recentes.innerHTML = musicas.slice(-3).reverse().map(musica => criarCardMusica(musica)).join("");
}

export function renderizarDetalhes(musica) {
  document.title = `Riffly — ${musica.titulo}`;
  document.querySelector("#detail-title").textContent = musica.titulo;
  document.querySelector("#detail-artist").textContent = musica.artista;
  document.querySelector("#detail-status").className = `status-badge ${classeStatus(musica.status)}`;
  document.querySelector("#detail-status").textContent = musica.status;
  const dados = { "detail-album": musica.album || "Não informado", "detail-tuning": musica.afinacao || "Não informado", "detail-instrument": musica.instrumento || "Não informado", "detail-genre": musica.genero || "Não informado", "detail-difficulty": musica.dificuldade || "Não informado", "detail-notes": musica.observacoes || "Nenhuma observação registrada." };
  Object.entries(dados).forEach(([id, valor]) => { const elemento = document.querySelector(`#${id}`); if (elemento) elemento.textContent = valor; });
  const tags = document.querySelector("#detail-tags");
  if (tags) tags.innerHTML = musica.tags.length ? musica.tags.map(tag => `<span class="tag">${escaparHtml(tag)}</span>`).join("") : '<span class="muted">Nenhuma tag cadastrada.</span>';
  const fontes = document.querySelector("#sources-list");
  if (fontes) fontes.innerHTML = musica.fontes.length ? musica.fontes.map(fonte => `<article class="source-card"><div><strong>${escaparHtml(fonte.tipo || "Fonte")}</strong><p>${escaparHtml(fonte.url)}</p></div><a class="button button-secondary" href="${escaparHtml(fonte.url)}" target="_blank" rel="noopener noreferrer">Abrir fonte</a></article>`).join("") : '<p class="muted">Nenhuma fonte cadastrada.</p>';
  const editar = document.querySelector("#edit-song");
  if (editar) editar.href = `cadastro.html?id=${encodeURIComponent(musica.id)}`;
}
