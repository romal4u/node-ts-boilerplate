import 'dotenv/config'
import 'reflect-metadata'
import fs from 'fs'
import path from 'path'

import bodyParser from 'body-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { dbCreateConnection } from './orm/dbCreateConnection'

export const app = express()
app.disable('x-powered-by')
app.use(cors())
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

try {
  const accessLogStream = fs.createWriteStream(path.join(__dirname, '../log/access.log'), {
    flags: 'a',
  })
  app.use(morgan('combined', { stream: accessLogStream }))
} catch (err) {
  console.log(err)
}
app.use(morgan('combined'))


const port = process.env.PORT || 4000
app.listen(port, async () => {
  await dbCreateConnection()

  console.log(`Server running on port ${port}`)
})