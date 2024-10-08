const { DataTypes } = require('sequelize');
const sequelize = require('../config/Connection');
const Role = require('./Role'); 
const Pontuacao = require('./Pontuacao');
const UserPontuacao = require('./UserPontuacao'); // Importe o modelo de junção

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nomeCompleto: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  siape: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dataDeNascimento: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  whatsapp: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, { timestamps: true });

// Definindo as associações com Role
User.belongsToMany(Role, { through: 'UserRole', foreignKey: 'userId' });
Role.belongsToMany(User, { through: 'UserRole', foreignKey: 'roleId' });

// Definindo as associações com Pontuacao
User.belongsToMany(Pontuacao, { through: UserPontuacao });
Pontuacao.belongsToMany(User, { through: UserPontuacao });

module.exports = User;
