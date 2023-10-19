import express from 'express';
import { AdminController } from './admin.Controller';
import validateRequest from '../../middlewares/validateRequest';
const router = express.Router();
router.get('/:id', AdminController.getSingleAdmin);
router.patch('/:id', validateRequest, AdminController.updateAdmin);
router.delete('/:id', AdminController.deleteAdmin);
router.get('/', AdminController.getAllAdmin);
export const AdminRouters = router;
