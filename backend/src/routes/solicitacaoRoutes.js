const express = require('express');
const router = express.Router();
const solicitacaoController = require('../controllers/solicitacaoController'); 
const upload = require('../middlewares/upload'); 
const { auth, admin } = require('../middlewares/authMiddleware');

// Rota para criar uma nova solicitação com upload de comprovante
router.post('/', upload.single('comprovante'), auth, solicitacaoController.createSolicitacao);

// Rota para listar todas as solicitações
router.get('/', auth, admin, solicitacaoController.getAllSolicitacoes);

// Rota para buscar uma solicitação específica por ID
router.get('/:solicitacaoId', auth, admin, solicitacaoController.getSolicitacaoById);

// Rota para atualizar o status de uma solicitação
router.put('/:solicitacaoId/status', auth, admin, solicitacaoController.updateStatusSolicitacao);

// Rota para deletar uma solicitação
router.delete('/:solicitacaoId', auth, admin, solicitacaoController.deleteSolicitacao);

// Rota para buscar o comprovante de uma solicitação
router.get('/:solicitacaoId/comprovante', auth, admin, solicitacaoController.getComprovante);


module.exports = router;
