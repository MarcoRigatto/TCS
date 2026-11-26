const musicasRepository = require("../repositories/musicas.repository");
const AppError = require("../middlewares/AppError");

const CAMPOS_PERMITIDOS = [
    "titulo", "artista", "afinacao", "instrumento", "status", "link",
    "observacoes", "album", "genero", "dificuldade", "tags", "fontes", "artworkUrl"
];

function normalizarDados(body = {}) {
    const dados = { ...body };
    if (dados.titulo === undefined && dados.title !== undefined) dados.titulo = dados.title;
    if (dados.artista === undefined && dados.artist !== undefined) dados.artista = dados.artist;
    delete dados.title;
    delete dados.artist;
    return dados;
}

function validarDados(body, parcial = false) {
    if (!body || typeof body !== "object" || Array.isArray(body)) {
        throw new AppError(400, "O corpo da requisicao deve ser um objeto JSON.");
    }
    const dados = normalizarDados(body);
    const camposRecebidos = Object.keys(dados);
    const desconhecidos = camposRecebidos.filter(campo => !CAMPOS_PERMITIDOS.includes(campo));
    if (desconhecidos.length) throw new AppError(400, `Campos nao permitidos: ${desconhecidos.join(", ")}.`);
    if (!parcial && (!dados.titulo || !dados.artista)) {
        throw new AppError(400, "Os campos 'titulo' e 'artista' sao obrigatorios.");
    }
    if (parcial && !camposRecebidos.length) throw new AppError(400, "Informe ao menos um campo para atualizar.");

    for (const campo of ["titulo", "artista"]) {
        if (dados[campo] !== undefined) {
            if (typeof dados[campo] !== "string" || !dados[campo].trim()) {
                throw new AppError(400, `O campo '${campo}' deve ser um texto nao vazio.`);
            }
            dados[campo] = dados[campo].trim();
        }
    }
    for (const campo of CAMPOS_PERMITIDOS) {
        if (["titulo", "artista", "tags", "fontes"].includes(campo) || dados[campo] === undefined) continue;
        if (typeof dados[campo] !== "string") throw new AppError(400, `O campo '${campo}' deve ser texto.`);
        dados[campo] = dados[campo].trim();
    }
    for (const campo of ["tags", "fontes"]) {
        if (dados[campo] !== undefined && !Array.isArray(dados[campo])) {
            throw new AppError(400, `O campo '${campo}' deve ser uma lista.`);
        }
    }
    return dados;
}

function validarId(id) {
    if (!/^\d+$/.test(String(id || "")) || Number(id) <= 0) throw new AppError(400, "O ID informado e invalido.");
}

async function listar() { return musicasRepository.listar(); }
async function buscarPorId(id) {
    validarId(id);
    const musica = await musicasRepository.buscarPorId(id);
    if (!musica) throw new AppError(404, "Musica nao encontrada.");
    return musica;
}
async function criar(body) { return musicasRepository.criar(validarDados(body)); }
async function atualizar(id, body) {
    validarId(id);
    const atualizada = await musicasRepository.atualizar(id, validarDados(body, true));
    if (!atualizada) throw new AppError(404, "Musica nao encontrada.");
    return atualizada;
}
async function excluir(id) {
    validarId(id);
    if (!await musicasRepository.excluir(id)) throw new AppError(404, "Musica nao encontrada.");
}

module.exports = { listar, buscarPorId, criar, atualizar, excluir };
