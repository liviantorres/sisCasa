const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/Connection');  // Ajuste o caminho, se necessário

class Participacao extends Model {}

Participacao.init({
  // Defina os campos do modelo aqui
  horasSubmetidas: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  horasConsideradas: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  atividadeTabelaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Participacao',
  timestamps: true,
});

module.exports = Participacao;
