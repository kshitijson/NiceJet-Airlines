import express, { Router } from 'express';
import { signup } from '../controllers/auth/signupController';
import { login } from '../controllers/auth/loginController';
import { authUser } from '../middleware/authenticate';
import { ChangePassword } from '../controllers/auth/changePassword';

const router: Router = express.Router();

// Define routes and their handlers
router.post('/signup', signup);
router.post('/authenticate', login);
router.post('/changePassword', authUser, ChangePassword);

export default router;
