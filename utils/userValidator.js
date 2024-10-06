const Joi = require("joi")

/**
 * Username allows alphanumeric, with 3-32 characters only
 * Password only allows a to Z and 0 to 9, with 3-30 characters
 * Email uses Joi email validation
 */
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

module.exports = schema