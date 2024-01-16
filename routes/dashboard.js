import express, { Router } from 'express';
import cors from 'cors';
import { getUsers, getUserId, getUserAnimals, postAuthDetails, getFriends, getUserEvents, getUserDashboard, getAnimalDashboard } from '../controllers/usersViaSupabase.js';

const router = express.Router();



router.get('/:id', cors(), getUserDashboard);
router.get('/:id/animals', cors(), getAnimalDashboard);
router.get('/:id/friends', cors(), getFriends)
router.get('/:id/events', cors(), getUserEvents);

export default router;