const saranaRouter = require('express').Router();
const SaranaController = require('../controllers/sarana');

saranaRouter.get('/sarana/check', (req, res) => {
    res.status(200).json({
        message: "sarana route ready"
    })
})

saranaRouter.post('/sarana', SaranaController.createSarana);
saranaRouter.get('/sarana/:id', SaranaController.getById);
saranaRouter.patch('/sarana/:id', SaranaController.updateSarana);

module.exports = saranaRouter;