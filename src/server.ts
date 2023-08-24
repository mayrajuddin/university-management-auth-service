import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { logger, errorLogger } from './shared/logger'

async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('database connected')

    //app will run when databse connect successfully
    app.listen(config.port, () => {
      logger.info(`University Application listening on port ${config.port}`)
    })
  } catch (err) {
    errorLogger.error('database connection failed', err)
  }
}

main()
