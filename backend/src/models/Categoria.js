const { DataTypes } = require('sequelize');
const sequelize = require('../config/Connection');


const Categoria = sequelize.define('Categoria', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'Categorias',
  timestamps: true
});


module.exports = Categoria;
