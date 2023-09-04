import mongoose from 'mongoose'
import { IGenericErrorRes } from '../interface/common'
import { IGenericMessage } from '../interface/error'

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): IGenericErrorRes => {
  const errors: IGenericMessage[] = Object.values(err.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message,
      }
    },
  )
  const statusCode = 400
  return {
    statusCode,
    message: 'ValidationError',
    errorMessages: errors,
  }
}
export default handleValidationError
