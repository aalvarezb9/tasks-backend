import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../../../config/env';

export function RequireAuth(_t: unknown, _p: string, desc: PropertyDescriptor) {
  const original = desc.value;

  desc.value = function (...args: [Request, Response, NextFunction]) {
    const [req, res] = args;
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'Missing token' });

    try {
      jwt.verify(token, env.jwtSecret);
      return original.apply(this, args);
    } catch {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
}
