const { DataTypes } = require('sequelize');
const sequelize = require('../config/Connection');

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
  dataDeNascimento: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  genero: {
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
  roleId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, { timestamps: true });

module.exports = User;
