import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

import { ValidationError } from '../../../utils/AppError'

const mfaSchema = Joi.object({
  uuid: Joi.string().uuid().required(),
  totp: Joi.string().required(),
})

export const validatorEnableMFA = (req: Request, res: Response, next: NextFunction) => {
  const validationResult = mfaSchema.validate(req.body)

  if (validationResult.error) {
    throw new ValidationError(validationResult.error.message)
  } else {
    next()
  }
}
