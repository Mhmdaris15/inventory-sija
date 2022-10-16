'use strict'

const authorization = (roles) => (req,res,next) => {
    const userRole = req.currentUser.role
    if(!roles.includes(userRole)){
        return next({message: "unauthorize"})
    }
    next()
}

module.exports = authorization