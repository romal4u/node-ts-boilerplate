import { Request, Response } from 'express'
import * as OTPAuth from 'otpauth'
import { Service } from 'typedi'
import { Repository } from 'typeorm'
import { v4 as uuidv4 } from 'uuid'

import { appDataSource } from '../orm/connection'
import { User, JwtPayload } from '../orm/entities/User'
import { createJwtToken } from '../utils/createJWTToken'
import { HelperResponse } from '../utils/helperResponse'
import { generateRandomBase32 } from '../utils/MFA'

@Service()
export class AuthController {
  private readonly userRepo: Repository<User>
  private readonly helperResponse: HelperResponse

  constructor() {
    this.userRepo = appDataSource.getRepository(User)

    this.helperResponse = new HelperResponse()
  }

  async register(req: Request, res: Response): Promise<any> {
    const body = req?.body

    const user = await this.userRepo.findOne({ where: { email: body.email } })

    if (user) {
      return this.helperResponse.response(
        {
          isSuccess: false,
          message: 'User already exists',
        },
        res,
      )
    }

    const emp = new User()
    emp.uuid = uuidv4()
    emp.name = body.name
    emp.email = body.email
    emp.password = body.password
    emp.hashPassword()

    await this.userRepo.save(emp)

    const result = {
      isSuccess: true,
      message: 'User create success!',
    }

    return this.helperResponse.response(result, res)
  }

  async login(req: Request, res: Response): Promise<any> {
    const body = req?.body

    const user = await this.userRepo.findOne({ where: { email: body.email } })

    if (!user) {
      return this.helperResponse.response(
        {
          isSuccess: false,
          meuserssage: 'Incorrect email or password',
        },
        res,
      )
    }

    if (!user.checkIfPasswordMatch(body.password)) {
      return this.helperResponse.response(
        {
          isSuccess: false,
          message: 'Incorrect email or password',
        },
        res,
      )
    }

    const result = {
      isSuccess: true,
      message: 'Login success!',
      payload: {
        uuid: user.uuid,
        email: user.email,
        is_otp_verified: user.is_otp_verified,
      },
    }

    return this.helperResponse.response(result, res)
  }

  async changePassword(req: Request, res: Response): Promise<any> {
    const body = req?.body

    const empData = req['jwtPayload']

    const user = await this.userRepo.findOne({ where: { uuid: empData.uuid } })

    if (!user) {
      return this.helperResponse.response(
        {
          isSuccess: false,
          message: 'Incorrect email or password',
        },
        res,
      )
    }

    if (!user.checkIfPasswordMatch(body.password)) {
      return this.helperResponse.response(
        {
          isSuccess: false,
          message: 'Incorrect email or password',
        },
        res,
      )
    }

    user.password = body?.password_new
    user.hashPassword()
    await this.userRepo.save(user)

    const result = {
      isSuccess: true,
      message: 'Password change success!',
    }

    return this.helperResponse.response(result, res)
  }

  async setUp2FA(req: Request, res: Response): Promise<any> {
    const body = req?.body

    const user = await this.userRepo.findOne({ where: { uuid: body.uuid } })

    if (!user) {
      return this.helperResponse.response(
        {
          isSuccess: false,
          message: 'User not found!',
        },
        res,
      )
    }

    if (user.is_2fa_enable) {
      return this.helperResponse.response(
        {
          isSuccess: false,
          message: 'MFA is already enabled!',
        },
        res,
      )
    }

    const base32_secret = generateRandomBase32()

    const totp = new OTPAuth.TOTP({
      issuer: 'example.com',
      label: user.email,
      algorithm: 'SHA1',
      digits: 6,
      secret: base32_secret,
      period: 30,
    })

    const otpauth_url = totp.toString()

    user.otp_secret = base32_secret
    user.otp_auth_url = otpauth_url
    await this.userRepo.save(user)

    const result = {
      isSuccess: true,
      message: 'set up 2FA',
      payload: {
        otp_secret: base32_secret,
        otp_auth_url: otpauth_url,
      },
    }

    return this.helperResponse.response(result, res)
  }

  async enable2FA(req: Request, res: Response): Promise<any> {
    const body = req?.body

    const user = await this.userRepo.findOne({ where: { uuid: body.uuid } })

    if (!user) {
      return this.helperResponse.response(
        {
          isSuccess: false,
          message: 'User not found!',
        },
        res,
      )
    }

    const totp = new OTPAuth.TOTP({
      issuer: 'example.com',
      label: user.email,
      algorithm: 'SHA1',
      digits: 6,
      secret: user.otp_secret!,
      period: 30,
    })

    const delta = totp.validate({ token: body.totp, window: 1 })

    if (delta === null || delta < 0) {
      return this.helperResponse.response({ isSuccess: false, message: 'User not found / OTP is not valid' }, res)
    }

    user.is_2fa_enable = 1
    user.is_otp_verified = 1
    await this.userRepo.save(user)

    const jwtPayload: JwtPayload = {
      uuid: user.uuid,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      is_2fa_enable: user.is_2fa_enable,
      is_otp_verified: user.is_otp_verified,
    }

    const token = createJwtToken(jwtPayload)

    const result = {
      isSuccess: true,
      message: '2FA enabled!',
    }

    return this.helperResponse.response(result, res)
  }

  async validateTOTP(req: Request, res: Response): Promise<any> {
    const body = req?.body

    const user = await this.userRepo.findOne({ where: { uuid: body.uuid } })

    if (!user) {
      return this.helperResponse.response({ isSuccess: false, message: 'User not found / OTP is not valid' }, res)
    }

    const totp = new OTPAuth.TOTP({
      issuer: 'example.com',
      label: user.email,
      algorithm: 'SHA1',
      digits: 6,
      secret: user.otp_secret!,
      period: 30,
    })

    const delta = totp.validate({ token: body.totp, window: 1 })

    console.log(delta)

    if (delta === null || delta < 0) {
      return this.helperResponse.response({ isSuccess: false, message: 'User not found / OTP is not valid' }, res)
    }

    const jwtPayload: JwtPayload = {
      uuid: user.uuid,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
      is_2fa_enable: user.is_2fa_enable,
      is_otp_verified: user.is_otp_verified,
    }

    const token = createJwtToken(jwtPayload)

    const result = {
      isSuccess: true,
      message: 'Login success!',
    }

    res.setHeader('x-auth-token', `Bearer ${token}`)
    return this.helperResponse.response(result, res)
  }
}
