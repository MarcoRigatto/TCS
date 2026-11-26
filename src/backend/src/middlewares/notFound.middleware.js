function notFoundMiddleware(req, res) {
    res.status(404).json({
        erro: "Rota nao encontrada.",
        caminho: req.originalUrl,
        metodo: req.method
    });
}

module.exports = notFoundMiddleware;
