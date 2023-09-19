import mongoose from 'mongoose';
import { IGenericMessage } from '../interface/error';
import httpStatus from 'http-status';

const handleCastError = (error: mongoose.Error.CastError) => {
  const errors: IGenericMessage[] = [
    {
      path: error.path,
      message: 'Invalid Id',
    },
  ];
  const statusCode = httpStatus.BAD_REQUEST;
  return {
    statusCode,
    message: 'Cast Error',
    errorMessages: errors,
  };
};

export default handleCastError;
