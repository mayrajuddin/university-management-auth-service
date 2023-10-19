import { Request, RequestHandler, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/paginations';
import { adminFilterFields } from './adminConstant';
import { AdminService } from './admin.Service';
import sendResponse from '../../../shared/sendResponse';
import { IAdmin } from './admin.Interface';
import httpStatus from 'http-status';

const getAllAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, adminFilterFields);
    const paginationOptions = pick(req.query, paginationFields);
    const result = await AdminService.getAllAdmin(filters, paginationOptions);
    sendResponse<IAdmin[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admins retrieved successfully!',
      meta: result.meta,
      data: result.data,
    });
  },
);
const getSingleAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await AdminService.getSingleAdmin(id);
    sendResponse<IAdmin>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin retrieved successfully!',
      data: result,
    });
  },
);
const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await AdminService.updateAdmin(id, updatedData);
  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin updated successfully!',
    data: result,
  });
});
const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AdminService.deleteAdmin(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin deleted successfully!',
    data: result,
  });
});
export const AdminController = {
  getAllAdmin,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
