const { DataTypes } = require('sequelize');
const sequelize = require('../config/Connection');

const UserAtividade = sequelize.define('UserAtividade', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  situacao: {
    type: DataTypes.STRING, 
    allowNull: false,
    defaultValue: 'pendente'
  }
}, { timestamps: false });

module.exports = UserAtividade;
