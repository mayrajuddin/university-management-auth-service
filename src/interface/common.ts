import { IGenericMessage } from './error'

export type IGenericErrorRes = {
  statusCode: number
  message: string
  errorMessages: IGenericMessage[]
}
