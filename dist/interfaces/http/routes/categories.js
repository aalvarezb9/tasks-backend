"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const ValidationMiddleware_1 = require("../middlewares/ValidationMiddleware");
const CategoryController_1 = require("../controllers/CategoryController");
exports.router = (0, express_1.Router)();
exports.router.get('/', CategoryController_1.CategoryController.list.bind(CategoryController_1.CategoryController));
exports.router.post('/', [
    (0, express_validator_1.body)('name').isString().notEmpty(),
    ValidationMiddleware_1.validationMiddleware
], CategoryController_1.CategoryController.create.bind(CategoryController_1.CategoryController));
exports.router.put('/:id', CategoryController_1.CategoryController.update.bind(CategoryController_1.CategoryController));
