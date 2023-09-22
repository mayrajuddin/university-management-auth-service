import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { academicDepartmentService } from './academicDepartment.Service';
import sendResponse from '../../../shared/sendResponse';
import { IAcademicDepartment } from './academicDepartment.Interface';
import httpStatus from 'http-status';

const createAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { ...academicDepartmentData } = req.body;
    const result = await academicDepartmentService.createAcademicDepartment(
      academicDepartmentData,
    );
    sendResponse<IAcademicDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: ' Academic Department is created successfully',
      data: result,
    });
  },
);
export const academicDepartmentController = {
  createAcademicDepartment,
};
