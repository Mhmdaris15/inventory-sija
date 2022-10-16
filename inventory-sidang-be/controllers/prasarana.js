const { Prasarana,Sarana } = require('../models');

class PrasaranaController {
    static getAllPrasarana = async (req, res, next) => {
        try {
            const allPrasarana = await Prasarana.findAll({
                include: Sarana,
            })

            res.status(200).json({
                allPrasarana
            });
        } catch (error) {
            next(error);
        }
    }

    static getById = async (req, res, next) => {
        try {
            const { id } = req.params;

            const detailPrasarana = await Prasarana.findByPk(id,{
                include: {
                    model: Sarana,
                }
            });

            res.status(200).json({
                detailPrasarana,
            });

        } catch (error) {
            next(error);
        }
    }

    static createPrasarana = async (req, res, next) => {
        try {
            const { nama_ruang, status } = req.body;

            const newPrasaranaData = {
                nama_ruang,
                status
            };

            const newPrasarana = await Prasarana.create(newPrasaranaData);

            res.status(201).json({
                message: "Prasarana baru telah dibuat !",
                newPrasarana,
            })
        } catch (error) {
            next(error);
        }
    }

    static updateStatus = async (req, res, next) => {
        try {
            const { id } = req.params;
            const { status } = req.body;

            const dataToUpdate = {
                status,
            }

            const updated = await Prasarana.update(dataToUpdate, {
                where : {
                    id: id
                }
            });

            res.status(200).json({
                message: "Status ruangan di update",
            })
        } catch (error) {
            next(error);
        }
    }
}

module.exports = PrasaranaController;