'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ScrapeData', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      code: {
        type: Sequelize.STRING,
        unique: true
      },
      computerName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      serviceName : {
        type: Sequelize.STRING,
        allowNull: true,
      },
      category : {
        type: Sequelize.STRING,
        allowNull: true,
      },
      data: {
        type: Sequelize.JSON
      },
      additional_data : {
        type: Sequelize.JSON,
        allowNull: true,
      },
      isValid: {
        type: Sequelize.BOOLEAN
      },
      isScraped: {
        type: Sequelize.BOOLEAN
      },
      isExported: {
        type: Sequelize.BOOLEAN
      },
      exportStatus : {
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ScrapeData');
  }
};