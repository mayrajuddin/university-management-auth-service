/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'
import config from '../../config'
import { IGenericMessage } from '../../interface/error'
import handleValidationError from '../../errors/handleValidationError'
import ApiError from '../../errors/ApiErrors'
import { errorLogger } from '../../shared/logger'
//global error handler
const globalErrorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  config.env === 'development'
    ? console.log('Error Comming From GlobalErrorHanlder', error)
    : errorLogger.error('Error Comming From GlobalErrorHanlder', error)
  let statusCode = 500
  let message = 'Something Went Wrong'
  let errorMessages: IGenericMessage[] = []

  if (error?.name === 'ValidationError') {
    const simplifyError = handleValidationError(error)
    statusCode = simplifyError.statusCode
    message = simplifyError.message
    errorMessages = simplifyError.errorMessages
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode
    message = error?.message
    errorMessages = error?.message
      ? [{ path: '', message: error?.message }]
      : []
  } else if (error instanceof Error) {
    message = error?.message
    errorMessages = error?.message
      ? [{ path: '', message: error?.message }]
      : []
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  })
  next()
}

export default globalErrorHandler