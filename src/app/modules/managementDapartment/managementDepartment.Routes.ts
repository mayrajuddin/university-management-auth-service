import express from 'express';
import { ManagementDepartmentController } from './managementDepartment.Controller';
import { ManagementDepartmentValidation } from './managementDepartmentValidation';
import validateRequest from '../../middlewares/validateRequest';
const router = express.Router();
router.post(
  '/create-department',
  validateRequest(
    ManagementDepartmentValidation.createManagementDapartmentZodSchema,
  ),
  ManagementDepartmentController.createDepartment,
);
router.get('/:id', ManagementDepartmentController.getSingleDepartment);
router.patch(
  '/:id',
  validateRequest(
    ManagementDepartmentValidation.updateManagementDapartmentZodSchema,
  ),
  ManagementDepartmentController.updateDepartment,
);
router.delete('/:id', ManagementDepartmentController.deleteDepartment);
router.get('/', ManagementDepartmentController.getAllDepartment);
export const ManagementDepartmentRoutes = router;
