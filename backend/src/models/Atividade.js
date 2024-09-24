const { DataTypes } = require('sequelize');
const sequelize = require('../config/Connection');
const User = require('./User'); // Assumindo que o model User já existe

const Atividade = sequelize.define('Atividade', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  professorId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users', 
      key: 'id',
    },
    allowNull: false,
  },
  cargaHoraria: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  link: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  frequencias: {
    type: DataTypes.JSONB, // JSONB para armazenar os objetos de frequência
    allowNull: true,
    defaultValue: [],
    // Estrutura do JSON esperado:
    // [
    //   {
    //     data: '2024-09-24',
    //     alunos: [
    //       { idAluno: 1, presente: true },
    //       { idAluno: 2, presente: false }
    //     ]
    //   }
    // ]
  }
}, { timestamps: true });

Atividade.belongsTo(User, { foreignKey: 'usuarioId', as: 'responsavel' });

module.exports = Atividade;
