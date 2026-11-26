const musicasService = require("../services/musicas.service");

async function listar(req, res, next) {
    try {
        const musicas = await musicasService.listar();
        res.status(200).json({ dados: musicas, total: musicas.length });
    } catch (error) { next(error); }
}
async function buscarPorId(req, res, next) {
    try { res.status(200).json({ dados: await musicasService.buscarPorId(req.params.id) }); }
    catch (error) { next(error); }
}
async function criar(req, res, next) {
    try { res.status(201).json({ mensagem: "Musica criada com sucesso.", dados: await musicasService.criar(req.body) }); }
    catch (error) { next(error); }
}
async function atualizar(req, res, next) {
    try { res.status(200).json({ mensagem: "Musica atualizada com sucesso.", dados: await musicasService.atualizar(req.params.id, req.body) }); }
    catch (error) { next(error); }
}
async function excluir(req, res, next) {
    try { await musicasService.excluir(req.params.id); res.status(200).json({ mensagem: "Musica excluida com sucesso." }); }
    catch (error) { next(error); }
}
module.exports = { listar, buscarPorId, criar, atualizar, excluir };
