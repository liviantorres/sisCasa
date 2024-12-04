const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/Connection');

const Atividade = require('../models/Atividade');
const User = require('../models/User');

class Frequencia extends Model {}

Frequencia.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  data: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  situacao: {
    type: DataTypes.STRING, // "Presente" ou "Ausente"
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Frequencia',
  tableName: 'frequencias',
  timestamps: true,
});


module.exports = Frequencia;
