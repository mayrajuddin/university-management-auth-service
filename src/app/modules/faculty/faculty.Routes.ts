import express from 'express';
import { FacultyController } from './faculty.Controller';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyValidation } from './facultyValidation';
const router = express.Router();
router.get('/:id', FacultyController.getSingleFaculty);
router.patch(
  '/:id',
  validateRequest(FacultyValidation.updateFacultyZodSchema),
  FacultyController.updateFaculty,
);
router.delete('/:id', FacultyController.deleteFaculty);
router.get('/', FacultyController.getAllFaculties);
export const FacultyRoutes = router;
