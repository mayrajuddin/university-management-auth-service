import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { logger, errorLogger } from './shared/logger'
import { Server } from 'http'

process.on('unhandledRejection', error => {
  errorLogger.error(error)
  process.exit(1)
})
let server: Server
async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('database connected')

    //app will run when databse connect successfully
    server = app.listen(config.port, () => {
      logger.info(`University Application listening on port ${config.port}`)
    })
  } catch (err) {
    errorLogger.error('database connection failed', err)
  }

  process.on('unhandledRejection', error => {
    errorLogger.error('unhanledRejection')
    if (server) {
      server.close(() => {
        errorLogger.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

main()
process.on('SIGTERM', () => {
  logger.info('SIGTERM is Recived')
  if (server) {
    server.close()
  }
})
