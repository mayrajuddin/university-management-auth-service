import express, { Application, Request, Response } from 'express'
import usersRouter from '../src/app/modules/users.routes'
import cors from 'cors'

const app: Application = express()

app.use(cors())

//perser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//application routes
app.use('/api/v1/users/', usersRouter)

//routes
app.get('/', async (req: Request, res: Response) => {
  res.send('University Management Service')
})

export default app
