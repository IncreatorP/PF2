const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ensure this path matches where your database config is

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
    defaultValue: 'user' // Default access level
  }
});

module.exports = User;
