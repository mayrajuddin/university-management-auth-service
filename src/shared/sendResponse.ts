import { Response } from 'express';

type IApiResponse<T> = {
  statusCode: number;
  status: boolean;
  message?: string | null;
  data?: T | null;
};
const sendResponse = <T>(res: Response, data: IApiResponse<T>): void => {
  const resData = {
    statusCode: data.statusCode,
    status: data.status,
    message: data.message,
    data: data.data || null,
  };
  res.status(data.statusCode).json(resData);
};

export default sendResponse;
