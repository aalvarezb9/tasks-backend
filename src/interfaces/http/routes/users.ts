import { Router } from 'express';
import { body, query } from 'express-validator';
import { UserController } from '../controllers/UserController';
import { validationMiddleware } from '../middlewares/ValidationMiddleware';

export const router = Router();

router.get('/', [query('email').isEmail(), validationMiddleware], UserController.find);
router.post(
  '/',
  [body('email').isEmail(), body('name').isString().notEmpty(), validationMiddleware],
  UserController.create
);
