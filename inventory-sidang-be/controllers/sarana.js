const { Sarana, Prasarana, Merek } = require('../models');

class SaranaController {
    static getAllSarana = async (req, res, next) => {
        try {
            const allSarana = await Sarana.findAll()

            res.status(200).json({
                allSarana
            });
        } catch (error) {
            next(error);
        }
    }

    static getById = async (req, res, next) => {
        try {
            const { id } = req.params;

            const detailSarana = await Sarana.findByPk(id);

            res.status(200).json({
                detailSarana,
            });

        } catch (error) {
            next(error);
        }
    }

    static updateSarana = async (req, res, next) => {
        try {
            const { id } = req.params;
            const { kondisi_layak_pakai, kondisi_rusak } = req.body;

            let dataToUpdate = {kondisi_layak_pakai, kondisi_rusak};

            const updatedSarana = await Sarana.update(dataToUpdate,{
                where : {
                    id: id,
                }
            })

            res.status(200).json({
                message: 'Update Sukses',
                updatedSarana,
            })
        } catch (error) {
            next(error);
        }
    }

    static createSarana = async (req, res, next) => {
        try {
            const {
                nama_sarana,
                tipe,
                kondisi_layak_pakai,
                kondisi_rusak,
                satuan,
                keterangan,
                PrasaranaId,
                MerekId,
            } = req.body;

            const newSaranaData = {
                nama_sarana,
                tipe,
                kondisi_layak_pakai,
                kondisi_rusak,
                satuan,
                keterangan,
                PrasaranaId,
                MerekId,
            };

            const newSarana = await Sarana.create(newSaranaData);

            res.status(201).json({
                message: "Sarana baru telah dibuat !",
                newSarana,
            })
            
        } catch (error) {
            next(error);
        }
    }
}

module.exports = SaranaController;