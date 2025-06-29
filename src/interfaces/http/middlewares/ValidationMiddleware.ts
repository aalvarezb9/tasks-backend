import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const validationMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const e = validationResult(req);
  if (!e.isEmpty()) return res.status(400).json({ errors: e.array() });

  next();
};
