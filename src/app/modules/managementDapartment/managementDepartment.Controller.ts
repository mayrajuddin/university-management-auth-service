import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import { ManagementDepartmentService } from './managementDepartment.Service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IManagementDepartment } from './managementDepartment.Interface';
import pick from '../../../shared/pick';
import { departmentFielter } from './managementDepartmentConstant';
import { paginationFields } from '../../../constants/paginations';

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

const getAllDepartment: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, departmentFielter);
    const paginationOptions = pick(req.query, paginationFields);
    const result = await ManagementDepartmentService.getAllDepartment(
      filters,
      paginationOptions,
    );
    sendResponse<IManagementDepartment[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management department retrieved successfully!',
      meta: result.meta,
      data: result.data,
    });
  },
);
const updateDepartment: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const updatedData = req.body;
    const result = await ManagementDepartmentService.updateDepartment(
      id,
      updatedData,
    );
    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Management department updated successfully!',
      data: result,
    });
  },
);
const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await ManagementDepartmentService.deleteDepartment(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Management department deleted successfully!',
    data: result,
  });
});
export const ManagementDepartmentController = {
  createDepartment,
  getSingleDepartment,
  getAllDepartment,
  updateDepartment,
  deleteDepartment,
};
