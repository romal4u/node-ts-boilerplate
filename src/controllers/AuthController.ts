import { Request, Response } from 'express'
import { Employee, JwtPayload } from '../orm/entities/Employee'
import { Service } from 'typedi'
import { Repository } from 'typeorm'
import { appDataSource } from '../orm/connection'
import { HelperResponse } from '../utils/helperResponse'
import { createJwtToken } from '../utils/createJWTToken'
import { v4 as uuidv4 } from 'uuid';

@Service()
export class AuthController {
  private readonly employeeRepo: Repository<Employee>
  private readonly helperResponse: HelperResponse

  constructor() {
    this.employeeRepo = appDataSource.getRepository(Employee)

    this.helperResponse = new HelperResponse()
  }

  async register(req: Request, res: Response): Promise<any> {
    const body = req?.body

    const user = await this.employeeRepo.findOne({ where: { email: body.email } })

    if (user) {
      return this.helperResponse.response(
        {
          isSuccess: false,
          message: 'User already exists',
        },
        res,
      )
    }

    const emp = new Employee()
    emp.uuid = uuidv4()
    emp.name = body.name
    emp.email = body.email
    emp.password = body.password
    emp.hashPassword()

    await this.employeeRepo.save(emp)

    const result = {
      isSuccess: true,
      message: 'User create success!',
    }

    return this.helperResponse.response(result, res)
  }

  async login(req: Request, res: Response): Promise<any> {
    const body = req?.body

    const user = await this.employeeRepo.findOne({ where: { email: body.email } })

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

    const jwtPayload: JwtPayload = {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
    }


    const token = createJwtToken(jwtPayload)

    const result = {
      isSuccess: true,
      message: 'Login success!',
    }

    res.cookie('x-authorization-token', token)

    return this.helperResponse.response(result, res)
  }
}
