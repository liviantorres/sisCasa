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
    allowNull: true // Apenas para 'Certificado de Curso'
  },
  comprovante: {
    type: DataTypes.STRING,
    allowNull: true // Apenas para 'Contabilizar Horas'
  },
  certificado: {
    type: DataTypes.STRING,
    allowNull: true // Para 'Certificado de Horas' e 'Certificado de Curso'
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: false // Descrição fornecida pelo usuário
  },
  data: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW // Data de solicitação
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Pendente' // Status inicial da solicitação
  },
  motivo: {
    type: DataTypes.STRING,
    allowNull: true // Motivo de aceitação/rejeição
  }
}, {
  sequelize,
  modelName: 'Solicitacao'
});

module.exports = Solicitacao;
