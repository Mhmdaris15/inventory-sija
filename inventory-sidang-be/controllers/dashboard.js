const { Merek,Sarana,Prasarana,Penggunaan } = require('../models');

class Dashboard {
    static showDashboard = async (req, res, next) => {
        try {
            const merek = await Merek.findAll();
            const penggunaan = await Penggunaan.findAll({
                where : {
                    statusPenggunaan: 'sedang digunakan'
                }
            });
            const prasarana = await Prasarana.findAll();

            res.status(200).json({
                jumlahMerek : merek.length,
                jumlahPenggunaan : penggunaan.length,
                jumlahPrasarana : prasarana.length
            })

        } catch (error) {
            next(error)
        }
    }
}

module.exports = Dashboard;