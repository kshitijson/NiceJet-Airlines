import express, { Router } from 'express';
import { AdminCreate } from '../controllers/admin/adminCreateController';
import { AdminLogin } from '../controllers/admin/adminLoginController';
import { ListAdmin } from '../controllers/admin/listAdmin';
import { authUser } from '../middleware/authenticate';
import { adminDelete } from '../controllers/admin/adminDelete';
import { AdminChangePassword } from '../controllers/admin/adminChangePassword';
import { FlightCreate } from '../controllers/admin/flightCreateController';

const router: Router = express.Router();

// Define routes and their handlers
router.post('/admin/auth/create', authUser, AdminCreate);
router.post('/admin/auth/authenticate', AdminLogin);
router.get('/admin/list', authUser, ListAdmin);
router.post('/admin/delete', authUser, adminDelete);
router.post('/admin/auth/changePassword', authUser, AdminChangePassword);

router.post('/admin/createFlight', authUser, FlightCreate);

export default router;
