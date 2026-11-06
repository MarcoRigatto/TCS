import { carregarMusicas } from "./storage.js";
import { renderizarDashboard } from "./ui.js";
export function inicializarDashboard() { renderizarDashboard(carregarMusicas()); }
