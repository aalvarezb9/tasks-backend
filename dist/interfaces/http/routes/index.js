"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const tasks_1 = require("./tasks");
const users_1 = require("./users");
exports.router = (0, express_1.Router)();
exports.router.use('/tasks', tasks_1.router);
exports.router.use('/users', users_1.router);
