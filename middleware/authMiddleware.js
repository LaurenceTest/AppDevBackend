const Joi = require("joi")

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
    schema.validateAsync(req.body).then(()=>{
        next()
    })
    .catch((error)=>{
        res.status(403).send({isApproved:false,msg:error.details[0].message})
    })
}

module.exports = {
    validateInput
}