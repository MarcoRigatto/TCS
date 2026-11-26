import { adicionarMusica, atualizarMusica, buscarMusicaPorId } from "./musicas.js";
import { mostrarMensagem } from "./utils.js";
import { validarFormulario, dadosDoFormulario, preencherFormulario, limparErrosFormulario } from "./ui.js";

export async function inicializarCadastro() {
  const formulario = document.querySelector("#song-form");
  if (!formulario) return;
  const idEdicao = new URLSearchParams(window.location.search).get("id");
  let musicaEdicao = null;

  if (idEdicao) {
    try { musicaEdicao = await buscarMusicaPorId(idEdicao); }
    catch (erro) { mostrarMensagem("form-message", erro.message, "error"); return; }
    if (!musicaEdicao) { mostrarMensagem("form-message", "A música não foi encontrada.", "error"); return; }
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

  formulario.addEventListener("submit", async evento => {
    evento.preventDefault();
    const resultado = validarFormulario(formulario);
    if (!resultado.valido) { mostrarMensagem("form-message", "Corrija os campos indicados antes de salvar.", "error"); return; }
    const dadosMusica = dadosDoFormulario(resultado.dados);
    const botao = formulario.querySelector("button[type=submit]");
    if (botao) { botao.disabled = true; botao.textContent = "Salvando..."; }
    try {
      if (musicaEdicao) {
        const atualizada = await atualizarMusica(musicaEdicao.id, dadosMusica);
        mostrarMensagem("form-message", `"${atualizada.titulo}" foi atualizada com sucesso.`, "success");
        window.setTimeout(() => { window.location.href = `musica.html?id=${encodeURIComponent(atualizada.id)}`; }, 500);
      } else {
        const novaMusica = await adicionarMusica(dadosMusica);
        formulario.reset();
        limparErrosFormulario();
        mostrarMensagem("form-message", `"${novaMusica.titulo}" foi cadastrada com sucesso.`, "success");
      }
    } catch (erro) { mostrarMensagem("form-message", erro.message, "error"); }
    finally {
      if (botao) { botao.disabled = false; botao.textContent = musicaEdicao ? "Salvar alterações" : "Cadastrar música"; }
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
