'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.validationMiddleware = void 0;
const express_validator_1 = require('express-validator');
const validationMiddleware = (req, res, next) => {
  const e = (0, express_validator_1.validationResult)(req);
  if (!e.isEmpty()) return res.status(400).json({ errors: e.array() });
  next();
};
exports.validationMiddleware = validationMiddleware;
