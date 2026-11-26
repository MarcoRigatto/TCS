const express = require("express");
const musicasController = require("../controllers/musicas.controller");

const router = express.Router();

router.get("/", musicasController.listar);
router.get("/:id", musicasController.buscarPorId);
router.post("/", musicasController.criar);
router.put("/:id", musicasController.atualizar);
router.delete("/:id", musicasController.excluir);

module.exports = router;
