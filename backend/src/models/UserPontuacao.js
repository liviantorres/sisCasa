const { DataTypes } = require('sequelize');
const sequelize = require('../config/Connection');
const User = require('./User')
const Pontuacao = require('./Pontuacao');

const UserPontuacao = sequelize.define('UserPontuacao', {
  horasSubmetidas: {
    type: DataTypes.INTEGER,
    allowNull: false, 
  },
  horasConsideradas: {
    type: DataTypes.INTEGER,
    allowNull: true, 
  },
}, {
  timestamps: true,
});



module.exports = UserPontuacao;
