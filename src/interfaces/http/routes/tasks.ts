import { Router } from 'express';
import { body, query } from 'express-validator';
import { TaskController } from '../controllers/TaskController';
import { validationMiddleware } from '../middlewares/ValidationMiddleware';

export const router = Router();

router.get(
  '/',
  [
    query('page').optional().isInt({ min: 1 }),
    query('limit').optional().isInt({ min: 1, max: 100 }),
    validationMiddleware,
  ],
  TaskController.list.bind(TaskController)
);

router.post(
  '/',
  [body('title').isString().notEmpty(), validationMiddleware],
  TaskController.create.bind(TaskController)
);

router.put('/:id', TaskController.update.bind(TaskController));

router.delete('/:id', TaskController.delete.bind(TaskController));
