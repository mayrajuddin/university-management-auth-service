import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { ManagementDepartmentService } from './managementDepartment.Service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const createDepartment: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { ...departmentData } = req.body;
    const result = await ManagementDepartmentService.createDepartment(
      departmentData,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management department created successfully!',
      data: result,
    });
  },
);
export const ManagementDepartmentController = {
  createDepartment,
};
