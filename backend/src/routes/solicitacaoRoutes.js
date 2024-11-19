const express = require("express");
const router = express.Router();
const {
  createSolicitacao,
  getAllSolicitacoes,
  getSolicitacaoById,
  updateStatusSolicitacao,
  deleteSolicitacao,
  getComprovante,
  getSolicitacoesByUsuarioId,
  updateSolicitacao
} = require("../controllers/solicitacaoController");
const upload = require("../middlewares/upload");
const { auth, admin } = require("../middlewares/authMiddleware");


router.post("/", upload.single("comprovante"), auth, createSolicitacao);

router.get("/", auth, admin, getAllSolicitacoes);


router.get("/:solicitacaoId", auth, admin, getSolicitacaoById);

router.put("/:solicitacaoId/status", auth, admin, upload.single('certificado'), updateStatusSolicitacao);

router.delete("/:solicitacaoId", auth, admin, deleteSolicitacao);

router.get("/:solicitacaoId/comprovante", auth, getComprovante);

router.get('/:usuarioId/usuario', auth, getSolicitacoesByUsuarioId);

router.put('/:solicitacaoId', auth, upload.single('certificado'), updateSolicitacao)


module.exports = router;
