dashboardRouter = require('express').Router();
dashboardController = require('../controllers/dashboard')

dashboardRouter.get('/dashboard/check', (req, res) => {
    res.status(200).json({
        message: "dashboard route ready"
    });
})

dashboardRouter.get('/dashboard', dashboardController.showDashboard);

module.exports = dashboardRouter;