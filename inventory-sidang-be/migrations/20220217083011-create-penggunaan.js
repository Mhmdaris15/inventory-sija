'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Penggunaans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      namaPengguna: {
        type: Sequelize.STRING
      },
      tanggalPenggunaan: {
        type: Sequelize.DATE
      },
      tanggalPengembalian: {
        type: Sequelize.DATE
      },
      statusPenggunaan: {
        type: Sequelize.ENUM('sudah dikembalikan', 'sedang digunakan')
      },
      jumlahPenggunaan: {
        type: Sequelize.INTEGER
      },
      jumlahPengembalianBaik: {
        type: Sequelize.INTEGER
      },
      jumlahPengembalianRusak: {
        type: Sequelize.INTEGER
      },
      kondisiAwal: {
        type: Sequelize.STRING
      },
      kondisiAkhir: {
        type: Sequelize.STRING
      },
      namaRuang: {
        type: Sequelize.STRING
      },
      keteranganPengguna: {
        type: Sequelize.STRING
      },
      SaranaId: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Penggunaans');
  }
};