import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

import { ValidationError } from '../../../utils/AppError'

const changePasswordSchema = Joi.object({
  password: Joi.string().required(),
  password_new: Joi.string().required(),
  confirm_password: Joi.string().valid(Joi.ref('password_new')).required().label('Confirm password').messages({
    'any.only': '{{#label}} does not match the password',
  }),
})

export const validatorChangePassword = (req: Request, res: Response, next: NextFunction) => {
  const validationResult = changePasswordSchema.validate(req.body)

  if (validationResult.error) {
    throw new ValidationError(validationResult.error.message)
  } else {
    next()
  }
}
