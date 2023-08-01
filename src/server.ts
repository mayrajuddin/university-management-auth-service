import mongoose from 'mongoose'
import app from './app'
import config from './config'

async function main() {
  try {
    await mongoose.connect(config.database_url as string)
    console.log('database connected')

    //app will run when databse connect successfully
    app.listen(config.port, () => {
      console.log(`University Application listening on port ${config.port}`)
    })
  } catch (err) {
    console.log('database connection failed', err)
  }
}

main()
