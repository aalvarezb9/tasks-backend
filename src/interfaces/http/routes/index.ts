import { Router } from 'express';
import { router as tasksRouter } from './tasks';
import { router as usersRouter } from './users';

export const router = Router();

router.use('/tasks', tasksRouter);
router.use('/users', usersRouter);
