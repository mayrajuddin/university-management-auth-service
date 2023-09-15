import { Response, Request, NextFunction } from 'express';
import { AcademicSemesterService } from './academicSemester.Service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/paginations';
const createSemester = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academicSemesterData } = req.body;
    const result = await AcademicSemesterService.createAcademicSemester(
      academicSemesterData,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: ' Academic Semester is created successfully',
      data: result,
    });
    next();
  },
);

//get all semesters

const getAllSemesters = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // const paginationOptions = {
    //   page: Number(req.query.page),
    //   limit: Number(req.query.limit),
    //   sortBy: req.query.sortBy,
    //   sortOrder: req.query.sortOrder,
    // };
    const paginationOptions = pick(req.query, paginationFields);
    console.log(paginationOptions);
    // const result = await AcademicSemesterService.getAllSemesters(
    //   paginationOptions,
    // );
    // sendResponse(res, {
    //   statusCode: httpStatus.OK,
    //   success: true,
    //   message: 'Get Academic Semesters Successfully!',
    //   data: result,
    // });
    // next();
  },
);
export const AcademicSemesterController = { createSemester, getAllSemesters };
