import express from 'express';
import { academicFacultyController } from './academicFaculty.Controller';
import validateRequest from '../../middlewares/validateRequest';
import { academicFacultyValidation } from './academicFacultyValidation';

const router = express.Router();

router.post(
  '/create-faculty',
  validateRequest(academicFacultyValidation.createAcademiFacultyZodSchema),
  academicFacultyController.createFaculty,
);

router.get('/');

export const AcademicFacultyRoutes = router;
