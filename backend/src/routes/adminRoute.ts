import express, { Router } from 'express';
import { AdminCreate } from '../controllers/admin/adminCreateController';
import { AdminLogin } from '../controllers/auth/adminLoginController';
import { ListAdmin } from '../controllers/admin/listAdmin';
import { authUser } from '../middleware/authenticate';
import { adminDelete } from '../controllers/admin/adminDelete';
import { AdminChangePassword } from '../controllers/admin/adminChangePassword';

const router: Router = express.Router();

// Define routes and their handlers
router.post('/admin/create', authUser, AdminCreate);
router.post('/admin/authenticate', AdminLogin);
router.get('/admin/list', authUser, ListAdmin);
router.post('/admin/delete', authUser, adminDelete);
router.post('/admin/changePassword', authUser, AdminChangePassword);

export default router;
