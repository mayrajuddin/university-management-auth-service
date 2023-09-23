import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { academicDepartmentService } from './academicDepartment.Service';
import sendResponse from '../../../shared/sendResponse';
import { IAcademicDepartment } from './academicDepartment.Interface';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/paginations';
import { academicFacultyFilterAbleField } from '../academicFaculty/academicFacultyConstant';

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

const getAllAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const filter = pick(req.query, academicFacultyFilterAbleField);
    const paginationOptions = pick(req.query, paginationFields);
    const result = await academicDepartmentService.getAllAcademicDepartment(
      filter,
      paginationOptions,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: ' Get Academic Department successfully',
      data: result,
    });
  },
);
export const academicDepartmentController = {
  createAcademicDepartment,
  getAllAcademicDepartment,
};
