import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { ManagementDepartmentService } from './managementDepartment.Service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IManagementDepartment } from './managementDepartment.Interface';

const createDepartment: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...departmentData } = req.body;
    const result = await ManagementDepartmentService.createDepartment(
      departmentData,
    );
    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management department created successfully!',
      data: result,
    });
  },
);
const getSingleDepartment: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await ManagementDepartmentService.getSingleDepartment(id);

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management department retrieved successfully!',
      data: result,
    });
  },
);
export const ManagementDepartmentController = {
  createDepartment,
  getSingleDepartment,
};
