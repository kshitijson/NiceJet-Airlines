import express, { Router } from 'express';
import { signup } from '../controllers/auth/signupController';
import { login } from '../controllers/auth/loginController';

const router: Router = express.Router();

// Define routes and their handlers
router.post('/signup', signup);
router.post('/authenticate', login);

export default router;
