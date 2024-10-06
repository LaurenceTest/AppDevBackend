const schema = require("../utils/userValidator")
//Uses a schema to validate
const validateInput = (req,res,next)=>{
    //Checks if the request is empty
    if(Object.keys(req.body).length === 0) res.sendStatus(400)
    else
    schema.validateAsync(req.body).then(()=>{
        next()
    })
    .catch((error)=>{
        res.status(403).send({msg:error.details[0].message})
    })
}

module.exports = validateInput