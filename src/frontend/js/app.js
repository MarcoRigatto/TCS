const STORAGE_KEY = "riffly.musicas";

const musicasIniciais = [
  { id: 1, titulo: "Everlong", artista: "Foo Fighters", album: "The Colour and the Shape", afinacao: "Drop D", instrumento: "Guitarra", genero: "Rock", dificuldade: "Intermediária", status: "Aprendendo", tags: ["Rock", "Riff"], observacoes: "", fontes: [{ tipo: "YouTube", url: "https://www.youtube.com/" }] },
  { id: 2, titulo: "Nothing Else Matters", artista: "Metallica", album: "Metallica", afinacao: "Standard", instrumento: "Guitarra", genero: "Metal", dificuldade: "Intermediária", status: "Dominada", tags: ["Rock", "Fingerstyle"], observacoes: "", fontes: [] },
  { id: 3, titulo: "Blackbird", artista: "The Beatles", album: "The Beatles", afinacao: "Standard", instrumento: "Violão", genero: "Rock", dificuldade: "Avançada", status: "Em prática", tags: ["Fingerstyle"], observacoes: "", fontes: [] }
];

function gerarId() {
  return Date.now() + Math.floor(Math.random() * 1000);
}

function normalizar(valor) {
  return String(valor ?? "").trim().toLowerCase();
}

function escaparHtml(valor) {
  return String(valor ?? "").replace(/[&<>"']/g, caractere => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[caractere]));
}

function normalizarMusica(musica) {
  return {
    ...musica,
    tags: Array.isArray(musica.tags) ? musica.tags : [],
    fontes: Array.isArray(musica.fontes)
      ? musica.fontes.filter(fonte => fonte && (fonte.tipo || fonte.url))
      : musica.sourceUrl
        ? [{ tipo: musica.sourceType || "Fonte", url: musica.sourceUrl }]
        : []
  };
}

function carregarMusicas() {
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

function salvarMusicas(musicas) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(musicas.map(normalizarMusica)));
}

function classeStatus(status) {
  return {
    "Aprendendo": "status-aprendendo",
    "Dominada": "status-dominada",
    "Em prática": "status-em-pratica",
    "Não iniciada": "status-nao-iniciada"
  }[status] || "status-nao-iniciada";
}

function criarCardMusica(musica, permitirExcluir = false) {
  const acoes = permitirExcluir
    ? `<div class="card-actions">
         <a class="button button-secondary" href="musica.html?id=${encodeURIComponent(musica.id)}">Ver música</a>
         <button class="button button-danger" type="button" data-delete-id="${musica.id}">Excluir</button>
       </div>`
    : `<div class="card-actions"><a class="button button-secondary" href="musica.html?id=${encodeURIComponent(musica.id)}">Ver música</a></div>`;

  return `
    <article class="song-card">
      <div class="song-card-head">
        <div>
          <h3>${escaparHtml(musica.titulo)}</h3>
          <p class="artist">${escaparHtml(musica.artista)}</p>
        </div>
        <span class="status-badge ${classeStatus(musica.status)}">${escaparHtml(musica.status)}</span>
      </div>
      <dl class="song-meta">
        <div><dt>Afinação</dt><dd>${escaparHtml(musica.afinacao)}</dd></div>
        <div><dt>Instrumento</dt><dd>${escaparHtml(musica.instrumento)}</dd></div>
        <div><dt>Dificuldade</dt><dd>${escaparHtml(musica.dificuldade)}</dd></div>
      </dl>
      ${acoes}
    </article>`;
}

function renderizarBiblioteca(lista) {
  const container = document.querySelector("#library-list");
  const contador = document.querySelector("#result-count");
  if (!container) return;

  if (contador) contador.textContent = `${lista.length} ${lista.length === 1 ? "resultado" : "resultados"}`;

  if (lista.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <strong>Nenhuma música encontrada</strong>
        <p>Tente alterar os filtros ou cadastrar uma nova música.</p>
      </div>`;
    return;
  }

  container.innerHTML = lista.map(musica => criarCardMusica(musica, true)).join("");
}

const AFINACOES_DISPONIVEIS = [
  "Standard",
  "Drop D",
  "Drop C",
  "D Standard",
  "Drop B",
  "DADGAD"
];

function preencherOpcoesFiltro(musicas, valoresAtuais = {}) {
  const artistas = [...new Set(musicas.map(m => String(m.artista || "").trim()).filter(Boolean))]
    .sort((a, b) => a.localeCompare(b, "pt-BR"));
  const afinacoes = [...new Set([
    ...AFINACOES_DISPONIVEIS,
    ...musicas.map(m => String(m.afinacao || "").trim()).filter(Boolean)
  ])].sort((a, b) => a.localeCompare(b, "pt-BR"));

  const artistSelect = document.querySelector("#filter-artist");
  const tuningSelect = document.querySelector("#filter-tuning");

  if (artistSelect) {
    artistSelect.innerHTML = '<option value="">Todos</option>' +
      artistas.map(artista => `<option value="${escaparHtml(artista)}">${escaparHtml(artista)}</option>`).join("");
    artistSelect.value = valoresAtuais.artista || "";
  }

  if (tuningSelect) {
    tuningSelect.innerHTML = '<option value="">Todas</option>' +
      afinacoes.map(afinacao => `<option value="${escaparHtml(afinacao)}">${escaparHtml(afinacao)}</option>`).join("");
    tuningSelect.value = valoresAtuais.afinacao || "";
  }
}

function obterFiltros() {
  return {
    titulo: normalizar(document.querySelector("#filter-title")?.value),
    artista: normalizar(document.querySelector("#filter-artist")?.value),
    afinacao: normalizar(document.querySelector("#filter-tuning")?.value),
    dificuldade: normalizar(document.querySelector("#filter-difficulty")?.value),
    status: normalizar(document.querySelector("#filter-status")?.value),
    genero: normalizar(document.querySelector("#filter-genre")?.value)
  };
}

function aplicarFiltros(musicas, filtros = obterFiltros()) {
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

function mostrarMensagem(id, texto, tipo = "") {
  const elemento = document.querySelector(`#${id}`);
  if (!elemento) return;
  elemento.textContent = texto;
  elemento.className = `form-message ${tipo}`.trim();
}

function atualizarBibliotecaComDadosAtuais(filtros = obterFiltros()) {
  const musicas = carregarMusicas();
  preencherOpcoesFiltro(musicas, filtros);
  renderizarBiblioteca(aplicarFiltros(musicas, filtros));
}

function inicializarBiblioteca() {
  const filtrosIniciais = obterFiltros();
  atualizarBibliotecaComDadosAtuais(filtrosIniciais);

  document.querySelector("#filter-form")?.addEventListener("submit", evento => {
    evento.preventDefault();
    const filtros = obterFiltros();
    const musicas = carregarMusicas();
    const resultados = aplicarFiltros(musicas, filtros);
    preencherOpcoesFiltro(musicas, filtros);
    renderizarBiblioteca(resultados);
    mostrarMensagem("filter-message", resultados.length
      ? "Filtros aplicados com sucesso."
      : "Nenhuma música corresponde aos filtros informados.", resultados.length ? "success" : "error");
  });

  document.querySelector("#clear-filters")?.addEventListener("click", () => {
    document.querySelector("#filter-form")?.reset();
    const musicas = carregarMusicas();
    preencherOpcoesFiltro(musicas);
    renderizarBiblioteca(musicas);
    mostrarMensagem("filter-message", "Filtros limpos.");
  });

  document.querySelector("#library-list")?.addEventListener("click", evento => {
    const botao = evento.target.closest("[data-delete-id]");
    if (!botao) return;

    const id = Number(botao.dataset.deleteId);
    const listaAtual = carregarMusicas();
    const musica = listaAtual.find(item => Number(item.id) === id);
    if (!musica) return;

    if (!window.confirm(`Deseja realmente remover "${musica.titulo}"?`)) return;

    const novaLista = listaAtual.filter(item => Number(item.id) !== id);
    salvarMusicas(novaLista);

    const filtros = obterFiltros();
    preencherOpcoesFiltro(novaLista, filtros);
    renderizarBiblioteca(aplicarFiltros(novaLista, filtros));
    mostrarMensagem("filter-message", `"${musica.titulo}" foi removida da biblioteca.`, "success");
  });
}

function mostrarErroCampo(id, mensagem) {
  const campo = document.querySelector(`#${id}`);
  const erro = document.querySelector(`#error-${id.replace("song-", "")}`);
  campo?.closest(".field")?.classList.add("has-error");
  if (erro) erro.textContent = mensagem;
}

function limparErrosFormulario() {
  document.querySelectorAll(".has-error").forEach(el => el.classList.remove("has-error"));
  document.querySelectorAll(".field-error").forEach(el => el.textContent = "");
}

function validarFormulario(formulario) {
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
    if (!String(dados.get(chave) || "").trim()) {
      mostrarErroCampo(id, mensagem);
      erros.push(mensagem);
    }
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

function dadosDoFormulario(dados) {
  const tags = String(dados.get("tags") || "")
    .split(",")
    .map(tag => tag.trim())
    .filter(Boolean);

  const fonteUrl = String(dados.get("sourceUrl") || "").trim();
  const fonteTipo = String(dados.get("sourceType") || "").trim();

  return {
    titulo: String(dados.get("title") || "").trim(),
    artista: String(dados.get("artist") || "").trim(),
    album: String(dados.get("album") || "").trim(),
    afinacao: String(dados.get("tuning") || "").trim(),
    instrumento: String(dados.get("instrument") || "").trim(),
    genero: String(dados.get("genre") || "").trim() || "Não informado",
    dificuldade: String(dados.get("difficulty") || "").trim(),
    status: String(dados.get("status") || "Não iniciada").trim(),
    tags,
    observacoes: String(dados.get("notes") || "").trim(),
    fontes: fonteUrl ? [{ tipo: fonteTipo || "Fonte", url: fonteUrl }] : []
  };
}

function preencherFormulario(formulario, musica) {
  const campos = {
    title: musica.titulo,
    artist: musica.artista,
    album: musica.album,
    tuning: musica.afinacao,
    instrument: musica.instrumento,
    genre: musica.genero === "Não informado" ? "" : musica.genero,
    difficulty: musica.dificuldade,
    tags: musica.tags.join(", "),
    notes: musica.observacoes
  };

  Object.entries(campos).forEach(([nome, valor]) => {
    const campo = formulario.elements[nome];
    if (campo) campo.value = valor || "";
  });

  const status = formulario.querySelector(`input[name="status"][value="${CSS.escape(musica.status)}"]`);
  if (status) status.checked = true;

  const primeiraFonte = musica.fontes?.[0];
  if (primeiraFonte) {
    formulario.elements.sourceType.value = primeiraFonte.tipo || "";
    formulario.elements.sourceUrl.value = primeiraFonte.url || "";
  }
}

function inicializarCadastro() {
  const formulario = document.querySelector("#song-form");
  if (!formulario) return;

  const parametros = new URLSearchParams(window.location.search);
  const idEdicao = parametros.get("id");
  const musicas = carregarMusicas();
  const musicaEdicao = idEdicao ? musicas.find(item => String(item.id) === String(idEdicao)) : null;

  if (musicaEdicao) {
    document.title = "Riffly — Editar música";
    document.querySelector("#page-eyebrow")?.replaceChildren(document.createTextNode("Atualizar repertório"));
    document.querySelector("#page-title")?.replaceChildren(document.createTextNode("Editar música"));
    document.querySelector("#page-description")?.replaceChildren(document.createTextNode("Altere as informações da música e mantenha seu repertório atualizado."));
    document.querySelector("#form-titulo")?.replaceChildren(document.createTextNode("Editar informações"));
    document.querySelector("#form-subtitulo")?.replaceChildren(document.createTextNode("Atualize os dados da música e suas fontes de tablatura."));
    const submit = formulario.querySelector("button[type=submit]");
    if (submit) submit.textContent = "Salvar alterações";
    preencherFormulario(formulario, musicaEdicao);
  }

  formulario.addEventListener("submit", evento => {
    evento.preventDefault();

    const resultado = validarFormulario(formulario);
    if (!resultado.valido) {
      mostrarMensagem("form-message", "Corrija os campos indicados antes de salvar.", "error");
      return;
    }

    const dados = resultado.dados;
    const dadosMusica = dadosDoFormulario(dados);
    let listaAtual = carregarMusicas();
    let musicaSalva;

    if (musicaEdicao) {
      const fontesExistentes = Array.isArray(musicaEdicao.fontes) ? musicaEdicao.fontes : [];
      const fontesAtualizadas = dadosMusica.fontes.length
        ? (fontesExistentes.length ? [dadosMusica.fontes[0], ...fontesExistentes.slice(1)] : dadosMusica.fontes)
        : fontesExistentes;

      musicaSalva = { ...musicaEdicao, ...dadosMusica, fontes: fontesAtualizadas };
      listaAtual = listaAtual.map(item => String(item.id) === String(musicaEdicao.id) ? musicaSalva : item);
      salvarMusicas(listaAtual);
      mostrarMensagem("form-message", `"${musicaSalva.titulo}" foi atualizada com sucesso.`, "success");
      window.setTimeout(() => {
        window.location.href = `musica.html?id=${encodeURIComponent(musicaSalva.id)}`;
      }, 500);
    } else {
      musicaSalva = { id: gerarId(), ...dadosMusica };
      listaAtual.push(musicaSalva);
      salvarMusicas(listaAtual);
      formulario.reset();
      limparErrosFormulario();
      mostrarMensagem("form-message", `"${musicaSalva.titulo}" foi cadastrada com sucesso. Você pode cadastrar outra música.`, "success");
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function inicializarDashboard() {
  const musicas = carregarMusicas();
  const contar = status => musicas.filter(m => m.status === status).length;

  document.querySelector("#total-musicas")?.replaceChildren(document.createTextNode(musicas.length));
  document.querySelector("#total-dominadas")?.replaceChildren(document.createTextNode(contar("Dominada")));
  document.querySelector("#total-aprendendo")?.replaceChildren(document.createTextNode(contar("Aprendendo")));
  document.querySelector("#total-nao-iniciadas")?.replaceChildren(document.createTextNode(contar("Não iniciada")));

  const recentes = document.querySelector("#recent-songs");
  if (recentes) {
    recentes.innerHTML = musicas.slice(-3).reverse().map(musica => criarCardMusica(musica)).join("");
  }
}

function obterMusicaPorId() {
  const id = new URLSearchParams(window.location.search).get("id");
  if (!id) return null;
  return carregarMusicas().find(musica => String(musica.id) === String(id)) || null;
}

function renderizarDetalhes(musica) {
  document.title = `Riffly — ${musica.titulo}`;
  document.querySelector("#detail-title").textContent = musica.titulo;
  document.querySelector("#detail-artist").textContent = musica.artista;
  document.querySelector("#detail-status").className = `status-badge ${classeStatus(musica.status)}`;
  document.querySelector("#detail-status").textContent = musica.status;

  const dados = {
    "detail-album": musica.album || "Não informado",
    "detail-tuning": musica.afinacao || "Não informado",
    "detail-instrument": musica.instrumento || "Não informado",
    "detail-genre": musica.genero || "Não informado",
    "detail-difficulty": musica.dificuldade || "Não informado",
    "detail-notes": musica.observacoes || "Nenhuma observação registrada."
  };
  Object.entries(dados).forEach(([id, valor]) => {
    const elemento = document.querySelector(`#${id}`);
    if (elemento) elemento.textContent = valor;
  });

  const tags = document.querySelector("#detail-tags");
  if (tags) {
    tags.innerHTML = musica.tags.length
      ? musica.tags.map(tag => `<span class="tag">${escaparHtml(tag)}</span>`).join("")
      : '<span class="muted">Nenhuma tag cadastrada.</span>';
  }

  const fontes = document.querySelector("#sources-list");
  if (fontes) {
    fontes.innerHTML = musica.fontes.length
      ? musica.fontes.map(fonte => `
          <article class="source-card">
            <div>
              <strong>${escaparHtml(fonte.tipo || "Fonte")}</strong>
              <p>${escaparHtml(fonte.url)}</p>
            </div>
            <a class="button button-secondary" href="${escaparHtml(fonte.url)}" target="_blank" rel="noopener noreferrer">Abrir fonte</a>
          </article>`).join("")
      : `<div class="empty-state"><strong>Nenhuma fonte cadastrada</strong><p>Edite esta música para adicionar um link de tablatura ou vídeo.</p></div>`;
  }

  const editar = document.querySelector("#edit-song");
  if (editar) editar.href = `cadastro.html?id=${encodeURIComponent(musica.id)}`;
}

function inicializarDetalhes() {
  const musica = obterMusicaPorId();
  const conteudo = document.querySelector("#song-detail");
  const vazio = document.querySelector("#detail-not-found");
  if (!musica) {
    conteudo?.classList.add("hidden");
    vazio?.classList.remove("hidden");
    return;
  }
  renderizarDetalhes(musica);
}

document.addEventListener("DOMContentLoaded", () => {
  const pagina = document.body.dataset.page;
  if (pagina === "biblioteca") inicializarBiblioteca();
  if (pagina === "cadastro") inicializarCadastro();
  if (pagina === "inicio") inicializarDashboard();
  if (pagina === "musica") inicializarDetalhes();
});
