const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/Connection');
const Participacao = require('./Participacao');

class AtividadeTabela extends Model {}

AtividadeTabela.init({
  codigo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nome: {
    type: DataTypes.STRING(500),
    allowNull: false,
  },
  metrica: {
    type: DataTypes.STRING(500),
    allowNull: true,
  },
  teto_autorizado: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  horas_submetidas: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  horas_consideradas: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'AtividadeTabela',
  timestamps: true,
});

// Relacionamento entre AtividadeTabela e Participacao
AtividadeTabela.hasMany(Participacao, { foreignKey: 'atividadeTabelaId' });
Participacao.belongsTo(AtividadeTabela, { foreignKey: 'atividadeTabelaId' });



module.exports = AtividadeTabela;
