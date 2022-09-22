'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {

  class ScrapeData extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }

  ScrapeData.init({
    code: DataTypes.STRING,
    serviceName : DataTypes.STRING,
    computerName : DataTypes.STRING,
    category : DataTypes.STRING,
    data: DataTypes.JSON,
    additional_data: DataTypes.JSON,
    isValid: DataTypes.BOOLEAN,
    isScraped : DataTypes.BOOLEAN,
    isExported : DataTypes.BOOLEAN,
    exportStatus : DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ScrapeData',
  });
  return ScrapeData;
};