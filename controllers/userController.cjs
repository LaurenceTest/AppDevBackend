require("dotenv").config()
const UserModel = require("../models/userModel.cjs")
const jwt = require('jsonwebtoken')

const UserController = {
    login: (req,res)=>{
        try {
            const {email,username} = req.body
            if(UserModel.findUser(email) !== null){
                const token = jwt.sign({
                    email,
                    username
                },process.env.ACCESS_TOKEN)
                res.status(200).send({user:token})
            }else res.sendStatus(403)
        } catch (error) {
            res.sendStatus(500)
        }
    },
    register: (req,res)=>{
        try {
            const {email} = req.body
            if(UserModel.findUser(email) === null){
                UserModel.create(req.body)
                res.sendStatus(200)
            }else res.status(403).send({msg:"User already exists"})
        } catch (error) {
            res.sendStatus(500)
        }
    },
    getProfile: (req,res)=>{
        try {
            const user = UserModel.findUser(req.user.email)
            if(user) res.status(200).send(user)
            else res.sendStatus(404)
        } catch (error) {
            res.sendStatus(500)
        }
    }
}

module.exports = UserController