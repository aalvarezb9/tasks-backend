import { Router } from 'express';
import { router as tasksRouter } from './tasks';
import { router as usersRouter } from './users';
import { router as authRouter } from './auth';
import { router as categoriesRouter } from './categories';

export const router = Router();

router.use('/tasks', tasksRouter);
router.use('/users', usersRouter);
router.use('/auth', authRouter);
router.use('/categories', categoriesRouter);
