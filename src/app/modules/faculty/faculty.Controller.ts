import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { FacultyService } from './faculty.Service';
import pick from '../../../shared/pick';
import { facultyFilterableFields } from './facultyConstant';
import { paginationFields } from '../../../constants/paginations';

const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, facultyFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);
  const result = await FacultyService.getAllFaculties(
    filters,
    paginationOptions,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties retrieved successfully!',
    meta: result.meta,
    data: result.data,
  });
});

export const FacultyController = { getAllFaculties };
