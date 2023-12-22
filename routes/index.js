import express, { Router } from 'express';
import cors from 'cors';
import { getUsers, getUserId, getUserAnimals, postAuthDetails, getFriends } from '../controllers/usersViaSupabase.js';


const router = express.Router();

router.get('/', (req, res, next) => {
  res.json("it's working :3 ");
});

router.options('/users', (req, res, next) => {
  try {
    res.header({
      allow: 'GET, POST, OPTIONS',
      'Content-type': 'application/json',
      Data: Date.now(),
      'Content-length': 0,
    });

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
});

router.get('/users', cors(), getUsers);
router.get('/users/:number', cors(), getUserId);
router.get('/users/:userId/animals', cors(), getUserAnimals);
router.get('/users/:userId/friends',cors(),getFriends)
router.post('/users', cors(), postAuthDetails);


export default router;