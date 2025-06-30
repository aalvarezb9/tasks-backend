'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.env = void 0;
const dotenv_1 = require('dotenv');
(0, dotenv_1.config)();
exports.env = {
  jwtSecret: process.env.JWT_SECRET ?? 'dev-secret',
  google: {
    credentials: require(process.env.GOOGLE_APPLICATION_CREDENTIALS ?? ''),
  },
};
