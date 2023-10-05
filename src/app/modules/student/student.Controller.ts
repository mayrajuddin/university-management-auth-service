import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { fielterAbleField } from './studentConstant';
import { paginationFields } from '../../../constants/paginations';
import { IStudent } from './student.Interface';
import { studentService } from './student.Service';

const getAllStudents = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, fielterAbleField);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await studentService.getAllStudents(filter, paginationOptions);
  sendResponse<IStudent[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get all students successfully',
    meta: result.meta,
    data: result.data,
  });
});
const getSingleStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await studentService.getSingleStudent(id);
  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get  student successfully',
    data: result,
  });
});
const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await studentService.updateStudent(id, updatedData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student updated successfully!',
    data: result,
  });
});
const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await studentService.deleteStudent(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student deleted successfully!',
    data: result,
  });
});
export const studentController = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
