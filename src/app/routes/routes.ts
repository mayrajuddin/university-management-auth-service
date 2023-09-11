import express from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
const router = express.Router();

// router.use('/user', UserRoutes);

const moduleRoutes = [
  {
    path: '/user/',
    route: UserRoutes,
  },
  {
    path: '/academic-semesters/',
    route: AcademicSemesterRoutes,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
