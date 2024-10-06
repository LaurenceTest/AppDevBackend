require("dotenv").config()
const UserModel = require("../models/userModel.js")
const jwt = require('jsonwebtoken')

const UserController = {
    login: (req,res)=>{
        try {
            const {email,username,password} = req.body
            //Checks if user or email exists
            const user = UserModel.findUserByEmail(email) ?? UserModel.findUserByName(username)
            if(user !== null && user?.password === password){
                const token = jwt.sign({
                    email:user.email,
                    username:user.username
                },process.env.ACCESS_TOKEN)
                res.status(200).send({user:token})
            }
            else res.sendStatus(403)
        } catch (error) {
            res.sendStatus(500)
        }
    },
    register: (req,res)=>{
        try {
            const {email,username} = req.body
            if(UserModel.findUserByEmail(email) === null && UserModel.findUserByName(username) === null){
                UserModel.create(req.body)
                res.sendStatus(201)
            }else res.status(403).send({msg:"User already exists"})
        } catch (error) {
            res.sendStatus(500)
        }
    },
    getProfile: (req,res)=>{
        try {
            const user = UserModel.findUserByEmail(req.user.email)
            if(user) res.status(200).send(user)
            else res.sendStatus(404)
        } catch (error) {
            res.sendStatus(500)
        }
    }
}

module.exports = UserController