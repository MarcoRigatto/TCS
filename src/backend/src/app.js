const express = require("express");
const cors = require("cors");
const pool = require("./config/database");
const musicasRoutes = require("./routes/musicas.routes");
const errorMiddleware = require("./middlewares/error.middleware");
const notFoundMiddleware = require("./middlewares/notFound.middleware");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.status(200).json({
    mensagem: "API Riffly funcionando!",
    versao: "1.0.0",
    endpointPrincipal: "/api/musicas"
}));

app.get("/api", (req, res) => res.status(200).json({
    nome: "Riffly API",
    persistencia: "PostgreSQL",
    endpoints: {
        listar: "GET /api/musicas",
        consultar: "GET /api/musicas/:id",
        criar: "POST /api/musicas",
        atualizar: "PUT /api/musicas/:id",
        excluir: "DELETE /api/musicas/:id",
        saude: "GET /api/health"
    }
}));

app.get("/api/health", async (req, res, next) => {
    try {
        await pool.query("SELECT 1");
        res.status(200).json({ api: "ok", banco: "conectado" });
    } catch (error) { next(error); }
});

app.use("/api/musicas", musicasRoutes);
app.use(notFoundMiddleware);
app.use(errorMiddleware);
module.exports = app;
