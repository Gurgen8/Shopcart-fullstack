import joi from "@hapi/joi"

const authSchem = joi.object({
    username: joi.string().min(2).max(18).regex(/^[a-z-A-Z][A-Z-a-z-0-9][^<>,*,(),{},[,\s]+$/).required(),
    email: joi.string().email().max(30).lowercase().regex(/^\S+@\S+\.\S+$/).required(),
    password: joi.string().min(6).max(22).regex(/^\S+$/).required(),
    confirmPassword: joi.string().min(6).max(22).regex(/^\S+$/).required(),

})

export default authSchem