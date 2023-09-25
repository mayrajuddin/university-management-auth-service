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
router.get('/:id', academicDepartmentController.getAcademicDepartment);
router.patch(
  '/:id',
  validateRequest(
    academicDepartmentValidation.updateAcademicDepartmentZodSchema,
  ),
  academicDepartmentController.updateAcademicDepartment,
);
router.delete('/:id', academicDepartmentController.deleteAcademicDepartment);
router.get('/', academicDepartmentController.getAllAcademicDepartment);
export const AcademicDepartmentRoutes = router;
