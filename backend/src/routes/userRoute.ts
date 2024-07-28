import express, { Router } from 'express';
import { authUser } from '../middleware/authenticate';
import { FlightSearch } from '../controllers/user/flightSearchController';

const router: Router = express.Router();

// Define routes and their handlers
router.get('/fetchFlight', authUser, FlightSearch);

export default router;
