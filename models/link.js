'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Link extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Link.init({
    uniqueCode : DataTypes.STRING,
    address: DataTypes.STRING,
    content: DataTypes.TEXT,
    domain: DataTypes.STRING,
    categories: DataTypes.STRING,
    keyword: DataTypes.STRING,
    scraped: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Link',
  });
  return Link;
};