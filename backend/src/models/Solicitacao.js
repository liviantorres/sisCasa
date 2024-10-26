const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/Connection');

class Solicitacao extends Model {}

Solicitacao.init({
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  tipoSolicitacao: {
    type: DataTypes.ENUM('Certificado de Horas', 'Certificado de Curso', 'Contabilizar Horas'),
    allowNull: false
  },
  cursoId: {
    type: DataTypes.INTEGER,
    allowNull: true 
  },
  comprovante: {
    type: DataTypes.STRING,
    allowNull: true 
  },
  certificado: {
    type: DataTypes.STRING,
    allowNull: true 
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false 
  },
  data: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW 
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Pendente'
  },
  motivo: {
    type: DataTypes.STRING,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'Solicitacao'
});

module.exports = Solicitacao;
