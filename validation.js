const Joi = require('@hapi/joi')

const registerValidation = data => {
  const schema = Joi.object({
    first_name: Joi.string().max(255).required(),
    last_name: Joi.string().max(255).required(),
    gender: Joi.string().max(25).required(),
    dob: Joi.string().max(128).required(),
    email: Joi.string().max(255).email().required(),
    password: Joi.string().min(8).max(1024).required()
  })

  return schema.validate(data)
}

const messageValidation = data => {
  const schema = Joi.object({
    from: Joi.string().max(128).required(),
    to: Joi.string().max(128).required(),
    message: Joi.string().max(3000).required(),
  })

  return schema.validate(data)
}

const updateValidation = data => {
  const schema = Joi.object({
    first_name: Joi.string().max(255),
    last_name: Joi.string().max(255),
    gender: Joi.string().max(25),
    dob: Joi.string().max(128)
  })

  return schema.validate(data)
}

const loginValidation = data => {
  const schema = Joi.object({
    email: Joi.string().max(255).email().required(),
    password: Joi.string().min(8).max(1024).required()
  })

  return schema.validate(data)
}

module.exports.registerValidation = registerValidation
module.exports.updateValidation = updateValidation
module.exports.loginValidation = loginValidation
module.exports.messageValidation = messageValidation