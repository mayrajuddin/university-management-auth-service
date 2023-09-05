import { ZodError, ZodIssue } from 'zod';
import { IGenericMessage } from '../interface/error';
import { IGenericErrorRes } from '../interface/common';

const handleZodError = (error: ZodError): IGenericErrorRes => {
  const errors: IGenericMessage[] = error.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue?.message,
    };
  });
  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  };
};

export default handleZodError;
