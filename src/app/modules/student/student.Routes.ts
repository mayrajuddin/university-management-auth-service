import express from 'express';
import { studentController } from './student.Controller';

const router = express.Router();
router.get('/:id', studentController.getSingleStudent);
router.delete('/:id', studentController.deleteStudent);
router.get('/', studentController.getAllStudents);
export const StudentRoutes = router;
