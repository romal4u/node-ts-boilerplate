import 'dotenv/config'
import 'reflect-metadata'
import fs from 'fs'
import path from 'path'

import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import routes from './routes'
import { appDataSource } from './orm/dbCreateConnection'
import { errorHandler } from './middleware/errorHandler'

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

try {
  const logDir = __dirname + '/../log'

  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir)
  }

  const accessLogStream = fs.createWriteStream(logDir + '/access.log', {
    flags: 'a',
  })
  app.use(morgan('combined', { stream: accessLogStream }))
} catch (err) {
  console.log(err)
}
app.use(morgan('combined'))

app.use('/', routes)

errorHandler(app)

export { app }
