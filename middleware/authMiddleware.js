require("dotenv").config()
const Joi = require("joi")
const jwt = require("jsonwebtoken")

const schema = Joi.object({
    username: Joi.string()
    .alphanum()
    .min(3)
    .max(32),
    password: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .min(3)
})

const validateInput = (req,res,next)=>{
    if(Object.keys(req.body).length === 0) res.sendStatus(400)
    else
    schema.validateAsync(req.body).then(()=>{
        next()
    })
    .catch((error)=>{
        res.status(403).send({msg:error.details[0].message})
    })
}

const authenticateToken = (req,res,next)=>{
    const authHeader = req.headers["authorization"]
    const token = authHeader?.split(' ')[1]
    if(token == null) return res.sendStatus(401)
    jwt.verify(token,process.env.ACCESS_TOKEN,(err,user)=>{
        if(err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

module.exports = {
    validateInput,
    authenticateToken
}