import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { academicFacultyService } from './academicFaculty.Service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IAcademicFaculty } from './academicFaculty.Interface';
import pick from '../../../shared/pick';
import { academicFacultyFilterAbleField } from './academicFacultyConstant';
import { paginationFields } from '../../../constants/paginations';

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { ...academicFacultyData } = req.body;

  const result = await academicFacultyService.createAcademicFaculty(
    academicFacultyData,
  );

  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: ' Academic Faculty is created successfully',
    data: result,
  });
});
const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
  const filter = pick(req.query, academicFacultyFilterAbleField);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await academicFacultyService.getAllFaculties(
    filter,
    paginationOptions,
  );
  sendResponse<IAcademicFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Academic Faculties Successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await academicFacultyService.getSingleFaculty(id);
  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get Academic Faculty Successfully!',
    data: result,
  });
});
export const academicFacultyController = {
  createFaculty,
  getAllFaculties,
  getSingleFaculty,
};
