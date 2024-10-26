const express = require('express');
const { auth, admin } = require('../middlewares/authMiddleware');
const {
  criarAtividade,
  atualizarAtividade,
  listarAtividades,
  obterAtividadePorId,
  deletarAtividade,
  obterFrequenciasPorData,
  atualizarSituacaoAluno,
  atualizarFrequencias,
  atualizarFrequenciaPorAluno
} = require('../controllers/atividadeController');

const router = express.Router();


router.get('/', auth, listarAtividades); // Buscar atividades
router.post('/criar', auth, admin, criarAtividade); // Criar atividade
router.put('/editar/:id', auth, admin, atualizarAtividade); // Editar atividade
router.delete('/deletar/:id', auth, admin, deletarAtividade); // Deletar atividade
router.get('/buscar/:id', auth, obterAtividadePorId); // Buscar atividade
router.post('/:id/frequencias', auth, obterFrequenciasPorData); // Obter frequências por data
router.put('/:id/frequencias', auth, admin, atualizarFrequencias); // Atualizar frequências da atividade

router.put('/:id/alunos/:alunoId/situacao', auth, admin, atualizarSituacaoAluno); // Atualizar situação do aluno
router.put('/:id/frequencias/:data', auth, admin, atualizarFrequenciaPorAluno); // Atualizar frequência de um aluno em uma data específica

module.exports = router;
