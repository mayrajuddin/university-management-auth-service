import { NextFunction, Request, Response } from 'express'
//global error handler
const globalErrorHandler = (
  err: string | undefined,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(400).json({ error: err })
  next()
}

export default globalErrorHandler
