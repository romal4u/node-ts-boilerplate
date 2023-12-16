import { Request, Response } from 'express'
import { Employee } from 'orm/entities/employee'
import { Service } from 'typedi'
import { Repository, getRepository } from 'typeorm'

@Service()
export class AuthController {
  private readonly employeeRepo: Repository<Employee>

  constructor() {
    this.employeeRepo = getRepository(Employee)
  }

  async register(req: Request, res: Response) {
    const body = req?.body
    const user = await this.employeeRepo.findOne({ where: { email: body.email } })

    // if (user) {
    //   const customError = new CustomError(400, 'General', 'User already exists', [
    //     `Email '${user.email}' already exists`,
    //   ])
    //   return next(customError)
    // }
  }
}
