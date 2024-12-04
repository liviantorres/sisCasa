const express = require('express');
const router = express.Router();
const FrequenciaController = require('../controllers/frequenciaController');


router.post('/', FrequenciaController.criarFrequencia);
router.get('/atividade/:atividadeId', FrequenciaController.listarFrequenciasPorAtividade);
router.put('/:frequenciaId', FrequenciaController.atualizarFrequencia);
router.delete('/:frequenciaId', FrequenciaController.excluirFrequencia);

module.exports = router;
