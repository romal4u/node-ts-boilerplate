import { NextFunction, Request, Response } from "express"
import { TypeORMError } from "typeorm"
import { Logger } from "../utils/Logger"

const log = new Logger(__filename)


export const errorHandler = (app) => {
    app.use((error: any, req: Request, res: Response, next: NextFunction) => {
      
      let statusCode = error.statusCode || 500
      let data = error.data || error.message
      let isSuccess = false
     
  
      log.error('exception occurred', data)
      log.error('Server error, details are', error)
  
      if (error instanceof TypeORMError) {
        return res.status(statusCode).send({
          status: statusCode,
          data: {
            isSuccess,
            message: 'Sorry, something went wrong, Please try again.!',
            payload: {},
          },
        })
      }
  
      return res.status(statusCode).send({
        status: statusCode,
        data: {
          isSuccess,
          message:
            error.statusCode !== 500
              ? data
              : 'Sorry, something went wrong, Please try again.!',
          payload: error.statusCode === 500 ? data : {},
        },
      })
    })
  }