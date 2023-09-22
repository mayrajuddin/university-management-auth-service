import express from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.Routes';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.Routes';
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
  {
    path: '/academic-faculties/',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-department',
    route: AcademicDepartmentRoutes,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
