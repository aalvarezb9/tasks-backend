import { Router } from 'express';
import { body } from 'express-validator';
import { AuthController } from '../controllers/AuthController';
import { validationMiddleware } from '../middlewares/ValidationMiddleware';

export const router = Router();

router.post(
  '/login',
  [body('email').isEmail(), body('password').isString().isLength({ min: 6 }), validationMiddleware],
  AuthController.login
);
