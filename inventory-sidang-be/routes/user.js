'use strict'

const router = require ('express').Router();
const authController = require ('../controllers/auth')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.post('/users/add-user' ,authentication , authorization(['admin']), authController.register)
router.post('/users/regis-admin', authController.addAdmin)
router.post('/users/login' , authController.login)
router.get('/users', authentication , authorization(['admin']), authController.getAll )
router.get('/users/:id', authentication, authorization(['admin']), authController.getDetail)
router.patch('/users/:id/update', authentication, authorization(['admin']), authController.updateRole)
router.delete('/users/:id/delete', authentication, authorization(['admin']), authController.deleteUser)

module.exports = router