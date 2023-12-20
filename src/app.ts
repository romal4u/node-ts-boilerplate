import 'dotenv/config'

import 'reflect-metadata'

import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import swaggerUi from 'swagger-ui-express'

import { errorHandler } from './middleware/errorHandler'
import { appDataSource } from './orm/connection'
import routes from './routes'
import swaggerOutput from './swagger_output.json'

appDataSource
  .initialize()
  .then(() => {
    console.log(`Database connection success.`)
  })
  .catch((err) => {
    console.error(`Data Source initialization error`, err)
  })

const app = express()
app.disable('x-powered-by')
app.use(cors({ credentials: true, origin: true }))
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', routes)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput))

errorHandler(app)

export { app }
