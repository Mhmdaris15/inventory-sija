'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Saranas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nama_sarana: {
        type: Sequelize.STRING
      },
      tipe: {
        type: Sequelize.ENUM('Alat', 'Bahan')
      },
      kondisi_layak_pakai: {
        type: Sequelize.INTEGER
      },
      kondisi_rusak: {
        type: Sequelize.INTEGER
      },
      satuan: {
        type: Sequelize.STRING
      },
      keterangan: {
        type: Sequelize.STRING
      },
      MerekId: {
        type: Sequelize.INTEGER(10)
      },
      PrasaranaId: {
        type: Sequelize.INTEGER(10)
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
    await queryInterface.dropTable('Saranas');
  }
};