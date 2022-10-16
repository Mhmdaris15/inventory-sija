'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Prasarana extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Sarana, { foreignKey: 'PrasaranaId' });
    }
  }
  Prasarana.init({
    nama_ruang: DataTypes.STRING,
    status: DataTypes.ENUM('Dipakai', 'Tidak Dipakai', 'Perbaikan')
  }, {
    sequelize,
    modelName: 'Prasarana',
  });
  return Prasarana;
};