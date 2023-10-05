import express from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.Routes';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.Routes';
import { StudentRoutes } from '../modules/student/student.Routes';
const router = express.Router();

// router.use('/user', UserRoutes);

const moduleRoutes = [
  {
    path: '/users/',
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
    path: '/academic-departments',
    route: AcademicDepartmentRoutes,
  },
  {
    path: '/students',
    route: StudentRoutes,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
