import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import usersService from './app/modules/users.service'
const app: Application = express()

app.use(cors())

//perser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//routes
app.get('/', async (req: Request, res: Response) => {
  await usersService.createUser({
    id: '111',
    password: 'admin1',
    role: 'admin',
  })
  res.send('University Management Service')
})

export default app
