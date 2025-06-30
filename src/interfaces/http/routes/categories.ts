import { Router } from 'express';
import { body } from 'express-validator';
import { validationMiddleware } from '../middlewares/ValidationMiddleware';
import { CategoryController } from '../controllers/CategoryController';

export const router = Router();

router.get('/', CategoryController.list.bind(CategoryController));
router.post(
  '/',
  [body('name').isString().notEmpty(), validationMiddleware],
  CategoryController.create.bind(CategoryController)
);

router.put('/:id', CategoryController.update.bind(CategoryController));
