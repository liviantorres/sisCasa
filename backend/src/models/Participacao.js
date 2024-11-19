const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/Connection');

class Participacao extends Model {}

Participacao.init({
  horasSubmetidas: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  horasConsideradas: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Participacao'
});

module.exports = Participacao;
