const multer = require('multer');
const path = require('path');

// Configuração do armazenamento de arquivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/pdfs'); // Diretório onde os PDFs serão salvos
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Nome único para o arquivo
  }
});

const upload = multer({ storage: storage });

module.exports = upload;