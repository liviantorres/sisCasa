const express = require("express");
const router = express.Router();
const {
criarCategoria,
listarCategorias,
obterPontuacoesPorCategoria
} = require("../controllers/categoriaController");

router.get("/", listarCategorias);

router.post("/", criarCategoria);

router.get("/:categoriaId", obterPontuacoesPorCategoria)

module.exports = router;
