'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sarana extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Prasarana,{foreignKey: 'PrasaranaId'});
      this.belongsTo(models.Merek,{ foreignKey: 'MerekId' });
      this.hasMany(models.Penggunaan, { foreignKey: 'SaranaId' });
    }
  }
  Sarana.init({
    nama_sarana: DataTypes.STRING,
    tipe: DataTypes.ENUM('Alat', 'Bahan'),
    kondisi_layak_pakai: DataTypes.INTEGER,
    kondisi_rusak: DataTypes.INTEGER,
    satuan: DataTypes.STRING,
    keterangan: DataTypes.STRING,
    PrasaranaId: DataTypes.INTEGER(10),
    MerekId: DataTypes.INTEGER(10)
  }, {
    sequelize,
    modelName: 'Sarana',
  });
  return Sarana;
};