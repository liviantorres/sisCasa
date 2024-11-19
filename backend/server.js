const cors = require('cors');
const sequelize = require('./src/config/Connection'); 
const path = require('path');
const seedRoles = require('./src/config/SeedRoles');
const importCSV = require('./src/config/importCSV'); 
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes');
const atividadeRoutes = require('./src/routes/atividadeRoutes');
const solicitacaoRoutes = require('./src/routes/solicitacaoRoutes');
const pontuacaoRoutes = require('./src/routes/pontuacaoRoutes');
const categoriaRoutes = require('./src/routes/categoriaRoutes');

const express = require('express');
const app = express();
const dotenv = require('dotenv');

dotenv.config();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rotas públicas
app.use('/auth', authRoutes);

// Rotas de Usuários
app.use('/user', userRoutes);

// Rotas de Atividades
app.use('/atividade', atividadeRoutes);

// Rotas de Solicitações
app.use('/solicitacao', solicitacaoRoutes);

app.use('/categorias', categoriaRoutes);



sequelize.authenticate()
  .then(() => {
    console.log('Conectado ao banco de dados.');
    
    return sequelize.sync({ force: true }); 
  })
  .then(() => {
    console.log('Banco de dados sincronizado.');
    return seedRoles(); 
  })
  .then(() => {
    console.log('Papéis inseridos com sucesso.');
    return importCSV(); 
  })
  .then(() => {
    console.log('Dados do CSV importados com sucesso.');
  })
  .catch((error) => {
    console.error('Erro durante a configuração do banco de dados:', error);
    process.exit(1); 
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
