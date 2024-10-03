const cors = require('cors');
const sequelize = require('./src/config/Connection'); 
const path = require('path');
const seedRoles = require('./src/config/SeedRoles')
const authRoutes = require('./src/routes/authRoutes');
const userRoutes = require('./src/routes/userRoutes')
const atividadeRoutes = require('./src/routes/atividadeRoutes')
const solicitacaoRoutes = require('./src/routes/solicitacaoRoutes')

const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();


app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


sequelize.authenticate()
  .then(() => {
    console.log('Conectado ao banco de dados.');
  })
  .catch((error) => {
    console.error('Erro ao conectar ao banco de dados:', error);
    process.exit(1);
  });


// Rotas publicas
app.use('/auth', authRoutes);

//Rotas Usuários
app.use('/user', userRoutes)

//Rotas Atividade
app.use('/atividade', atividadeRoutes)

//Rotas Solicitações
app.use('/solicitacao', solicitacaoRoutes);


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
  })
  .catch((error) => {
    console.error('Erro durante a configuração do banco de dados:', error);
    process.exit(1); 
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
