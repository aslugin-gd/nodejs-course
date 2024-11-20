import { Router } from "express";
import { createUser, getUsers } from '../controllers/users.js';
import { createExercise, getExerciseLogs } from '../controllers/exercises.js';

export const router = Router();

/** Get all users */
router.get('/api/users', getUsers);
/** Create new user */
router.post('/api/users', createUser);

/** Create new exercise */
router.post('/api/users/:id/exercises', createExercise);
/** Get exercise logs */
router.get('/api/users/:id/logs', getExerciseLogs);

export const usersRouter = router;
