const Sequelize = require("sequelize");
const { DataTypes } = require('sequelize');

const { sequelize } = require('../config/db.js');

const User = sequelize.define("users", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  fullname: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  salt: {
    type: Sequelize.STRING,
  },
  dob: {
    type: DataTypes.DATE,
    allowNull: false
  },
}, { tableName: 'users' });

module.exports = {
  User,
}