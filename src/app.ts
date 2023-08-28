import express, { Application, Request, Response } from 'express'
import usersRouter from '../src/app/modules/users.routes'
import cors from 'cors'
import globalErrorHandler from './app/middlewares/globalErrorHandler'

const app: Application = express()

app.use(cors())

//perser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//application routes
app.use('/api/v1/users/', usersRouter)

//routes
// app.get('/', (req: Request, res: Response) => {
//   //res.send('University Management Service')
//
// })

//testing
app.get('/', (req: Request, res: Response) => {
  res.send('University Management Service')
})

app.use(globalErrorHandler)

export default app
