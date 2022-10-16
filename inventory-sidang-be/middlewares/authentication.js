'use strict'

const {User} = require('../models')
const jwt = require('jsonwebtoken')

const authentication = async (req,res,next) => {
    try {
        const {token} = req.headers
        if(!token){
            return next({message: "Tidak terauthentikasi"})
        }

        //verify token
        const jwtPayload = jwt.verify(token, process.env.JWT_SECRET_KEY)

        //user check
        const dataUser = await User.findByPk(jwtPayload.userId)
        if(!dataUser){
            return next({name: "unauthenticated", message: "Invalid akses token!"})
        }
        req.currentUser = dataUser.dataValues
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = authentication
