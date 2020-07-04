const Joi = require('@hapi/joi')

const registerValidation = data => {
  const schema = Joi.object({
    name: Joi.string().max(255).required(),
    email: Joi.string().max(255).email().required(),
    password: Joi.string().min(8).max(1024).required()
  })

  return schema.validate(data)
}

const updateValidation = data => {
  const schema = Joi.object({
    name: Joi.string().max(255)
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