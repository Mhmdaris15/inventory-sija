const prasaranaRouter = require('express').Router();
const PrasaranaController = require('../controllers/prasarana')

prasaranaRouter.get('/prasarana/check', (req, res) => {
    res.status(200).json({
        message: "prasarana route ready"
    });
})

prasaranaRouter.get('/prasarana', PrasaranaController.getAllPrasarana);
prasaranaRouter.post('/prasarana', PrasaranaController.createPrasarana);
prasaranaRouter.get('/prasarana/:id', PrasaranaController.getById);
prasaranaRouter.patch('/prasarana/:id', PrasaranaController.updateStatus);

module.exports = prasaranaRouter;