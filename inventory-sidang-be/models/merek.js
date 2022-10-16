'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Merek extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Sarana, { foreignKey: 'MerekId' });
    }
  }
  Merek.init({
    nama_merek: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Merek',
  });
  return Merek;
};