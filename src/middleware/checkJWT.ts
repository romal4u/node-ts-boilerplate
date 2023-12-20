import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

import { JwtPayload } from '../orm/entities/User'
import { AuthorizationError, ValidationError } from '../utils/AppError'
import { createJwtToken } from '../utils/createJWTToken'

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.get('Authorization')
  if (!authHeader) {
    throw new ValidationError('Authorization header not provided')
  }

  const token = authHeader.split(' ')[1]
  let jwtPayload: { [key: string]: any }
  try {
    jwtPayload = jwt.verify(token, process.env.JWT_SECRET as string) as { [key: string]: any }
    ;['iat', 'exp'].forEach((keyToRemove) => delete jwtPayload[keyToRemove])
    req['jwtPayload'] = jwtPayload as JwtPayload

    if (!req['jwtPayload']['is_otp_verified']) {
      throw new AuthorizationError('Please enable 2FA first!')
    }
  } catch (err) {
    throw new ValidationError('JWT error')
  }

  try {
    // Refresh and send a new token on every request
    const newToken = createJwtToken(jwtPayload as JwtPayload)
    res.setHeader('x-auth-token', `Bearer ${newToken}`)
    return next()
  } catch (err) {
    throw new ValidationError("Token can't be created")
  }
}
