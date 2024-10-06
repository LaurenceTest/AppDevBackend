const UserModel = require("../models/userModel.cjs")

const UserController = {
    login: (req,res)=>{
        try {
            const {email} = req.body
            if(UserModel.findUser(email) !== null){
                res.status(201).send({isApproved:true})
            }else res.status(200).send({isApproved:false})
        } catch (error) {
            res.status(500).send("An error has occurred. Please try again later")
        }
    },
    register: (req,res)=>{
        try {
            const {email} = req.body
            if(UserModel.findUser(email) === null){
                UserModel.create(req.body)
                res.status(200).send({isApproved:true})
            }else res.status(200).send({isApproved:false})
        } catch (error) {
            res.status(500).send("An error has occurred. Please try again later")
        }
    },
    getProfile: (req,res)=>{
        res.status(503).send("Currently Unavailable")
    }
}

module.exports = UserController