const { Penggunaan,Sarana,Merek,Prasarana } = require('../models');
const MerekController = require('./merek');

class PenggunaanController {
    static getAllPenggunaan = async (req, res, next) => {
        try {
            const allPenggunaan = await Penggunaan.findAll({
                include: {
                    model: Sarana,
                    include: {
                        model: Prasarana,
                        attributes : {
                            exclude : ['status','createdAt','updatedAt']
                        }
                    },
                    attributes : {
                        exclude : ['createdAt','updatedAt','MerekId','PrasaranaId','tipe','kondisi_layak_pakai','kondisi_rusak','satuan','keterangan']
                    }
                },attributes : {
                    exclude: ['createdAt','updatedAt','SaranaId']
                }
            });

            res.status(200).json({
                allPenggunaan,
            })
        } catch (error) {
            next(error);
        }
    }

    static peminjaman = async (req, res, next) => {
        try {
            const { 
                namaPengguna, 
                jumlahPenggunaan, 
                kondisiAwal,
                keteranganPengguna, 
                SaranaId,
                namaRuang } = req.body

            const saranaRecord = await Sarana.findByPk(SaranaId);
            const currentLayak = saranaRecord.kondisi_layak_pakai;

            if(currentLayak < 0 || currentLayak <= jumlahPenggunaan){
               return next({ code:406, message: `Jumlah ${saranaRecord.nama_sarana} yang layak pakai di kelas ini hanya ${saranaRecord.kondisi_layak_pakai}` })
            }

            const newPeminjamanData = {
                namaPengguna,
                tanggalPenggunaan: new Date(),
                statusPenggunaan: 'sedang digunakan',
                jumlahPenggunaan,
                kondisiAwal,
                keteranganPengguna,
                SaranaId,
                namaRuang,
            }

            const dataSaranaUpdate = {
                kondisi_layak_pakai: currentLayak - jumlahPenggunaan,
            }

            const newPeminjaman = await Penggunaan.create(newPeminjamanData);
            await Sarana.update(dataSaranaUpdate, {
                where: {
                    id: SaranaId
                }
            });

            res.status(200).json({
                message: "Peminjaman dilakukan",
                newPeminjaman
            });

        } catch (error) {
            next(error);
        }
    }

    static pengembalian = async (req, res, next) => {
        try {
            const { kondisiAkhir, keteranganPengguna, jumlahPengembalianBaik, isRusak, jumlahPengembalianRusak } = req.body;
            const { id } = req.params;

            const penggunaanRecord = await Penggunaan.findByPk(id, {
                include : {
                    model: Sarana,
                    attributes: {
                        exclude : ['createdAt','updatedAt','MerekId','PrasaranaId','satuan','keterangan']
                    }
                }
            });

            const dataPenggunaanToUpdate = {
                kondisiAkhir,
                statusPenggunaan: 'sudah dikembalikan',
                tanggalPengembalian: new Date(),
                keteranganPengguna,
                jumlahPengembalianBaik,
            }

            if(isRusak){
                dataPenggunaanToUpdate.jumlahPengembalianRusak = jumlahPengembalianRusak
            }

            const dataSaranaToUpdate = {
                kondisi_layak_pakai: penggunaanRecord.Sarana.kondisi_layak_pakai + jumlahPengembalianBaik,
                kondisi_rusak: isRusak === true ? penggunaanRecord.Sarana.kondisi_rusak + jumlahPengembalianRusak : penggunaanRecord.Sarana.kondisi_rusak
            }

            const updatedPenggunaan = await Penggunaan.update(dataPenggunaanToUpdate, {
                where : {
                    id: id
                }
            });

            const updatedSarana = await Sarana.update(dataSaranaToUpdate,{
                where : {
                    id: penggunaanRecord.Sarana.id
                }
            })

            res.status(200).json({
                updatedPenggunaan,
                updatedSarana
            })
        } catch (error) {
            next(error);
        }
    }
}

module.exports = PenggunaanController;