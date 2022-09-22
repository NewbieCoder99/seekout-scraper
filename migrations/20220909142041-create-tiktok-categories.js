'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TiktokCategories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      unique_code: {
        type: Sequelize.STRING,
        unique: true
      },
      category_1: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      category_2: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      category_3: {
        type: Sequelize.STRING,
        allowNull: true,
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TiktokCategories');
  }
};