const sequelize = require('../config/Connection');
const { DataTypes } = require('sequelize');

const Role = sequelize.define('Role', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    roleName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, { timestamps: false });
  
  module.exports = Role;
  