import express from 'express';
import { ManagementDepartmentController } from './managementDepartment.Controller';
import { ManagementDepartmentValidation } from './managementDepartmentValidation';
import validateRequest from '../../middlewares/validateRequest';
const router = express.Router();
router.post(
  '/create-department',
  validateRequest(ManagementDepartmentValidation.managementDapartmentZodSchema),
  ManagementDepartmentController.createDepartment,
);
router.get('/:id', ManagementDepartmentController.getSingleDepartment);
router.patch('/:id', ManagementDepartmentController.updateDepartment);
export const ManagementDepartmentRoutes = router;
