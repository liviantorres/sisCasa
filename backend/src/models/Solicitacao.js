const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/Connection');

class Solicitacao extends Model {}

Solicitacao.init({
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  cursoId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  comprovante: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false
  },
  motivo: {
    type: DataTypes.STRING, 
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'Solicitacao'
});

module.exports = Solicitacao;
