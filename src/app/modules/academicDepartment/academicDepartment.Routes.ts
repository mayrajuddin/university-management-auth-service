import express from 'express';
import { academicDepartmentController } from './academicDepartment.Controller';
import { academicDepartmentValidation } from './academicDepartmentValidation';
import validateRequest from '../../middlewares/validateRequest';
const router = express.Router();

router.post(
  '/create-department',
  validateRequest(academicDepartmentValidation.academicDepartmentZodSchema),
  academicDepartmentController.createAcademicDepartment,
);
export const AcademicDepartmentRoutes = router;
