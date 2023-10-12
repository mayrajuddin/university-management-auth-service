import express from 'express';
import { FacultyController } from './faculty.Controller';
const router = express.Router();

router.get('/', FacultyController.getAllFaculties);
export const FacultyRoutes = router;
