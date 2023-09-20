import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { academicFacultyService } from './academicFaculty.Service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IAcademicFaculty } from './academicFaculty.Interface';

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

export const academicFacultyController = {
  createFaculty,
};
