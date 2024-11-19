
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/Connection');
const AtividadeTabela = require('./AtividadeTabela'); 

const Participacao = require('./Participacao');

class Categoria extends Model {}

Categoria.init({
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'Categoria',
});


Categoria.hasMany(AtividadeTabela, {
  foreignKey: 'categoriaId',
  as: 'atividades' 
});


AtividadeTabela.belongsTo(Categoria, {
  foreignKey: 'categoriaId', 
  as: 'categoria'
});


AtividadeTabela.hasMany(Participacao, { foreignKey: 'atividadeId' });
Participacao.belongsTo(AtividadeTabela, { foreignKey: 'atividadeId' });



module.exports = Categoria;
