const cors = require('cors');
const sequelize = require('./src/config/Connection'); 
const authRoutes = require('./src/routes/AuthRoutes');
const userRoutes = require('./src/routes/UserRoutes')
const atividadeRoutes = require('./src/routes/atividadeRoutes')

const express = require('express');
const app = express();

const dotenv = require('dotenv');
dotenv.config();


// Middlewares
app.use(cors());
app.use(express.json());


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


sequelize.sync({ force: true }) 
  .then(() => {
    console.log('Banco de dados sincronizado.');
  })
  .catch((error) => {
    console.error('Erro ao sincronizar o banco de dados:', error);
  });


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
