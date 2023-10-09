import express from 'express';
import { studentController } from './student.Controller';
import validateRequest from '../../middlewares/validateRequest';
import { StudentValidation } from './studentValidation';

const router = express.Router();
router.get('/:id', studentController.getSingleStudent);
router.delete('/:id', studentController.deleteStudent);
router.patch(
  '/:id',
  validateRequest(StudentValidation.updateStudentZodSchema),
  studentController.updateStudent,
);
router.get('/', studentController.getAllStudents);
export const StudentRoutes = router;
