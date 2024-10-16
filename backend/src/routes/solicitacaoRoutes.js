const express = require("express");
const router = express.Router();
const {
  createSolicitacao,
  getAllSolicitacoes,
  getSolicitacaoById,
  updateStatusSolicitacao,
  deleteSolicitacao,
  getComprovante,
  getSolicitacoesByUsuarioId
} = require("../controllers/solicitacaoController");
const upload = require("../middlewares/upload");
const { auth, admin } = require("../middlewares/authMiddleware");

// Rota para criar uma solicitação (qualquer usuário autenticado pode criar)
router.post("/", upload.single("comprovante"), auth, createSolicitacao);

// Rota para listar todas as solicitações (apenas admin)
router.get("/", auth, admin, getAllSolicitacoes);

// Rota para buscar uma solicitação por ID (apenas admin)
router.get("/:solicitacaoId", auth, admin, getSolicitacaoById);

router.put("/:solicitacaoId/status", auth, admin, upload.single('certificado'), updateStatusSolicitacao);

// Rota para deletar uma solicitação (apenas admin)
router.delete("/:solicitacaoId", auth, admin, deleteSolicitacao);

// Rota para visualizar comprovante de uma solicitação (apenas admin)
router.get("/:solicitacaoId/comprovante", auth, getComprovante);

// Buscar todas as solicitações de um usuário específico
router.get('/:usuarioId/usuario', auth, getSolicitacoesByUsuarioId);


module.exports = router;
