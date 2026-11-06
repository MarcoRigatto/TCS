import { carregarMusicas } from "./storage.js";
import { filtrarMusicas, excluirMusica } from "./musicas.js";
import { mostrarMensagem, normalizar, escaparHtml } from "./utils.js";
import { preencherOpcoesFiltro, renderizarBiblioteca } from "./ui.js";
import { buscarMusicasExternas, enviarMusicaParaServicoTeste } from "./api.js";

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

export function inicializarBiblioteca() {
  const musicas = carregarMusicas();
  preencherOpcoesFiltro(musicas);
  renderizarBiblioteca(filtrarMusicas(musicas, obterFiltros()));

  document.querySelector("#filter-form")?.addEventListener("submit", evento => {
    evento.preventDefault();
    const lista = carregarMusicas();
    const filtros = obterFiltros();
    const resultados = filtrarMusicas(lista, filtros);
    preencherOpcoesFiltro(lista, filtros);
    renderizarBiblioteca(resultados);
    mostrarMensagem("filter-message", resultados.length ? "Filtros aplicados com sucesso." : "Nenhuma música corresponde aos filtros informados.", resultados.length ? "success" : "error");
  });

  document.querySelector("#clear-filters")?.addEventListener("click", () => {
    document.querySelector("#filter-form")?.reset();
    const lista = carregarMusicas();
    preencherOpcoesFiltro(lista);
    renderizarBiblioteca(lista);
    mostrarMensagem("filter-message", "Filtros limpos.");
  });

  document.querySelector("#library-list")?.addEventListener("click", evento => {
    const botao = evento.target.closest("[data-delete-id]");
    if (!botao) return;
    const id = Number(botao.dataset.deleteId);
    const musica = carregarMusicas().find(item => Number(item.id) === id);
    if (!musica || !window.confirm(`Deseja realmente remover "${musica.titulo}"?`)) return;
    excluirMusica(id);
    const lista = carregarMusicas();
    const filtros = obterFiltros();
    preencherOpcoesFiltro(lista, filtros);
    renderizarBiblioteca(filtrarMusicas(lista, filtros));
    mostrarMensagem("filter-message", `"${musica.titulo}" foi removida da biblioteca.`, "success");
  });

  inicializarBuscaOnline();
}

function inicializarBuscaOnline() {
  const formulario = document.querySelector("#online-search-form");
  const resultados = document.querySelector("#online-results");
  const mensagem = document.querySelector("#online-search-message");
  if (!formulario || !resultados || !mensagem) return;

  formulario.addEventListener("submit", async evento => {
    evento.preventDefault();
    const termo = String(new FormData(formulario).get("onlineTerm") || "").trim();
    if (!termo) { mensagem.textContent = "Digite o nome de uma música ou artista."; mensagem.className = "form-message error"; return; }

    const botao = formulario.querySelector("button[type='submit']");
    botao.disabled = true;
    botao.textContent = "Buscando...";
    mensagem.textContent = "Consultando o catálogo externo. Aguarde...";
    mensagem.className = "form-message loading";
    resultados.innerHTML = "";

    try {
      const musicasExternas = await buscarMusicasExternas(termo);
      if (!musicasExternas.length) {
        mensagem.textContent = "Nenhum resultado encontrado. Tente outro termo.";
        mensagem.className = "form-message error";
        return;
      }
      mensagem.textContent = `${musicasExternas.length} resultado(s) encontrado(s). Os dados vêm do catálogo do iTunes/Apple.`;
      mensagem.className = "form-message success";
      resultados.innerHTML = musicasExternas.map((musica, indice) => `
        <article class="online-result-card">
          <div class="online-result-info">
            <h3>${escaparHtml(musica.trackName)}</h3>
            <p>${escaparHtml(musica.artistName)} · ${escaparHtml(musica.collectionName || "Álbum não informado")}</p>
            <small>${escaparHtml(musica.primaryGenreName || "Gênero não informado")}</small>
            ${musica.trackViewUrl ? `<a class="online-track-link" href="${escaparHtml(musica.trackViewUrl)}" target="_blank" rel="noopener noreferrer">Ver no iTunes</a>` : ""}
          </div>
          <button class="button button-secondary" type="button" data-send-index="${indice}">Enviar ao serviço de teste</button>
          <p class="online-send-message" id="online-send-${indice}" aria-live="polite"></p>
        </article>`).join("");
      resultados.dataset.items = JSON.stringify(musicasExternas);
    } catch (erro) {
      mensagem.textContent = `Não foi possível consultar o catálogo. ${erro.message} Verifique sua conexão e tente novamente.`;
      mensagem.className = "form-message error";
    } finally {
      botao.disabled = false;
      botao.textContent = "Buscar online";
    }
  });

  resultados.addEventListener("click", async evento => {
    const botao = evento.target.closest("[data-send-index]");
    if (!botao) return;
    const indice = Number(botao.dataset.sendIndex);
    const musica = JSON.parse(resultados.dataset.items || "[]")[indice];
    const retorno = document.querySelector(`#online-send-${indice}`);
    if (!musica || !retorno) return;
    botao.disabled = true;
    botao.textContent = "Enviando...";
    retorno.textContent = "Enviando os dados ao serviço simulado...";
    retorno.className = "online-send-message loading";
    try {
      const resposta = await enviarMusicaParaServicoTeste(musica);
      retorno.textContent = `Envio concluído! O serviço retornou o registro de teste nº ${resposta.id}. Isso não adiciona a música à sua biblioteca.`;
      retorno.className = "online-send-message success";
    } catch (erro) {
      retorno.textContent = `Falha no envio: ${erro.message}. Tente novamente.`;
      retorno.className = "online-send-message error";
    } finally {
      botao.disabled = false;
      botao.textContent = "Enviar ao serviço de teste";
    }
  });
}
