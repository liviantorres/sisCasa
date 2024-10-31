const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/Connection');
const Role = require('./Role'); 
const Pontuacao = require('./Pontuacao');
const UserPontuacao = require('./UserPontuacao');
const Atividade = require('./Atividade');
const UserAtividade = require('./UserAtividade');

class User extends Model {}

User.init({
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
}, { 
  sequelize, 
  modelName: 'User', 
  tableName: 'users', 
  timestamps: true 
});


// Relacionamentos de Usuario e Atividade
User.belongsToMany(Atividade, {
  through: {
    model: UserAtividade
  },
  foreignKey: 'userId',
  constraint: true
});


Atividade.belongsToMany(User, {
  through: {
    model: UserAtividade
  },
  foreignKey: 'atividadeId',
  constraint: true
})

User.hasMany(UserAtividade, {foreignKey: 'userId'});
UserAtividade.belongsTo(User, {foreignKey: 'userId'});
Atividade.hasMany(UserAtividade, {foreignKey: 'atividadeId'});
UserAtividade.belongsTo(Atividade, {foreignKey: 'atividadeId'});


// Relacionamento de perfis do usuário
User.belongsToMany(Role, { through: 'UserRole', foreignKey: 'userId' });
Role.belongsToMany(User, { through: 'UserRole', foreignKey: 'roleId' });


User.belongsToMany(Pontuacao, { through: UserPontuacao });
Pontuacao.belongsToMany(User, { through: UserPontuacao });

module.exports = User;
