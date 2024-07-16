import express, { Router } from 'express';
import { AdminCreate } from '../controllers/auth/adminCreateController';
import { authUser } from '../middleware/authenticate';

const router: Router = express.Router();

// Define routes and their handlers
router.post('/admin/create', authUser, AdminCreate)

export default router;
