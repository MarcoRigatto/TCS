function errorMiddleware(error, req, res, next) {
    if (res.headersSent) return next(error);
    let status = error.status || 500;
    let mensagem = error.message;

    if (error.code === "23503") {
        status = 409;
        mensagem = "A operacao nao pode ser concluida porque existe um relacionamento com este registro.";
    } else if (error.code === "23505") {
        status = 409;
        mensagem = "Ja existe um registro com esses dados unicos.";
    } else if (error.code === "ECONNREFUSED" || error.code === "28P01" || error.code === "3D000") {
        status = 503;
        mensagem = "Nao foi possivel conectar ao banco de dados. Verifique se o PostgreSQL esta ativo e se as configuracoes estao corretas.";
    } else if (!error.status) {
        status = 500;
        mensagem = "Ocorreu um erro interno no servidor ou na persistencia dos dados.";
    }

    if (status >= 500) console.error(error);
    res.status(status).json({ erro: { status, mensagem } });
}
module.exports = errorMiddleware;
