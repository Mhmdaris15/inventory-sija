'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Penggunaan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Sarana,{ foreignKey: 'SaranaId' });
    }
  }
  Penggunaan.init({
    namaPengguna: DataTypes.STRING,
    tanggalPenggunaan: DataTypes.DATE,
    tanggalPengembalian: DataTypes.DATE,
    statusPenggunaan: DataTypes.ENUM('sudah dikembalikan', 'sedang digunakan'),
    jumlahPenggunaan: DataTypes.INTEGER,
    jumlahPengembalianBaik: DataTypes.INTEGER,
    jumlahPengembalianRusak: DataTypes.INTEGER,
    kondisiAwal: DataTypes.STRING,
    kondisiAkhir: DataTypes.STRING,
    namaRuang: DataTypes.STRING,
    keteranganPengguna: DataTypes.STRING,
    SaranaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Penggunaan',
  });
  return Penggunaan;
};