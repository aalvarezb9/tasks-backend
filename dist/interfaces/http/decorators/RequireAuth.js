'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.RequireAuth = RequireAuth;
const jsonwebtoken_1 = __importDefault(require('jsonwebtoken'));
const env_1 = require('../../../config/env');
function RequireAuth(_t, _p, desc) {
  const original = desc.value;
  desc.value = function (...args) {
    const [req, res] = args;
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'Missing token' });
    try {
      const payload = jsonwebtoken_1.default.verify(token, env_1.env.jwtSecret);
      req.userId = payload.sub;
      jsonwebtoken_1.default.verify(token, env_1.env.jwtSecret);
      return original.apply(this, args);
    } catch {
      return res.status(401).json({ message: 'Invalid token' });
    }
  };
}
