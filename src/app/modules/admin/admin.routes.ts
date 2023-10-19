import express from 'express';
import { AdminController } from './admin.Controller';
import validateRequest from '../../middlewares/validateRequest';
import { AdminValidation } from './adminValidation';
const router = express.Router();
router.get('/:id', AdminController.getSingleAdmin);
router.patch(
  '/:id',
  validateRequest(AdminValidation.updateAdminZodSchema),
  AdminController.updateAdmin,
);
router.delete('/:id', AdminController.deleteAdmin);
router.get('/', AdminController.getAllAdmin);
export const AdminRouters = router;
