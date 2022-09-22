'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Links', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      uniqueCode : {
        type: Sequelize.STRING,
        unique: true
      },
      address: {
        type: Sequelize.STRING
      },
      content : {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      domain: {
        type: Sequelize.STRING
      },
      categories: {
        type: Sequelize.STRING
      },
      keyword : {
        type: Sequelize.STRING,
        allowNull: true,
      },
      scraped: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('Links');
  }
};