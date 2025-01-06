const express = require('express');
const multer = require('multer');
const { atualizarHorasAtividades, buscarParticipacao } = require('../controllers/pontuacaoController');
const importCSV = require('../config/importCSV'); 
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname); 
  },
});

const upload = multer({ storage: storage }); 

router.put('/', atualizarHorasAtividades);

router.get('/:userId', buscarParticipacao);

router.post('/atualizarTabela', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('Nenhum arquivo foi enviado.');
    }

    const caminhoDoArquivo = req.file.path;
    console.log('Arquivo CSV enviado:', caminhoDoArquivo);

    await importCSV(caminhoDoArquivo);

    return res.status(200).send('Dados atualizados com sucesso!');
  } catch (error) {
    console.error('Erro ao processar o arquivo CSV:', error);
    return res.status(500).send('Erro ao processar o arquivo CSV.');
  }
});

module.exports = router;
