import { Response, Request, RequestHandler } from 'express';
import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import status from 'http-status';
import { IUser } from './user.interface';
const createStudent: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { student, ...userData } = req.body;
    const result = await UserService.createStudent(student, userData);

    sendResponse<IUser>(res, {
      statusCode: status.OK,
      success: true,
      message: ' User created successfully',
      data: result,
    });
  },
);
const createFaculty: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { faculty, ...userData } = req.body;
    const result = await UserService.createFaculy(faculty, userData);

    sendResponse<IUser>(res, {
      statusCode: status.OK,
      success: true,
      message: ' User created successfully',
      data: result,
    });
  },
);
const createAdmin: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { admin, ...userData } = req.body;
    const result = await UserService.createAdmin(admin, userData);
    sendResponse<IUser>(res, {
      statusCode: status.OK,
      success: true,
      message: ' User created successfully',
      data: result,
    });
  },
);
export const UserController = {
  createStudent,
  createFaculty,
  createAdmin,
};
