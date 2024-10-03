const sequelize = require('../config/Connection');

const UserRole = sequelize.define('UserRole', {
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
    },
    roleId: {
      type: DataTypes.INTEGER,
      references: {
        model: Role,
        key: 'id',
      },
    },
  }, { timestamps: false });
  
  module.exports = UserRole;
  