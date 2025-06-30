'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.router = void 0;
const express_1 = require('express');
const express_validator_1 = require('express-validator');
const TaskController_1 = require('../controllers/TaskController');
const ValidationMiddleware_1 = require('../middlewares/ValidationMiddleware');
exports.router = (0, express_1.Router)();
exports.router.get(
  '/',
  [
    (0, express_validator_1.query)('page').optional().isInt({ min: 1 }),
    (0, express_validator_1.query)('limit').optional().isInt({ min: 1, max: 100 }),
    ValidationMiddleware_1.validationMiddleware,
  ],
  TaskController_1.TaskController.list.bind(TaskController_1.TaskController)
);
exports.router.post(
  '/',
  [
    (0, express_validator_1.body)('title').isString().notEmpty(),
    ValidationMiddleware_1.validationMiddleware,
  ],
  TaskController_1.TaskController.create.bind(TaskController_1.TaskController)
);
exports.router.put(
  '/:id',
  TaskController_1.TaskController.update.bind(TaskController_1.TaskController)
);
exports.router.delete(
  '/:id',
  TaskController_1.TaskController.delete.bind(TaskController_1.TaskController)
);
