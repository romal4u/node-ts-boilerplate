import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

import { ValidationError } from '../../../utils/AppError'

const mfaSchema = Joi.object({
  email: Joi.string().email().required(),
  uuid: Joi.string().uuid().required(),
})

export const validatorSetUpMFA = (req: Request, res: Response, next: NextFunction) => {
  const validationResult = mfaSchema.validate(req.body)

  if (validationResult.error) {
    throw new ValidationError(validationResult.error.message)
  } else {
    next()
  }
}
