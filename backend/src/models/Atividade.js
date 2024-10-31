const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/Connection');

class Atividade extends Model {}

Atividade.init({
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
        allowNull: true,
    },
    cargaHoraria: {
        type: DataTypes.INTEGER,
        allowNull: true, 
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: true, 
    },
    link: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    frequencia: {
        type: DataTypes.JSON,
        allowNull: true, 
    },
}, {
    sequelize,
    modelName: 'Atividade',
    tableName: 'atividades',
    timestamps: true,
});

module.exports = Atividade;
