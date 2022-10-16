'use strict'

const {User} = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

class authController {
    static register = async (req, res, next) => {
        try {
            const {username, password, role} = req.body

            await User.create({
                username,
                password: bcrypt.hashSync(password, 8),
                role
            })

            res.status(201).json({
                message: "Daftar berhasil!",
                user: username,
                role: role
            })
        } catch (error) {
            next(error)
        }
    }
    static addAdmin = async (req, res, next) => {
        try {
            const {username, password} = req.body

            await User.create({
                username,
                password: bcrypt.hashSync(password, 8),
                role: "admin"
            })

            res.status(201).json({
                message: "Halo admin!",
                user: username
            })
        } catch (error) {
            next(error)
        }
    }

    static login = async(req, res, next) => {
        try {
            const {username, password} = req.body

            //user check
            const user = await User.findOne({where: {username}})
            if(!user){
                return next({name: "validasi", message: "Username/password salah"})
            }
            
            //verify password
            let cek = await bcrypt.compare(password, user.password)
            if (!cek) {
                return next({name: "Validasi" , message: "Username/password salah"})
            } 

            // create token
            const jwtPayload = {
                userId: user.id
            }
            const accessToken = jwt.sign(jwtPayload, process.env.JWT_SECRET_KEY)
            
            res.status(200).json({
                message: "Sukses, anda bisa login",
                accessToken: accessToken,
                role: user.role,
                
            })
            
        } catch (error) {
            next(error)
            
        }
    }

    static getAll = async (req,res,next) => {
        try {
            let users = await User.findAll({attributes: ['id', 'username', 'role']})
            res.status(200).json(users)
        } catch (error) {
            next(error)
        }
    }

    static getDetail = async (req,res,next) => {
        try {
            let {id} = req.params
            const user = await User.findByPk(id, {attributes: ['id', 'username', 'role', 'createdAt' , 'updatedAt']})
            if(!user) return next({message: "User tidak ditemukan"})

            res.status(200).json({
                message: 'detail user',
                user
            })
        } catch (error) {
            next(error)
        }
    }
    static updateRole = async (req,res,next) => {
        try {
            const {id} = req.params
            const {role} = req.body

            const update = await User.update({role: role}, {
                where: {id:id}
            })

            res.status(200).json({
                message: 'user updated',
                update
            })
        } catch (error) {
            next(error)
        }
    }
    static deleteUser = async (req,res,next) => {
        try {
            const {id} = req.params
            
            const userDelete = await User.destroy({where: { id: id}});

            res.status(200).json({
                message: "user deleted",
                userDelete
            })
        } catch (error) {
            next(error)
        }   
    }
}

module.exports = authController