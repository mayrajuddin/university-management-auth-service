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
router.get('/:id');
router.patch('/:id');
router.delete('/:id');
router.get('/', academicDepartmentController.getAllAcademicDepartment);
export const AcademicDepartmentRoutes = router;
