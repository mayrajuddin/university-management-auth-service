import { IGenericMessage } from './error';

export type IGenericErrorRes = {
  statusCode: number;
  message: string;
  errorMessages: IGenericMessage[];
};
export type IGenericResponse<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};
