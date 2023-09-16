import { Response } from 'express';

type IApiResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data?: T | null;
};
const sendResponse = <T>(res: Response, data: IApiResponse<T>): void => {
  const resData = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message,
    meta: data.meta || null,
    data: data.data || null,
  };
  res.status(data.statusCode).json(resData);
};

export default sendResponse;
