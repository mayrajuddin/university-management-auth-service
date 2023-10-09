import express from 'express';
import { AcademicFacultyController } from './academicFaculty.Controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyValidation } from './academicFacultyValidation';

const router = express.Router();

router.post(
  '/create-faculty',
  validateRequest(AcademicFacultyValidation.createAcademiFacultyZodSchema),
  AcademicFacultyController.createFaculty,
);
router.get('/:id', AcademicFacultyController.getSingleFaculty);
router.patch('/:id', AcademicFacultyController.updateFaculty);
router.delete('/:id', AcademicFacultyController.deleteFaculty);
router.get('/', AcademicFacultyController.getAllFaculties);

export const AcademicFacultyRoutes = router;
