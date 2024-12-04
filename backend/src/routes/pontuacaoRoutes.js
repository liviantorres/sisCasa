const express = require('express');
const { atualizarPontuacao, atualizarHorasAtividades, buscarParticipacao } = require('../controllers/pontuacaoController');
const router = express.Router();

// Rota para atualizar pontuação de um usuário em uma atividade

router.put('/', atualizarHorasAtividades);

router.get('/:userId', buscarParticipacao);

module.exports = router;
