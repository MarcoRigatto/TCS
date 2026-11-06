import { inicializarBiblioteca } from "./biblioteca.js";
import { inicializarCadastro } from "./cadastro.js";
import { inicializarDashboard } from "./dashboard.js";
import { inicializarDetalhes } from "./detalhes.js";

// Ponto de entrada: identifica a página atual e inicializa seu módulo específico.
document.addEventListener("DOMContentLoaded", () => {
  const pagina = document.body.dataset.page;
  const inicializadores = {
    inicio: inicializarDashboard,
    biblioteca: inicializarBiblioteca,
    cadastro: inicializarCadastro,
    musica: inicializarDetalhes
  };
  inicializadores[pagina]?.();
});
