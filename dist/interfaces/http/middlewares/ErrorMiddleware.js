'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.errorMiddleware = void 0;
const errorMiddleware = (err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: err.message });
};
exports.errorMiddleware = errorMiddleware;
