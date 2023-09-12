import { Response, Request, NextFunction } from 'express';
import { AcademicSemesterService } from './academicSemester.Service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import status from 'http-status';
const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createAcademicSemester(
      academicSemesterData,
    );
    next();

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: ' Academic Semester is created successfully',
      data: result,
    });
  },
);
export const AcademicSemesterController = { createSemester };
