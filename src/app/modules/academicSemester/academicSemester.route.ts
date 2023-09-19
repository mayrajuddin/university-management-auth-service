import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidation } from './academicSemesterValidation';
import { AcademicSemesterController } from './academicSemester.Controller';
const router = express.Router();

router.post(
  '/create-semester',
  validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
  AcademicSemesterController.createSemester,
);
router.get('/:id', AcademicSemesterController.getSingleSemester);
router.patch('/:id', AcademicSemesterController.updateSemester);
router.get('/', AcademicSemesterController.getAllSemesters);
export const AcademicSemesterRoutes = router;
