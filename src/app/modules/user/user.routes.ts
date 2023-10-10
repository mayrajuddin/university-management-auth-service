import express from 'express';
import { UserController } from './user.controller';
import { UserValidation } from './userValidation';
import validateRequest from '../../middlewares/validateRequest';
const router = express.Router();

router.post(
  '/create-student',
  validateRequest(UserValidation.createUserZodSchema),
  UserController.createStudent,
);
router.post('/create-faculty', UserController.createFaculty);
export const UserRoutes = router;
