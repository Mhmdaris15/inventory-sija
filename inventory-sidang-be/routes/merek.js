const merekRouter = require('express').Router();
const MerekController = require('../controllers/merek');

merekRouter.get('/merek/check', (req, res) => {
    res.status(200).json({
        message: "merek route ready"
    });
})

merekRouter.get('/merek', MerekController.getAllMerek);
merekRouter.post('/merek', MerekController.createMerek);
merekRouter.get('/merek/:id', MerekController.getById);

module.exports = merekRouter;