require("dotenv").config();
const app = require("./src/app");
const pool = require("./src/config/database");

const PORT = process.env.PORT || 3000;
const servidor = app.listen(PORT, () => {
    console.log(`Riffly API rodando em http://localhost:${PORT}`);
    console.log(`Documentacao basica: http://localhost:${PORT}/api`);
});

async function encerrar() {
    servidor.close(async () => {
        await pool.end();
        process.exit(0);
    });
}
process.on("SIGINT", encerrar);
process.on("SIGTERM", encerrar);
