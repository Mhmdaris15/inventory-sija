const PenggunaanRouter = require('express').Router();
const PenggunaanController = require('../controllers/penggunaan')

PenggunaanRouter.get('/penggunaan/check', (req, res) => {
    res.status(200).json({
        message: 'Penggunaan route ready to use'
    })
})

PenggunaanRouter.get('/penggunaan', PenggunaanController.getAllPenggunaan);
PenggunaanRouter.post('/penggunaan/create', PenggunaanController.peminjaman);
PenggunaanRouter.patch('/penggunaan/update/:id', PenggunaanController.pengembalian);

module.exports = PenggunaanRouter