import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { FacultyService } from './faculty.Service';
import pick from '../../../shared/pick';
import { facultyFilterableFields } from './facultyConstant';
import { paginationFields } from '../../../constants/paginations';
import { IFaculty } from './faculty.Interface';

const getAllFaculties: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, facultyFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);
    const result = await FacultyService.getAllFaculties(
      filters,
      paginationOptions,
    );
    sendResponse<IFaculty[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculties retrieved successfully!',
      meta: result.meta,
      data: result.data,
    });
  },
);
const getSingleFaculty: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await FacultyService.getSingleFaculty(id);
    sendResponse<IFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Get faculty successfully!',
      data: result,
    });
  },
);
const updateFaculty: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await FacultyService.updateFaculty(id, updatedData);

    sendResponse<IFaculty>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty updated successfully!',
      data: result,
    });
  },
);
const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await FacultyService.deleteFaculty(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty deleted successfully!',
    data: result,
  });
});
export const FacultyController = {
  getAllFaculties,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
