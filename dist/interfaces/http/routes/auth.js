"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const AuthController_1 = require("../controllers/AuthController");
const ValidationMiddleware_1 = require("../middlewares/ValidationMiddleware");
exports.router = (0, express_1.Router)();
exports.router.post('/login', [(0, express_validator_1.body)('email').isEmail(), (0, express_validator_1.body)('password').isString().isLength({ min: 6 }), ValidationMiddleware_1.validationMiddleware], AuthController_1.AuthController.login.bind(AuthController_1.AuthController));
