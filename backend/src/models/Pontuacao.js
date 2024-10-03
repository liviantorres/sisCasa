const { DataTypes } = require('sequelize');
const sequelize = require('../config/Connection'); 

const Pontuacao = sequelize.define('Pontuacao', {
  categoria: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  metrica: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  tetoHoras: {
    type: DataTypes.INTEGER,
    allowNull: false, 
  },
  horasSubmetidas: {
    type: DataTypes.INTEGER,
    allowNull: true, 
  },
  horasConsideradas: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: 'Pontuacoes',
  timestamps: true, 
});

module.exports = Pontuacao;
