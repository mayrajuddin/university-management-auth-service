import express from 'express';
import { ManagementDepartmentController } from './managementDepartment.Controller';
const router = express.Router();
router.post(
  '/create-department',
  ManagementDepartmentController.createDepartment,
);
export const ManagementDepartmentRoutes = router;
