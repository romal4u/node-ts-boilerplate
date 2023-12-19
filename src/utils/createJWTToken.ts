import jwt from 'jsonwebtoken'
import { JwtPayload } from '../orm/entities/Employee'


export const createJwtToken = (payload: JwtPayload): string => {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRATION,
  })
}
