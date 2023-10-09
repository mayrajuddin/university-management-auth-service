import express from 'express';
import { AcademicDepartmentController } from './academicDepartment.Controller';
import { AcademicDepartmentValidation } from './academicDepartmentValidation';
import validateRequest from '../../middlewares/validateRequest';
const router = express.Router();

router.post(
  '/create-department',
  validateRequest(AcademicDepartmentValidation.academicDepartmentZodSchema),
  AcademicDepartmentController.createAcademicDepartment,
);
router.get('/:id', AcademicDepartmentController.getAcademicDepartment);
router.patch(
  '/:id',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentZodSchema,
  ),
  AcademicDepartmentController.updateAcademicDepartment,
);
router.delete('/:id', AcademicDepartmentController.deleteAcademicDepartment);
router.get('/', AcademicDepartmentController.getAllAcademicDepartment);
export const AcademicDepartmentRoutes = router;
