"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const UserController_1 = require("../controllers/UserController");
const ValidationMiddleware_1 = require("../middlewares/ValidationMiddleware");
exports.router = (0, express_1.Router)();
exports.router.get('/', [(0, express_validator_1.query)('email').isEmail(), ValidationMiddleware_1.validationMiddleware], UserController_1.UserController.find.bind(UserController_1.UserController));
exports.router.post('/', [
    (0, express_validator_1.body)('email').isEmail(),
    (0, express_validator_1.body)('name').isString().notEmpty(),
    (0, express_validator_1.body)('password').isString().notEmpty(),
    ValidationMiddleware_1.validationMiddleware,
], UserController_1.UserController.create.bind(UserController_1.UserController));
