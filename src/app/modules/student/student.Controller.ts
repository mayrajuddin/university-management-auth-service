import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { fielterAbleField } from './studentConstant';
import { paginationFields } from '../../../constants/paginations';

const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, fielterAbleField);
  const paginationOptions = pick(req.query, paginationFields);

  //   const result = a;
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get all students successfully',
    data: result,
  });
});
const getSingleStudent = catchAsync(async (req: Request, res: Response) => {});

const deleteStudent = catchAsync(async (req: Request, res: Response) => {});
export const studentController = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
