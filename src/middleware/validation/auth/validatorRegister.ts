import Joi from 'joi'

const validatorRegister = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  confirm_password: Joi.string().valid(Joi.ref('password')).required().label('Confirm password').messages({
    'any.only': '{{#label}} does not match the password',
  }),
})

export default validatorRegister
