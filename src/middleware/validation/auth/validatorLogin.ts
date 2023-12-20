import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

import { ValidationError } from '../../../utils/AppError'

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
})

export const validatorLogin = (req: Request, res: Response, next: NextFunction) => {
  const validationResult = registerSchema.validate(req.body)

  if (validationResult.error) {
    throw new ValidationError(validationResult.error.message)
  } else {
    next()
  }
}
