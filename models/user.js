const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    accessLevel: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user'
    }
  });

  // Optional: Define associations here
  // User.associate = (models) => { ... }

  return User;
};