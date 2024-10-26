const express = require("express");
const router = express.Router();
const {
  criarPontuacao,
  associarHoras,
  obterPontuacoes,
  obterPontuacoesUsuario,
  atualizarPontuacao,
  removerPontuacao,
} = require("../controllers/pontuacaoController");

router.post("/", criarPontuacao);
router.post("/associar-horas", associarHoras);
router.get("/", obterPontuacoes);
router.get("/usuario/:usuarioId", obterPontuacoesUsuario);
router.put("/:id", atualizarPontuacao);
router.delete("/:id", removerPontuacao);

module.exports = router;
