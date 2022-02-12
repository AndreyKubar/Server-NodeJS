module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.createTable('users', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER
        },
        fullname: {
          type: Sequelize.STRING
        },
        email: {
          type: Sequelize.STRING
        },
        password: {
          type: Sequelize.STRING
        },
        salt: {
          type: Sequelize.STRING
        },
        dob: {
          type: Sequelize.STRING
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
      });
    } catch (e) {
      res.json({
        message: e
      });
    }
  },

  async down(queryInterface, Sequelize) {
    try {
      await queryInterface.dropTable('users');
    } catch (e) {
      res.json({
        message: e
      });
    }
  }
};