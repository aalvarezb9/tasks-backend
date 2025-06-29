import { Request, Response, NextFunction } from 'express';

export function CatchErrors(_t: unknown, _p: string, desc: PropertyDescriptor) {
  const o = desc.value;
  desc.value = function (...args: [Request, Response, NextFunction]) {
    const next = args[2];
    Promise.resolve(o.apply(this, args)).catch(next);
  };
}
