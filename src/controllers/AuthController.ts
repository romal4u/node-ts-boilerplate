import { Request, Response } from 'express'
import { Employee } from '../orm/entities/Employee'
import { Service } from 'typedi'
import { Repository } from 'typeorm'
import { appDataSource } from '../orm/dbCreateConnection'
import { HelperResponse } from '../utils/helperResponse'

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
}
