'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TiktokCategories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TiktokCategories.init({
    unique_code: DataTypes.STRING,
    category_1: DataTypes.STRING,
    category_2: DataTypes.STRING,
    category_3: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TiktokCategories',
  });
  return TiktokCategories;
};