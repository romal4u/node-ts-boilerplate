import 'reflect-metadata'
import { app } from './app'
import { Logger } from './utils/Logger'

const log = new Logger(__filename)

const start = async () => {
  app.listen(process.env.PORT, async () => {
    console.log('Listening on Port ' + process.env.PORT)
    log.info('Listening on Port ' + process.env.PORT)
  })
}

start()
  .then(() => {
    console.log('Successfully started server ...')
    log.info('Successfully started server ...')
  })
  .catch((error) => {
    throw error
  })
