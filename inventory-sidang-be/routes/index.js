const mainRouter = require('express').Router();

const saranaRoute = require('./sarana');
const merekRoute = require('./merek');
const prasaranaRoute = require('./prasana');
const userRoute = require('./user')
const penggunaanRoute = require('./penggunaan');
const dashboardRouter = require('./dashboard');

mainRouter.get('/', (req, res) => {
    res.status(200).json({
        message: "Server Inventory ready"
    })
})

mainRouter.use(saranaRoute);
mainRouter.use(merekRoute);
mainRouter.use(prasaranaRoute);
mainRouter.use(userRoute)
mainRouter.use(penggunaanRoute);
mainRouter.use(dashboardRouter);

module.exports = mainRouter;