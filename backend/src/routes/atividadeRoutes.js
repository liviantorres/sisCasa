const express = require('express');
const { auth, admin } = require('../middlewares/authMiddleware');
const {criarAtividade, atualizarAtividade, listarAtividades, obterAtividadePorId, deletarAtividade } = require('../controllers/atividadeController');
const router = express.Router();


router.get('/', auth, listarAtividades); // buscar atividades
router.post('/criar', auth, admin, criarAtividade); // criar atividade
router.put(`/editar/:id`, auth, admin, atualizarAtividade); // editar atividade
router.delete(`/deletar/:id`, auth, admin, deletarAtividade); // deletar atividade
router.get(`/buscar/:id`, auth, obterAtividadePorId); // buscar atividade


module.exports = router;
