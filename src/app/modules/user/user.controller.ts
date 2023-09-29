import { Response, Request } from 'express';
import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import status from 'http-status';
const createUser = catchAsync(async (req: Request, res: Response) => {
  const { ...userData } = req.body;
  const result = await UserService.createUser(userData);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: ' User created successfully',
    data: result,
  });
  // res.status(201).json({
  //   status: true,
  //   message: ' User created successfully',
  //   data: result,
  // });
});

export const UserController = {
  createUser,
};
