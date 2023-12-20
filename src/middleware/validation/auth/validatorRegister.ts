import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

import { ValidationError } from '../../../utils/AppError'

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  confirm_password: Joi.string().valid(Joi.ref('password')).required().label('Confirm password').messages({
    'any.only': '{{#label}} does not match the password',
  }),
})

export const validatorRegister = (req: Request, res: Response, next: NextFunction) => {
  const validationResult = registerSchema.validate(req.body)

  if (validationResult.error) {
    throw new ValidationError(validationResult.error.message)
  } else {
    next()
  }
}
