require("dotenv").config()
const schema = require("../utils/userValidator")
const jwt = require("jsonwebtoken")


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

const logRequest = (req,res,next)=>{
    console.log(`method: ${req.method}\n`,`route: ${req.url}\n`,`timestamp: ${Date.now()}`)
    next()
}

module.exports = {
    validateInput,
    authenticateToken,
    logRequest
}