const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("online_store", "macbook", "password", {
    host: 'localhost',
    dialect: 'postgres',
  },
);

module.exports = {
  sequelize,
};