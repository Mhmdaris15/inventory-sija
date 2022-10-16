const { Merek,Sarana,Prasarana } = require('../models');

class MerekController {
    static getAllMerek = async (req, res, next) => {
        try {
            const allMerek = await Merek.findAll({
                include: {
                    model:Sarana,
                    include: Prasarana
                }
            });

            res.status(200).json({
                allMerek
            });
        } catch (error) {
            next(error);
        }
    }

    static getById = async (req, res, next) => {
        try {
            const { id } = req.params;
            
            const getOneMerek = await Merek.findByPk(id,{
                include : {
                    model: Sarana,
                    include: Prasarana,
                }
            })

            if(!getOneMerek){
                const customError = new Error('Merek not found');
                customError.code = 404;
                throw customError;
            }

            res.status(200).json({
                getOneMerek
            });

        } catch (error) {
            next(error)
        }
    }

    static createMerek = async (req, res, next) => {
        try {
            const { nama_merek } = req.body;

            const newMerek = await Merek.create({
                nama_merek,
            })

            res.status(200).json({
                message: 'Merek baru telah ditambahkan !',
                newMerek,
            })
        } catch (error) {
            next(error);
        }
    }
}

module.exports = MerekController;